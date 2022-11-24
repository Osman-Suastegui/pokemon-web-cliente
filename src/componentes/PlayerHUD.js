import "../css/PlayerHUD.css";
import {obtenerVidaTotalPokemon} from '../api/pokemon.api.js'
import { useEffect, useState } from "react";
import { redirect } from "react-router-dom";

function InfoPoke( {miPoke,nombre} ) {
    console.log(miPoke)
   
    return (
        <div className="contenedorInfo">
            <div className='InfoJugador'>
                <h1>{miPoke?.nombre}</h1>
                <h3>PS: {miPoke?.vida }</h3> 
                <div className="BordeVida"><div className="BarraVida" style={{width: `${miPoke?.vida / miPoke?.vidaTotal * 100}%`}}></div> </div>   
            </div>
            <div className='img'>
                <img src={nombre  === 'usuario' ?miPoke?.img_espaldas: miPoke?.img_frente} />
            </div>
            <div className="Plataforma"></div>
        </div>
    )
}

export default InfoPoke;