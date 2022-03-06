import React, {useRef, useState, useEffect} from 'react'

export default function Canvas({ saved, setSaved, canvasRef, started }) {
  let contextRef = useRef()

  let [drawing, setDrawing] = useState(false)
  let [mouseDown, setMouseDown] = useState(false)

  useEffect(() => {
      if(started) {
        drawing = new Image()
        drawing.src = saved
        const context = canvasRef.current.getContext('2d')
        context.drawImage(drawing, 0, 0)

      }

      const canvas = canvasRef.current
      canvas.width = window.innerWidth * 2;
      canvas.height = window.innerHeight * 2;
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`

      const context = canvas.getContext('2d')
      context.scale(2, 2)
      context.lineCap = 'round'
      context.strokeStyle = 'black'
      context.lineWidth = 5
      contextRef.current = context

  }, [])

  function startDrawing({nativeEvent}) {
      setMouseDown(true)
      const {offsetX, offsetY} = nativeEvent
      contextRef.current.beginPath()
      contextRef.current.moveTo(offsetX, offsetY)
  }

  function erase() {
      setDrawing(false)
      const context = canvasRef.current.getContext('2d')
      context.globalCompositeOperation = 'destination-out'
  }

  function startDraw() {
      setDrawing(true)
      const context = canvasRef.current.getContext('2d')
      context.strokeStyle = 'black'
      context.globalCompositeOperation = 'source-over'
  }

  function endDrawing() {
      contextRef.current.closePath()
      setMouseDown(false)

      let media = document.getElementById('canvas')
      const contents = media.toDataURL()
      const data = {image: contents, date: Date.now(), started: true}
      const str_version = JSON.stringify(data)
      setSaved(str_version)
  }

  function draw({nativeEvent}) {
      if(mouseDown) {
          const {offsetX, offsetY} = nativeEvent;
          contextRef.current.lineTo(offsetX, offsetY)
          contextRef.current.stroke()
      }
  }

  
  return (
    <div>
      <canvas 
        id='canvas'
        ref={canvasRef}   
        onMouseDown={startDrawing}
        onMouseUp={endDrawing}
        onMouseMove={draw}
        />
      <button onClick={drawing ? startDraw : erase}>{'Toggle'}</button>
    </div>
  )
}