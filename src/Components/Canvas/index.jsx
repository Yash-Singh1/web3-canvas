import React, { useRef, useState } from 'react';
import Canvas from './Canvas';

function App({ file, save }) {

  let canvasRef = useRef();

  return (
    <div>
      <Canvas
        saved={file.image}
        setSaved={save}
        canvasRef={canvasRef}
        started={file.started}
      />
    </div>
  );
}

export default App;
