import { appProceccor } from "./appProcessor";

var ctx, analyser, src, data = new Uint8Array(1024);

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
        alert(error + '\r\n\ Отклонено.');        
        setTimeout(() => {
            analyserInitiate();
        }, 5000)        
    });
}
// получение и преобразование звуковых данных
export const getData = () => {
    if(analyser) analyser.getByteFrequencyData(data)  
    return data
}
 
