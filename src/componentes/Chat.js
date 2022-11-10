import { useState} from "react";
import "../css/chat.css";

function Chat({sala,socket}) {

    const [mensaje,setMensaje] = useState("")
    const [contenidoChat,setContenidoChat] = useState([])

    const handleMensaje = (e) =>{
        setMensaje(e.target.value)
    }
    const enviarMensaje = (e) =>{
        e.preventDefault()
        
        
        const miMensaje = {"usuario":localStorage.getItem("nombreUsuario") ,"mensaje":mensaje,"sala":sala}
        socket.emit("mensaje",miMensaje)
        setMensaje("")
    }
    socket.on("usuarioHaSalidoDePartida",(nombreUsuario)=>{
        let contMensaje = { 
            "usuario" : "",
            "mensaje" : "EL USUARIO " + nombreUsuario + " HA ABANDONADO LA PARTIDA"
        }
        setContenidoChat([...contenidoChat,contMensaje])
    })  

    socket.on("mimensaje",(msg)=>{
        console.log("msg " ,msg)
        let contMensaje = { 
            "usuario" : msg.usuario,
            "mensaje" : msg.mensaje
        }
        setContenidoChat([...contenidoChat,contMensaje])
    })
    return (
            <div className="Contenedor-chat">
                <div className="mi-chat">{
                    contenidoChat.map(msg =>(
                        <div key={msg.key}> {msg.usuario.length != 0 ? msg.usuario + " : " + msg.mensaje: msg.mensaje} </div>
                    ))
                }
                </div>
                <form className='formulario-chat' action="" onSubmit={enviarMensaje}>
                    <input value={mensaje} type="text" onChange={handleMensaje} />
                    <button className="boton-char" type="submit">
                    Enviar mensaje
                    </button>
                </form>
            </div>
    );
}

export default Chat;