import { store } from '../store/store';

var channels,
    opacityDown, 
    opacityUp, 
    opacityMax,
    xPos = [],
    colorOpacity =[],
    viewOpacity = [],
    suppression = [],
    visSet;

// присваивание значений для массивов
for(let i = 0; i < 12; i++) {
    xPos[i] = [100];
    colorOpacity[i] = 0.1;
    viewOpacity[i] = 0.1;
}

// инициализация стейта для рисования
export const initDrawState = () => {
    channels = store.getState().channelsReducer.channels
    opacityUp = store.getState().elementsReducer.opacityUp
    opacityDown = store.getState().elementsReducer.opacityDown
    opacityMax = store.getState().elementsReducer.opacityMax
    visSet = store.getState().elementsReducer.visSet
}
// установка значений по умолчанию
export const letsDefaultVariables = () => {
    channels.forEach((item, i) => {
        if(item.reaction === 0) xPos[i] = item.xpos
        if (item.stype === 'manual') {
            suppression[i] = item.suppress
        } else {
            suppression[i] = 0
        }
        document.getElementById(`suppression${i}`).value = suppression[i]
    })
}

console.log(channels)
// изменение динамических объектов
export const sampleDrawing = (data) => {
    if(channels){
        channels.forEach((item, i) => {

        let mass;

         // сборка каналов с использованием средних значений (average)
        if(item.assemble === 'average'){
            let arr = [];
            for(let f = item.min; f <= item.max ; f++){
                arr.push(data[f]);                                  
            }
            mass = arr.reduce((a, b) => (a + b)) / arr.length        
        }

        // сборка каналов с использованием максимального значения (maximum)
        if(item.assemble === 'maximum'){
            mass = 0;
            for(let f = item.min; f <= item.max ; f++){
                if(mass < data[f]) mass = Math.floor(data[f])                               
            }                  
        }

        // сборка каналов с использованием суммы значений (summ)
        if(item.assemble === 'summ'){
            mass = 0;
            for(let f = item.min; f <= item.max ; f++){
                mass += data[f]                             
            }                  
        }

        // проверка mass переменной на максимум / подавление
        if(suppression[i] > 1) mass = mass/suppression[i]          
        const setSuppression = (option) => {
            suppression[i] += option
            if(suppression[i] === 1) suppression[i] += option // если единица, то повторяем сложение или вычитание на 1
            const suppr = document.getElementById(`suppression${i}`)
            if(suppr) suppr.value = suppression[i]
        }
        if(mass > 384){
            mass = 384
            if(suppression[i] < 50 && item.stype === 'avto') setSuppression(+1)
        }          
        if(mass < 20 && suppression[i] > 0 && item.stype === 'avto') setSuppression(-1) 
        
        // установка позиции линии срабатывания
        if(xPos[i] < mass-item.front){
            xPos[i] +=item.reaction
            if(xPos[i] > 387) xPos[i] = 387
        } else if(xPos[i] > mass+item.rear) {
            xPos[i] -=item.reaction
            if(xPos[i] < 10) xPos[i] = 10            
        }
        // проверка ухода за переделы div при изменении rear или front
        if(xPos[i] - item.rear < 10 && item.reaction > 0) xPos[i] = 10 + item.rear
        if(xPos[i] + item.front > 387 && item.reaction > 0) xPos[i] = 387 - item.front

        // срабатывание (уменьшение/увеличение прозрачности для визуализирующих сигнал элементов)
        if(mass>xPos[i]){
            colorOpacity[i] +=0.1;
            viewOpacity[i] += opacityUp;
            if(colorOpacity[i] > 1) colorOpacity[i] = 1;
            if(viewOpacity[i] > opacityMax) viewOpacity[i] = opacityMax;
        } else {
            colorOpacity[i] -=0.1;
            viewOpacity[i] -= opacityDown;
            if(colorOpacity[i] < 0) colorOpacity[i] = 0;
            if(viewOpacity[i] < 0) viewOpacity[i] = 0;
        }

        const div = document.getElementById(`div${i}`);
        if ( div ){
            //indikator trigerr
            document.getElementById(`tr${i}`).style.opacity = colorOpacity[i];
            document.getElementById(`tr${i}`).style.background = `radial-gradient(${item.color}, #000000)`;

            //target line position
            document.getElementById(`in${i}`).style.left = `${xPos[i]}px`;

            // front and rear
            const dr = document.getElementById(`dr${i}`)
            if(dr) dr.style.left = `${xPos[i]-item.rear}px`;
            const df = document.getElementById(`df${i}`)
            if(df) df.style.left = `${xPos[i]+item.front}px`;
           
            //channel visualisation
            div.style.width = `${mass}px`;                
            div.style.background = `linear-gradient(to top, #000000, ${item.color} , #000000)`;  
        }
    })
    }         
}
// изменение позиции линии срабатывания с помощью inputrage
export const setXPos = (value, id) => {
    if(channels[id].reaction === 0){
        xPos[id] = +value
    }    
}
// получение позиции линии срабатывания
export const getXPos = (id) => xPos[id]
// установка переменной массива "подавление"
export const setSuppression = (target, id) => {    
    suppression[id] = +target.value   
}
// получение переменной массива "подавление"
export const getSuppression = (id) => suppression[id]
