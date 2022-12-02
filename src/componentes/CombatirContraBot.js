import '../css/CombatirContraBot.css';
import React from 'react';
import Combate from './Combate.js';

import { useEffect, useState } from 'react'
import Pokemon from '../clases/Pokemon';
import Entrenador from '../clases/Entrenador';
import {URL_API} from '../api/pokemon.api.js'
function CombatirBot() {
  const [entrenador, setEntrenador] = useState(JSON.parse(localStorage.getItem("entrenador")))
  const [bot, setBot] = useState(null)
  const [pokemonEnUsoJugador, setPokemonEnUsoJugador] = useState(entrenador.equipo[0])
  const [pokemonContrincante, setPokemonContrincante] = useState()
  const [habilidadContrincante,setHabilidadContrincante] = useState({"habilidad":"atacar"})
  const [miHabilidad, setMiHabilidad] = useState(null)
  const [indexBot,setIndexBot] = useState(0)
  const [probabilidad,setProbabilidad] = useState(0)
  const [personaMasRapida,setpersonaMasRapida] = useState("")

  const obtenerEquipoBot = async () => {
    await fetch(URL_API + "/obtenerPokemones")
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
    if(miHabilidad != null && habilidadContrincante != null && pokemonContrincante.tipo === pokemonEnUsoJugador.tipo){
      if(Math.random() <= 0.5){
        setpersonaMasRapida(entrenador.nombre)
      }else{
        setpersonaMasRapida("Bot")
      }
    }
  },[miHabilidad,habilidadContrincante])

  useEffect(()=>{
    if(habilidadContrincante == null){
      const habilidades = ["atacar","curar","atacarImprobable"]
      const randomHabilidad = Math.floor(Math.random() * habilidades.length)
      const habilidadSeleccionada = habilidades[randomHabilidad]
      console.log("habilidad seleccionada ",habilidadSeleccionada )
      if(habilidadSeleccionada === 'curar'){
        const cantidadAcurarse = Math.floor(Math.random() * pokemonContrincante.defensa)
        setHabilidadContrincante({"habilidad":habilidadSeleccionada,'curar':cantidadAcurarse})
      }
      if(habilidadSeleccionada === 'atacar'){
        setHabilidadContrincante({"habilidad":habilidadSeleccionada})        
      }
      if(habilidadSeleccionada === 'atacarImprobable'){
        let numRandom = Math.floor(Math.random() * 9)
        const numeros = [1,2,3,4,5,6,7,8]
        const esAcertado = numeros.includes(numRandom)
        let danioHecho = Math.floor(pokemonContrincante.fuerza * 1.3)
        setHabilidadContrincante({"habilidad":'atacarImprobable',"danio":danioHecho,acerto:esAcertado})

      }
    }
  },[habilidadContrincante])


  return (
    <div className='Contenedor-Principal'>
      {
        (bot == null ) ? (<h1>cargando...</h1>) : (<Combate miHabilidad={miHabilidad} setMiHabilidad={setMiHabilidad} jugador={entrenador} setJugador={setEntrenador} contrincante={bot} setContrincante={setBot} pokemonEnUsoJugador={pokemonEnUsoJugador} pokemonContrincante={pokemonContrincante} setPokemonContrincante={setPokemonContrincante} habilidadContrincante={habilidadContrincante || null} setPokemonEnUsoJugador={setPokemonEnUsoJugador} setHabilidadContrincante={setHabilidadContrincante} personaMasRapida={personaMasRapida} setpersonaMasRapida={setpersonaMasRapida}/>)

      }
    </div>
  );
}

export default CombatirBot; 