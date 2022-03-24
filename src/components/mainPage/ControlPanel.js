import { useEffect } from "react";
import { canvasInitiation } from "../../services/drawingProcessor";

const ControlPanel = () => {

    useEffect(() => {
        canvasInitiation()
    },[])

    return (
        <div className='app_block'>
            <canvas id='canvasDisplay'></canvas>
        </div>
    )
}

export default ControlPanel;