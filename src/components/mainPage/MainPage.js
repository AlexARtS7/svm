import { useEffect } from "react";
import { useSelector } from 'react-redux'
import { initDrawState } from "../../services/drawingProcessor";
import ChannelItem from "./ChannelItem";

const MainPage = () => {
    console.log('MainPageRender...')
    const lengthOfChannels = useSelector(state => state.channelsReducer.channels.length)

    const items = []
    for (let i = 0 ; i < lengthOfChannels ; i ++) {
        items.push( <ChannelItem key={i} id={i}/> )        
    }

    // useEffect(() => {
    //     initDrawState()
    // },[])

    return (
        <>
            <header className='app_block main_header'>
                SoundVisualMachine
            </header>
            {items}
        </>        
    )
}

export default MainPage;