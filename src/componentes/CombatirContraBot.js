import '../css/CombatirContraBot.css';
import React from 'react';
import Combate from './Combate.js';

import { useEffect, useState } from 'react'
import Pokemon from '../clases/Pokemon';
import Entrenador from '../clases/Entrenador';
import {useNavigate} from 'react-router-dom'
function CombatirBot() {

  const [entrenador, setEntrenador] = useState(JSON.parse(localStorage.getItem("entrenador")))
  const [bot, setBot] = useState(null)
  const [pokemonEnUsoJugador, setPokemonEnUsoJugador] = useState(entrenador.equipo[0])
  const [pokemonContrincante, setPokemonContrincante] = useState()
  const [habilidadContrincante,setHabilidadContrincante] = useState("atacar")
  const [indexBot,setIndexBot] = useState(0)
  const navigate = useNavigate()

  const obtenerEquipoBot = async () => {
    await fetch("http://localhost:3000/obtenerPokemones")
      .then(data => data.json())
      .then(pokemones => {
        generarEquipoBot(pokemones.map(pokemon => new Pokemon(pokemon.pokemonID,pokemon.nombre, pokemon.tipo, pokemon.vida, pokemon.fuerza, pokemon.velocidad, pokemon.defensa, pokemon.img_frente, null)
        ))
      })
  }

  const generarEquipoBot = (todosLosPokemones) => {
    const n = todosLosPokemones.length
    const cantidadPokemones = 3
    let tmpMiEquipo = new Set()
    let index = 0

    while (index < cantidadPokemones) {
      let random = Math.floor(Math.random() * n)
      const poke = todosLosPokemones[random]
      if (tmpMiEquipo.has(poke)) continue
      tmpMiEquipo.add(poke)
      index++
    }
    setPokemonContrincante(Array.from(tmpMiEquipo)[0])
    let entrenadorBot = new Entrenador("Bot", Array.from(tmpMiEquipo), 252)
    setBot(entrenadorBot)

    
  }

  useEffect(() => {
    obtenerEquipoBot()

  }, [])

  useEffect(()=>{
    
      if(pokemonContrincante?.vida <= 0){
        if(indexBot < 2 ){
          setIndexBot(indexBot + 1)
        }
      }
 
    
    
  },[pokemonContrincante?.vida])

  useEffect(()=>{
    setPokemonContrincante(bot?.equipo[indexBot])

  },[indexBot])

  useEffect(()=>{
    if(habilidadContrincante == null){
      // const habilidades = ["atacar","defender","atacarImprobable"]
      const habilidades = ["atacar","atacar","atacar"]
      const randomHabilidad = Math.floor(Math.random() * habilidades.length)
      const habilidadSeleccionada = habilidades[randomHabilidad]
      console.log("habilidad seleccionada ",habilidadSeleccionada )
      
      setHabilidadContrincante(habilidadSeleccionada)
    }
  },[habilidadContrincante])



  

  return (
    <div className='Contenedor-Principal'>
      {
        bot == null ? (<h1>cargando...</h1>) : (<Combate jugador={entrenador} setJugador={setEntrenador} contrincante={bot} setContrincante={setBot} pokemonEnUsoJugador={pokemonEnUsoJugador} pokemonContrincante={pokemonContrincante} setPokemonContrincante={setPokemonContrincante} habilidadContrincante={habilidadContrincante} setPokemonEnUsoJugador={setPokemonEnUsoJugador} setHabilidadContrincante={setHabilidadContrincante}/>)

      }
    </div>
  );
}

export default CombatirBot; 