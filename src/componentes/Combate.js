import '../css/Combate.css';
import InfoPoke from './PlayerHUD.js'; //CUADRO GRIS CON DATOS DE LOS JUGADORES
import MiEquipo from './MiEquipo.js';

import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Combate({miHabilidad, setMiHabilidad,setContrincante, setPokemonContrincante, setJugador, pokemonContrincante, pokemonEnUsoJugador, jugador, contrincante, habilidadContrincante, setPokemonEnUsoJugador, setHabilidadContrincante }) {

    const [btnBloqueado, setBtnBloqueado] = useState(false)
    const [btnHabilidadas,setBtnHabilidades] = useState(false)
    const navigate = useNavigate()
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const elegirPokemon = (id) => {
        
        let pokeElegido = jugador.equipo.filter(poke => poke.pokemonID === id)[0]
        if(id === pokemonEnUsoJugador.pokemonID) return
        setBtnBloqueado(true)
        setPokemonEnUsoJugador(pokeElegido)
        setMiHabilidad({"habilidad":"cambiarPokemon","danio":0,"curar":0})
        setBtnHabilidades(false)
    }
    const verificarSiGanoContrincante = () => {
        let pokeDebilitados = 0
        jugador.equipo.map(pokemon => {
            if (pokemon.vida <= 0) pokeDebilitados++
        })

        return pokeDebilitados === jugador.equipo.length
    }
    const verificarSiGane = () => {
        let pokeDebilitados = 0
        contrincante.equipo.map(pokemon => {
            if (pokemon.vida <= 0) pokeDebilitados++
        })
        return pokeDebilitados === 3
    }
    const verificarGanador = () => {
        if (verificarSiGane()) {
            alert("El jugador " + jugador.nombre + " ha ganado ")

            navigate("/menu-usuario")

        }
        if (verificarSiGanoContrincante()) {
            alert("El jugador " + contrincante.nombre + " ha ganado ")
            navigate("/menu-usuario")

        }
    }

    const elegirAtacar = () => {
        setBtnBloqueado(true)
        setMiHabilidad({"habilidad":'atacar',"danio":pokemonEnUsoJugador.fuerza,"curar":0})
    }
    const elegirCurarse = () => {
        setBtnBloqueado(true)
        const cantidadAcurarse = Math.floor(Math.random() * pokemonEnUsoJugador.defensa)
        setMiHabilidad({"habilidad":'curar',"danio":0,"curar":cantidadAcurarse})

    }
    const elegirAtacarImprobable = () => {
        setBtnBloqueado(true)
        let numRandom = Math.floor(Math.random() * 9)
        const numeros = [1,2,3,4,5,6,7,8]
        const esAcertado = numeros.includes(numRandom)
        let danioHecho = pokemonEnUsoJugador.fuerza * 1.3
        setMiHabilidad({"habilidad":'atacarImprobable',"danio":danioHecho,acerto:esAcertado})
    }
    const atacar = () => {
        setPokemonContrincante(poke => ({
            ...poke,
            vida: poke.vida - pokemonEnUsoJugador.fuerza
        }))
    }
    const atacarImprobable = () => {
            if(miHabilidad.acerto){
                setPokemonContrincante(poke => ({
                    ...poke,
                    vida: poke.vida - miHabilidad.danio
                }))
            }
        }
   
    const curar = (pokemoEnUso,setPokemon,entrenador) => {
        setPokemon(poke => ({
            ...poke,
            vida : poke.vida + (entrenador === 'usuario' ?  miHabilidad.curar : habilidadContrincante.curar) 
        }))
    }

    const usuarioAtacaContrincanteAtaca = () => {
        console.table(habilidadContrincante)
         // ataca usuario
         if (miHabilidad.habilidad ===  "atacar") atacar()
         if (miHabilidad.habilidad === "atacarImprobable") atacarImprobable()
         if(miHabilidad.habilidad === "curar") curar(pokemonEnUsoJugador,setPokemonEnUsoJugador,'usuario')
         
         if (pokemonContrincante.vida - pokemonEnUsoJugador.fuerza <= 0) {
             setBtnBloqueado(false)
             return
         }
         sleep(2000).then(() => {
             if (habilidadContrincante.habilidad === "atacar") {
                console.log("Aca entro ",pokemonContrincante.fuerza)
                 setPokemonEnUsoJugador(poke => ({
                     ...poke,
                     vida: poke.vida - pokemonContrincante.fuerza
                 }))

             }

             if (habilidadContrincante.habilidad === "atacarImprobable") {
                 if (habilidadContrincante.acerto) {
                     setPokemonEnUsoJugador(poke => ({
                         ...poke,
                         vida: poke.vida - habilidadContrincante.danio
                     }))
                 }
             }
             if(habilidadContrincante.habilidad === "curar") curar(pokemonContrincante,setPokemonContrincante,'contrincante')
                
             

             setBtnBloqueado(false)

         })
        
    }

    const contrincanteAtacaUsuarioAtaca = () => {
        sleep(2000).then(() => {
            if (habilidadContrincante.habilidad === "atacar") {
                setPokemonEnUsoJugador(poke => ({
                    ...poke,
                    vida: poke.vida - pokemonContrincante.fuerza
                }))

            }

            if (habilidadContrincante.habilidad === "atacarImprobable") {
                if (habilidadContrincante.acerto) {
                    setPokemonEnUsoJugador(poke => ({
                        ...poke,
                        vida: poke.vida - habilidadContrincante.danio
                    }))
                }
            }
            if(habilidadContrincante.habilidad === "curar") curar(pokemonContrincante,setPokemonContrincante,'contrincante')

            sleep(1000).then(() => {
                if(pokemonEnUsoJugador.vida <= 0){
                    setBtnBloqueado(false)
                    return  
                }
                if (miHabilidad.habilidad === "atacar") atacar()
                if (miHabilidad.habilidad ===  "atacarImprobable") atacarImprobable()
                if(miHabilidad.habilidad === "curar") curar(pokemonEnUsoJugador,setPokemonEnUsoJugador,'usuario')
                
                setBtnBloqueado(false)
            })

        })
    }
    const lanzarAtaques = () => {
        setBtnBloqueado(true)

        if (pokemonEnUsoJugador.velocidad > pokemonContrincante.velocidad) {
            usuarioAtacaContrincanteAtaca()
           
        } else if (pokemonContrincante.velocidad > pokemonEnUsoJugador.velocidad) {
           contrincanteAtacaUsuarioAtaca()
        }else{
            let probabilidad = Math.random()
            if( probabilidad <= 0.5){
                usuarioAtacaContrincanteAtaca()
            }else{
                contrincanteAtacaUsuarioAtaca()
            }
        }



    }

    useEffect(() => {

        if (miHabilidad != null && habilidadContrincante != null) {
            lanzarAtaques()
            setMiHabilidad(null)
            setHabilidadContrincante(null)

        }
    }, [miHabilidad, habilidadContrincante])

    useEffect(() => {
        setJugador(jugador => ({
            ...jugador,
            equipo: jugador.equipo.map(poke => {
                if (pokemonEnUsoJugador.pokemonID == poke.pokemonID) {
                    poke.vida = pokemonEnUsoJugador.vida
                }
                return poke

            })
        }))

        verificarGanador()
        if (pokemonEnUsoJugador.vida <= 0) {
            alert("El pokemon " + pokemonEnUsoJugador.nombre + " ha sido debilitado, cambia de pokemon ")
            setBtnHabilidades(true)
            setBtnBloqueado(false)
        }
    }
    , [pokemonEnUsoJugador?.vida])


    useEffect(() => {
        setContrincante(jugador => ({
            ...jugador,
            equipo: jugador.equipo.map(poke => {
                if (pokemonContrincante.pokemonID == poke.pokemonID) {
                    poke.vida = pokemonContrincante.vida
                }
                return poke

            })
        }))
        verificarGanador()

    }
    , [pokemonContrincante?.vida])

    return (
            <div className='Contenedor-Combate'>
                {/* falta crear un arreglo de links de backgrounds y que se escojan random en cada batalla */}
                <div className='Contenedor-Combate-Info'>

                    <section className='poke2'>
                        <InfoPoke miPoke={pokemonEnUsoJugador} className="Usuario" nombre="usuario" />
                    </section>
                    <section className='poke1'>
                        <InfoPoke miPoke={pokemonContrincante} className="Contrincante" nombre="contrincante" />
                    </section>
                  
                    
                    <div className='Pokemons'>
                        <MiEquipo equipos={contrincante.equipo} jugador={contrincante.nombre}  />
                        <MiEquipo equipos={jugador.equipo} jugador={jugador.nombre}   />
                        <div className="cambiar-poke">
                            {jugador.equipo.map(poke => (
                            <button onClick={() => elegirPokemon(poke.pokemonID)} disabled={poke.vida <= 0 ? true : false || btnBloqueado} className='Boton-Pokemon'>{poke.nombre}</button>
                            ))}
                        </div>
                        
                    </div>
                   
                </div>
                <div className='Habilidades'>
                    <button disabled={btnBloqueado ||  btnHabilidadas } name='atacar' onClick={elegirAtacar} className='Boton-Habilidad'>Atacar seguro</button>
                    <button disabled={btnBloqueado || btnHabilidadas } name="atacarImprobable" onClick={elegirAtacarImprobable} className='Boton-Habilidad'>Atacar improbable pero mas danio</button>
                    <button onClick={elegirCurarse} disabled={btnBloqueado || btnHabilidadas } name='curar' className='Boton-Habilidad'>Curarse</button>
                </div>
            </div>
    );
}

export default Combate; 