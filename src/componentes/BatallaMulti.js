import React, { useEffect, useState } from 'react';
import Chat from './Chat.js'
import "../css/BatallaMulti.css"
import Combate from './Combate.js';

function BatallaMulti({sala,socket}) {

    const [entrenador, setEntrenador] = useState(JSON.parse(localStorage.getItem("entrenador")))
    const [contrincante, setContrincante] = useState(null)
    const [pokemonEnUsoJugador, setPokemonEnUsoJugador] = useState(JSON.parse(localStorage.getItem("entrenador")).equipo[0])
    const [pokemonContrincante, setPokemonContrincante] = useState(null)
    const [habilidadContrincante,setHabilidadContrincante] = useState(null)
    const [miHabilidad, setMiHabilidad] = useState(null)

    useEffect(()=>{
        if(miHabilidad != undefined){
            console.log("entra aca??")
            if( miHabilidad.habilidad === 'cambiarPokemon'){
                let pokeEnUso = Object.assign(pokemonEnUsoJugador,{"entrenador":entrenador.nombre,"sala":sala})
                socket.emit("cambiarPokemon",pokeEnUso)
            }
    
        }
    },[pokemonEnUsoJugador])

    socket.on("recibirCambioPokemon",poke => {
        if(poke.entrenador !== entrenador.nombre){
            setPokemonContrincante(poke)
        }
    })
  
    useEffect(()=>{
        if(miHabilidad != undefined){
            let habilidadEnviada = Object.assign(miHabilidad,{"nombre":entrenador.nombre,"sala":sala})
            
            socket.emit("enviarHabilidad",habilidadEnviada)
        }

    },[miHabilidad])
    socket.on("recibirHabilidad",habilidadRecibida =>{
        if(habilidadRecibida.nombre !== entrenador.nombre) {
            setHabilidadContrincante(habilidadRecibida)
        }
    })

       
   useEffect(()=>{
       let entrenador =  JSON.parse(localStorage.getItem("entrenador"))
       entrenador = Object.assign(entrenador,{"sala":sala})
       socket.emit("enviarEntrenador",entrenador)
   },[])

   useEffect(()=>{
    if(pokemonContrincante == undefined){

        setPokemonContrincante(contrincante?.equipo[0])
    }
   },[contrincante])

   socket.on("recibirEntrenador",(ent)=>{
        if(ent.nombre !== entrenador.nombre){
            setContrincante(ent)
        }
   })

    return (
        <div className="Contenedor-Batalla">
            
            {
                (contrincante == null || pokemonContrincante == null ) ? (<h1>cargando...</h1>) : 
                    (<Combate 
                        miHabilidad={miHabilidad} 
                        setMiHabilidad={setMiHabilidad} 
                        jugador={entrenador} 
                        setJugador={setEntrenador} 
                        contrincante={contrincante} 
                        setContrincante={setContrincante} 
                        pokemonEnUsoJugador={pokemonEnUsoJugador} 
                        pokemonContrincante={pokemonContrincante} 
                        setPokemonContrincante={setPokemonContrincante} 
                        habilidadContrincante={habilidadContrincante} 
                        setPokemonEnUsoJugador={setPokemonEnUsoJugador} 
                        setHabilidadContrincante={setHabilidadContrincante}
                    />)
            }
            <Chat sala={sala} socket={socket}/>
        </div>
    );
}

export default BatallaMulti;