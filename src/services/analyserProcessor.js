import { appProceccor } from "./appProcessor";

var ctx, analyser, src, data = new Uint8Array(637);

// инициализация звуковых устройств ввода
export const analyserInitiate = () => {
    console.log('analayserInit')
    if(ctx) return;
    navigator.mediaDevices.getUserMedia({
        audio: true
    }).then(stream => {
        ctx = new AudioContext();
        analyser = ctx.createAnalyser();
        src = ctx.createMediaStreamSource(stream);
        src.connect(analyser);
        appProceccor();
    }).catch(error => {    
        alert(error);        
        setTimeout(() => {
            analyserInitiate();
        }, 3000)        
    });
}
// получение и преобразование звуковых данных
export const getData = () => {
    if(analyser) analyser.getByteFrequencyData(data)  
    return data
}
 
