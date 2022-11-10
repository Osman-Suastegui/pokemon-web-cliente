import React, { useState } from 'react';
import Chat from './Chat.js'
import "../css/BatallaMulti.css"

function BatallaMulti({sala,socket}) {
    const [color, setColor] = useState("yellow")
    socket.on("cambiarBtnColor",()=>{
        if(color == 'yellow') {
            setColor('red')
        }
        else {
            setColor('yellow')
        }
    })
    const cambiarColor = () => {
        socket.emit("btnPress",sala)
    }
    return (
        <div className="Contenedor-Batalla">
            <button style={{background : color}} onClick={cambiarColor}>cambiar color (switch)</button>
            <Chat sala={sala} socket={socket}/>
        </div>
    );
}

export default BatallaMulti;