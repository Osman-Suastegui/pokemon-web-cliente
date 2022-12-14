import "../css/PlayerHUD.css";
import {obtenerVidaTotalPokemon} from '../api/pokemon.api.js'
import { useEffect, useState } from "react";
import { redirect } from "react-router-dom";

function InfoPoke( {miPoke,nombre} ) {
    return (
        <div className="contenedorInfo">
            <div className='InfoJugador'>
                <h3>{miPoke?.nombre}</h3>
                <h5>Fuerza: {miPoke?.fuerza}  </h5>
                <h5>Defensa: {miPoke?.defensa} </h5>
                <h5>Velocidad: {miPoke?.velocidad}</h5>
                <h4>PS: {miPoke?.vida }</h4> 
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