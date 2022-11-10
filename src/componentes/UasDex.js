import  '../css/UasDesx.css' ;
import {useState,useEffect} from 'react'
import PokemonPres from './PokemonPres';

function UasDex() {
    
    const [copiaPokemones,setCopiaPokemones] = useState([])
    const [pokemones,setPokemones] = useState([])
    useEffect(()=>{
        fetch("http://localhost:3000/obtenerPokemones")
        .then(data => data.json())
        .then(pokemones =>{
            setPokemones(pokemones)
            setCopiaPokemones(pokemones)
        }) 
    },[])
    const buscarPokemon = (e) =>{
        
       setPokemones(copiaPokemones.filter(pokemon => pokemon.nombre.toLowerCase().startsWith(e.target.value.toLowerCase())))

    }
    return (
        <div className='Contenedor-principal'>
            <div className='repetir-logo'>
                <div className='Contenedor-Principal'>
                    <div className='Busqueda'>
                        <input onChange={buscarPokemon} type='text' placeholder='Buscar Pokemon' className='input'/>
                     
                    </div>
                    {
                        pokemones.map(pokemon =>(
                            <PokemonPres key={pokemon.pokemonID} pokemon={pokemon} />
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default UasDex;