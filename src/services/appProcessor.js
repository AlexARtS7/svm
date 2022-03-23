import { sampleDrawing } from "./drawingProcessor";
import { getData} from "./analyserProcessor";

const appProceccor = () => {
    requestAnimationFrame(appProceccor);
    const data = getData()
    // drawingProcessor(data);
    sampleDrawing(data);
}

export { appProceccor };
