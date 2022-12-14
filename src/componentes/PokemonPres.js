import { useState, useEffect } from 'react'
import '../css/PokemonPress.css';
function PokemonPres({ pokemon }) {
    return (
        <div className='card-pokemonPres'>
            <img src={pokemon.img_frente} alt="" />
            <div className='caracteristicas-pokemonPres'>
                <h2>NOMBRE: {pokemon.nombre}</h2>
                <h2>TIPO: {pokemon.tipo}</h2>
                <h2>FUERZA: {pokemon.fuerza}</h2>
                <h2>DEFENSA: {pokemon.defensa}</h2>
            </div>
        </div>
    )
}

export default PokemonPres;