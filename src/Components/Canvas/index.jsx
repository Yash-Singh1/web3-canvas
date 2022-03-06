import React, {useEffect, useRef, useState} from "react";
import Canvas from './Canvas'

function App({file, save}) {
    function save() {

    }

    let canvasRef = useRef()
    let contextRef = useRef()

    let [drawing, setDrawing] = useState(false)
    let [mouseDown, setMouseDown] = useState(false)
    let [saved, setSaved] = useState()
    let [image, setImage] = useState()


    
    return (
        <div>
            <Canvas saved={saved} setImage={setImage} setSaved={setSaved} canvasRef={canvasRef} started={file.started} />
            <p>
                {saved}
            </p>
        </div>
    )
}

export default App
