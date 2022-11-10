import PokemonPres from './PokemonPres'
import { useState, useEffect } from 'react'
import { obtenerEquipo } from '../api/pokemon.api.js'

function CrearEquipo() {
    const [pokemones, setPokemones] = useState([])
    const [pokemonActualID, setPokemonActualID] = useState(1)
    const [miEquipo, setMiEquipo] = useState([])

    const cargarEquipo = async () => {
        const response = await obtenerEquipo(localStorage.getItem("nombreUsuario"))
        const miEquipoTmp = await response.json()
        setMiEquipo(miEquipoTmp)
        let entrenador = JSON.parse(localStorage.getItem("entrenador"))
        entrenador.equipo = miEquipoTmp
        localStorage.setItem("entrenador",JSON.stringify(entrenador))
        }
    useEffect(() => {

        fetch("http://localhost:3000/obtenerPokemones")
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
        const usuario = localStorage.getItem("nombreUsuario")
        const mensaje = {
            "usuario": usuario,
            "id": pokemonActualID
        }

        await fetch("http://localhost:3000/guardarPokemonEquipo", {
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
        await fetch("http://localhost:3000/eliminarPokemon", {
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