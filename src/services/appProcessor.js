import { sampleDrawing, canvasDraw } from "./drawingProcessor";
import { getData} from "./analyserProcessor";

const appProceccor = () => {
    requestAnimationFrame(appProceccor);
    const data = getData()
    canvasDraw(data);
    sampleDrawing(data);
}

export { appProceccor };
