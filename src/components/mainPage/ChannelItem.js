import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { PopoverPicker } from '../colorPicker/PopoverPicker';
import {changeMinChannel} from '../../store/actionCreators/channelActions';
import { setXPos, getXPos, setSuppression, getSuppression } from '../../services/drawingProcessor';
import { store } from '../../store/store';

var renderBlock = 8

const ChannelItem = ({id}) => {    
    console.log('ChannelsItemRender...')
    const channelItem = useSelector(state => state.channelsReducer.channels[id])
    const dispatch = useDispatch()
    const [color, setColor] = useState(channelItem.color)
   
    const targetLineRange = useRef(null)
    const rearRange = useRef(null)
    const rearSelectRange = useRef(null)
    const frontRange = useRef(null)
    const frontSelectRange = useRef(null)

    // генерация id
    const divId = `div${id}`; // основной div (рисование)
    const inId = `in${id}`;   // линия срабатывания
    const trId = `tr${id}`;   // идикатор срабатывания
    const dfId = `df${id}`;   // линия "front" (передний буфер)
    const drId = `dr${id}`;   // линия "rear"  (задний буфер)
    const suppressionId = `suppression${id}` // подавление

    // генерация элементов для selectОВ
    const selectElements = (max, start = 0) => {
        const arr = []
        for (let i = start; i <= max ; i ++){           
            arr.push(<option key={i} value={i}>{i}</option>)    
        } return arr               
    }

    // генерация шкалы для отрисовки собранного канала
    const renderElements = () => {
        let str = '. . 0'
        const strTool = ' . . .|. . . '
        for(let i = 30; i < 380 ; i+= 30){
            str += strTool + i
        }
        return str + strTool +'390 . .'
    }

    // функиция пролистывания selectОВ до выбранного значения после потери фокуса
    const scrollTo = (item, target) => {
        const num = Math.floor(target*15.2)    
        let scroll = Math.floor(item.scrollTop)
        const scrollNode = Math.floor(item.parentNode.scrollTop)
        if(scrollNode > scroll) scroll = scrollNode
        if(scroll > num){
            item.scrollTop = num
            item.parentNode.scrollTop = num   
        }
        if(scroll < num - 50){
            item.scrollTop = num-44
            item.parentNode.scrollTop = num -44
        }            
    }

    const changeChannelItem = (value, key) => {
        const item = { ...channelItem }
        item[key] = /\D+/g.test(value) ? value : +value
        dispatch({type: 'CHANGE_CHANNEL_ITEM', item: item, id:id})
    }

    const onChangeReaction = (target) => {
        targetLineRange.current.value = getXPos(id)
        changeChannelItem(target, 'reaction')
    }

    const onRearChange = (target, sub = false) => {
        if(sub) rearRange.current.value = +target.value
        changeChannelItem(target, 'rear')
    }

    const onFrontChange = (target, sub = false) => {
        if(sub) frontRange.current.value = +target.value
        changeChannelItem(target, 'front')
    }

    const onSuppressionChange = (target) => {
        target.value = +target.value
        setSuppression(target, id)
        suppressChange(target.value, id)
    }

    const onTypeSuppressChange = (target) => {
        stypeChange(target, id)
        suppressChange(getSuppression(id), id)
    }

    useEffect(() => {
        targetLineRange.current.value = +channelItem.xpos
        rearRange.current.value = +channelItem.rear
        frontRange.current.value = +channelItem.front
    },[])

    useEffect(() => {
        if(!renderBlock){
        if(channelItem.min > channelItem.max) changeChannelItem(channelItem.min, 'max')
        }
    }, [channelItem.min])

    useEffect(() => {
        if(!renderBlock){
        if(channelItem.max < channelItem.min) changeChannelItem(channelItem.max, 'min')
        }
    }, [channelItem.max])

    useEffect(() => {
        if(!renderBlock){
            const channels = store.getState().channelsReducer.channels
            localStorage.setItem('channels', JSON.stringify(channels))
        }        
    }, [channelItem])

    useEffect(() => {
        // changeSampleColor(color, id)
    }, [color])
    
    if(renderBlock > 0) renderBlock --

    return (
        <div className='channel_block app_flex channel_item channel_mb'>
            <div className='channel_indicator'>
                <div className='channel_indicator_div' id={trId}></div></div>
                <div className='channel_content'>
                    <div className='app_flex_between'>
                        <div className='channel_label'>Канал: {channelItem.mark}</div>
                        <section className="small example">
                            <PopoverPicker color={color} onChange={setColor}/>
                        </section>
                         {/* buttons */}
                    </div>
                    <div className='app_line'></div>
                    <div className='app_flex_between'>
                        <div className='app_center channel_mr'>
                            <div>С позиции</div>
                            <select 
                                className='channel_select' 
                                size={4}
                                value={channelItem.min}
                                onMouseLeave={(e) => scrollTo(e.target, channelItem.min)}
                                onChange={(e) => changeChannelItem(e.target.value, 'min')}
                                >
                                {selectElements(1022)}
                            </select>
                        </div>
                        <div className='app_center channel_mr'>
                            <div>По позицию</div>
                            <select 
                                className='channel_select' 
                                size={4}
                                value={channelItem.max}
                                onMouseLeave={(e) => scrollTo(e.target, channelItem.max)}
                                onChange={(e) => changeChannelItem(e.target.value, 'max')}
                                >
                                {selectElements(1022)}
                            </select>
                        </div>                        
                        <div className='app_center channel_mr'>
                            <div>Вариант сборки канала</div>
                            <select                 
                                className='channel_select'
                                id={id}
                                size={4}
                                value={channelItem.assemble}
                                onChange={(e) => changeChannelItem(e.target.value, 'assemble')}> 
                                    <option value="average">Среднее от выбранных</option>
                                    <option value="maximum">Максимальный из выбранных</option>
                                    <option value="summ">Сумма выбранных</option>
                            </select>
                        </div>
                        <div className='app_center channel_mr'>
                            <div>Собранный канал и линия срабатывания</div>
                            <div className='channel_block channel_render app_flex'>
                                <div className='channel_render_div' id={divId}></div>
                                <div className='channel_render_vline'></div>
                                <div className='channel_render_scale'>{renderElements()}</div>
                                {channelItem.reaction > 0 ?
                                <>
                                    <div className='channel_render_ili' id={dfId}></div>
                                    <div className='channel_render_ili' id={drId}></div>
                                </> 
                                : null}
                                <input 
                                    className={channelItem.reaction === 0? 
                                        'channel_range' :
                                        'channel_range_hidden'} 
                                    type='range'
                                    min={10}
                                    max={388}
                                    ref={targetLineRange}
                                    // id={rangeId}
                                    onMouseUp={(e) => xposChange(e.target, id)}
                                    onChange={(e) => setXPos(e.target.value, id)}/>                         
                                <div className={channelItem.reaction > 0 ? 
                                    'channel_render_iline channel_render_iline_norm' :
                                    'channel_render_iline channel_render_iline_mini'}
                                    id={inId}></div>
                            </div>
                        </div>
                        <div className='app_center channel_mr'>
                            <div>Буфер тыла</div>
                            <div className='channel_block_mod'>
                                <select 
                                    className='channel_select_mod channel_mt'
                                    value={channelItem.rear}
                                    ref={rearSelectRange}
                                    disabled={channelItem.reaction > 0 ? false : true}
                                    onChange={(e) => onRearChange(e.target, true)}                                    
                                    >
                                    {selectElements(50)}
                                </select><br/>
                                <div className='channel_bufscale'>. 50 . | . 40 . | . 30 . | . 20 . | . 10 . | . . 0 . .</div>
                                <input 
                                    type="range" 
                                    className='channel_bufrange channel_bufrange_reverse'
                                    ref={rearRange}
                                    disabled={channelItem.reaction > 0 ? false : true}
                                    max={50}
                                    min={0}
                                    onMouseUp={(e) => onRearChange(e.target)}
                                    onChange={(e) => rearSelectRange.current.value = +e.target.value}/>                  
                            </div>                                        
                        </div>
                        <div className='app_center channel_mr'>
                            <div>Буфер фронта</div>
                            <div className='channel_block_mod'>
                            <select 
                                    className='channel_select_mod channel_mt'
                                    value={channelItem.front}
                                    ref={frontSelectRange}
                                    disabled={channelItem.reaction > 0 ? false : true}
                                    onChange={(e) => onFrontChange(e.target, true)}                                    
                                    >
                                    {selectElements(50)}
                                </select><br/>
                                <div className='channel_bufscale'>. . 0 . . | . 10 . | . 20 . | . 30 . | . 40 . | . 50 .</div>
                                <input 
                                    type="range" 
                                    className='channel_bufrange'
                                    ref={frontRange}
                                    disabled={channelItem.reaction > 0 ? false : true}
                                    max={50}
                                    min={0}
                                    onMouseUp={(e) => onFrontChange(e.target)}
                                    onChange={(e) => frontSelectRange.current.value = +e.target.value}/> 
                            </div>
                        </div>                        
                        <div>
                            <div className='app_center channel_mr'>
                            <div>Реакция</div>
                            <select 
                                className='channel_select' 
                                size={4}
                                value={channelItem.reaction}
                                onMouseLeave={(e) => scrollTo(e.target, channelItem.reaction)}
                                onChange={(e) => onChangeReaction(e.target)}
                                >
                                {selectElements(5)}
                            </select>
                            </div>
                        </div>                                 
                        <div className='app_center'>
                            <div>Подавление</div>
                            <div className='channel_block_mod'>
                                <select 
                                    className='channel_select channel_mb channel_mt' 
                                    value={channelItem.stype}
                                    onChange={(e) => onTypeSuppressChange(e.target)}
                                    >
                                    <option value='avto'>Авто</option>
                                    <option value='manual'>Руч.</option>
                                </select><br/>
                                <select 
                                    className='channel_select_sup' 
                                    id={suppressionId}
                                    defaultValue={channelItem.suppress}
                                    onChange={(e) => onSuppressionChange(e.target)}>
                                    <option key={0}>0</option>
                                    {selectElements(50, 2)}
                                </select>                                             
                            </div>                                        
                        </div>                                
                    </div>                    
                </div>                
        </div>
    )
}

export default ChannelItem;
