import { Button, Text } from '@blockstack/ui'
import React, {useRef, useState, useEffect} from 'react'

export default function Canvas({ saved, setSaved, canvasRef, started }) {
  let contextRef = useRef()

  let [drawing, setDrawing] = useState(true)
  let [mouseDown, setMouseDown] = useState(false)

  useEffect(() => {
      const canvas = canvasRef.current
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`

      const context = canvas.getContext('2d')
      // context.scale(2, 2)
      context.lineCap = 'round'
      context.strokeStyle = 'black'
      context.lineWidth = 5
      contextRef.current = context

      if(started) {
        drawing = document.createElement('img')
        drawing.src = saved
        const context = canvasRef.current.getContext('2d')
        context.drawImage(drawing, 0, 0, )
      }
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
      <Button onClick={drawing ? erase : startDraw}>Toggle</Button>
      <Text style={{ marginLeft: '10px' }}>Current mode: {drawing ? 'Drawing' : 'Erasing'}</Text>
    </div>
  )
}
