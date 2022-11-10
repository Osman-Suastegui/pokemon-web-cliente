import '../css/Combate.css';
import InfoPoke from './PlayerHUD.js'; //CUADRO GRIS CON DATOS DE LOS JUGADORES
import MiEquipo from './MiEquipo.js';

import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Combate({ setContrincante, setPokemonContrincante, setJugador, pokemonContrincante, pokemonEnUsoJugador, jugador, contrincante, habilidadContrincante, setPokemonEnUsoJugador, setHabilidadContrincante }) {
    const [habilidad, setHabilidad] = useState(null)
    const [btnBloqueado, setBtnBloqueado] = useState(false)
    const navigate = useNavigate()
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const elegirPokemon = (id) => {
        console.log("id ", id)
        let pokeElegido = jugador.equipo.filter(poke => poke.pokemonID === id)[0]
        setPokemonEnUsoJugador(pokeElegido)
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

    const atacar = () => {
        setPokemonContrincante(poke => ({
            ...poke,
            vida: poke.vida - pokemonEnUsoJugador.fuerza
        }))
    }
    const atacarImprobable = () => {

        let numRandom = Math.floor(Math.random() * 10)
        const numeros = [4, 7, 9]
        if (numeros.includes(numRandom)) {
            setPokemonContrincante(poke => ({
                ...poke,
                vida: poke.vida - pokemonEnUsoJugador.fuerza
            }))
        }
    }

    const lanzarAtaques = () => {
        setBtnBloqueado(true)

        if (pokemonEnUsoJugador.velocidad > pokemonContrincante.velocidad) {

            // ataca usuario
            if (habilidad == "atacar") atacar()
            if (habilidad == "atacarImprobable") atacarImprobable()
            // if(habilidad == "defenderse") defenderse()
            if (pokemonContrincante.vida - pokemonEnUsoJugador.fuerza <= 0) {
                console.log("awa")
                setBtnBloqueado(false)
                return
            }
            sleep(2000).then(() => {
                if (habilidadContrincante === "atacar") {
                    setPokemonEnUsoJugador(poke => ({
                        ...poke,
                        vida: poke.vida - pokemonContrincante.fuerza
                    }))

                }

                if (habilidadContrincante === "atacarImprobable") {
                    let numRandom = Math.floor(Math.random() * 10)
                    const numeros = [4, 7, 9]
                    if (numeros.includes(numRandom)) {
                        setPokemonEnUsoJugador(poke => ({
                            ...poke,
                            vida: poke.vida - pokemonContrincante.fuerza
                        }))
                    }
                }

                setBtnBloqueado(false)

            })
        } else if (pokemonContrincante.velocidad > pokemonEnUsoJugador.velocidad) {
            console.log("aca")
            sleep(2000).then(() => {
                if (habilidadContrincante === "atacar") {
                    setPokemonEnUsoJugador(poke => ({
                        ...poke,
                        vida: poke.vida - pokemonContrincante.fuerza
                    }))

                }

                if (habilidadContrincante === "atacarImprobable") {
                    let numRandom = Math.floor(Math.random() * 10)
                    const numeros = [4, 7, 9]
                    if (numeros.includes(numRandom)) {
                        setPokemonEnUsoJugador(poke => ({
                            ...poke,
                            vida: poke.vida - pokemonContrincante.fuerza
                        }))
                    }
                }

                sleep(1000).then(() => {
                    if(pokemonEnUsoJugador.vida <= 0){
                        console.log("awa123")
                        setBtnBloqueado(false)
                        return  
                    }
                    if (habilidad == "atacar") atacar()
                    if (habilidad == "atacarImprobable") atacarImprobable()
                    setBtnBloqueado(false)
                })

            })




        }



    }

    useEffect(() => {

        if (habilidad != null && habilidadContrincante != null) {
            lanzarAtaques()
            setHabilidad(null)
            setHabilidadContrincante(null)



        }
    }, [habilidad, habilidadContrincante])

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
            alert("El pokemon " + pokemonEnUsoJugador.nombre + " ha sido debilitado cambia de pokemon o se escogera aleatoriamente ")
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
        <div className='Contenedor-Principal'>
            <div className='Contenedor-Combate'>
                <div className='Contenedor-Info'>
                    <InfoPoke miPoke={pokemonContrincante} />
                    <InfoPoke miPoke={pokemonEnUsoJugador} />
                </div>

                <div className='Pokemons'>/
                    <MiEquipo equipos={contrincante.equipo} />
                    <MiEquipo equipos={jugador.equipo} />
                </div>

                <div className='Habilidades'>
                    {jugador.equipo.map(poke => (

                        <button onClick={() => elegirPokemon(poke.pokemonID)} disabled={poke.vida <= 0 ? true : false || btnBloqueado ? true : false} className='Boton-Habilidad'>{poke.nombre}</button>
                    ))}
                    <button disabled={btnBloqueado ? true : false} name='atacar' onClick={(e) => setHabilidad(e.target.name)} className='Boton-Habilidad'>Atacar seguro</button>
                    <button disabled={btnBloqueado ? true : false} name="atacarImprobable" onClick={(e) => setHabilidad(e.target.name)} className='Boton-Habilidad'>Atacar improbable pero mas danio</button>
                    <button disabled={btnBloqueado ? true : false} name='defenderse' className='Boton-Habilidad'>Defensa</button>


                </div>
            </div>
        </div>
    );
}

export default Combate; 