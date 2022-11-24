import PokemonPres from './PokemonPres'
import { useState, useEffect } from 'react'
import { obtenerEquipo, URL_API } from '../api/pokemon.api.js'
import { useFetcher } from 'react-router-dom'
import Pokemon from '../clases/Pokemon.js'

function CrearEquipo() {
    const [pokemones, setPokemones] = useState([])
    const [pokemonActualID, setPokemonActualID] = useState(1)
    const [miEquipo, setMiEquipo] = useState([])

    const cargarEquipo = async () => {
        const response = await obtenerEquipo(localStorage.getItem("nombreUsuario"))
        let miEquipoTmp = await response.json()
        miEquipoTmp = miEquipoTmp.map(pokemon => {
            return new Pokemon(
            pokemon.pokemonID,
            pokemon.nombre,
            pokemon.tipo,
            pokemon.vida,
            pokemon.fuerza,
            pokemon.velocidad,
            pokemon.defensa,
            pokemon.img_frente,
            pokemon.img_espaldas
            )
        })
        console.log(miEquipoTmp)
        setMiEquipo(miEquipoTmp)
        let entrenador = JSON.parse(localStorage.getItem("entrenador"))
        entrenador.equipo = miEquipoTmp
        localStorage.setItem("entrenador", JSON.stringify(entrenador))
    }
    useEffect(() => {

        fetch(URL_API + "/obtenerPokemones")
            .then(data => data.json())
            .then(pokemones => {
                setPokemones(pokemones)
            })
        cargarEquipo()
    }, [])



    const handleChange = (e) => {
        console.log(e.target.value);
        setPokemonActualID(e.target.value)

    }
    const guardarPokemon = async () => {
        let entrenador = JSON.parse(localStorage.getItem("entrenador"))
        if(entrenador.equipo.length  === 3 ){
            alert("solo 3 pokemones permitidos en tu equipo")
            return
        }
        const usuario = localStorage.getItem("nombreUsuario")
        const mensaje = {
            "usuario": usuario,
            "id": pokemonActualID
        }

        await fetch(URL_API + "/guardarPokemonEquipo", {
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(mensaje)
        })

        cargarEquipo()

    }

    const eliminarPokemon = async (pokemonID) => {
        const mensaje = {
            "usuario": localStorage.getItem("nombreUsuario"),
            "pokemonID": pokemonID
        }
        await fetch(URL_API + "/eliminarPokemon", {
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(mensaje)
        }).then(data => data.json()).then(res => console.log(res.mensaje))

        cargarEquipo()

    }

    return (
        <div>
            <select onChange={handleChange}>
                {
                    pokemones.map(pokemon => (
                        <option key={pokemon.pokemonID} value={pokemon.pokemonID}>{pokemon.nombre}</option>
                    ))
                }
            </select>
            <button onClick={guardarPokemon}>guardar pokemon </button>
            {
                miEquipo.map(miPokemon => (
                    <div key={miPokemon.pokemonID}>
                        <PokemonPres pokemon={miPokemon} />
                        <button onClick={() => eliminarPokemon(miPokemon.pokemonID)}>Eliminar pokemon </button>
                    </div>
                ))
            }
        </div>


    )

}






export default CrearEquipo