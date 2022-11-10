import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import '../css/SaladeCola.css'


import BatallaMulti from './BatallaMulti.js';
const socket = io("http://localhost:3000");

function SaladeCola() {
    const [sala,setSalaDeBatalla] = useState()
    const [batallaLista,setBatallaLista] = useState(false)

    useEffect(()=>{
        socket.emit("usuarioencola")
    },[])   
    
    socket.on("asignarSaladeBatalla",salaDeBatalla =>{
        setSalaDeBatalla(salaDeBatalla)
        setBatallaLista(true)
    })
    
    if(window.location.pathname == '/saladecola'){
        window.onpopstate = () => socket.emit("salirDeSala",{"sala":sala,"nombreUsuario":localStorage.getItem("nombreUsuario")})
    }    
 
    return (
        <div className="contenedor-cola">
            
            {batallaLista ? <BatallaMulti socket={socket} sala={sala} /> : <div className='Cola-Text'>
                Buscando oponente...
                <img src='https://www.gifsanimados.org/data/media/1446/pokemon-imagen-animada-0034.gif'/>
                </div> 
                }
           
        </div>
    );
}

export default SaladeCola;