import React from "react";
import "../css/Home.css";
import volumen from '../img/volumen.png';
import { useEffect, useState } from 'react';
import musicaFondo from '../sfx/MusicaFondo.mp3';
import {
    Link,
} from "react-router-dom";

function Home() {

    //reproducir musicaFondo al iniciar la pagina
    const [play, setPlay] = useState(true);
    const [audio] = useState(new Audio(musicaFondo));
    audio.loop = true;
    if(audio.played){
        audio.pause();
    }

    return (
        <div className="contenedor-home">
            <div className="contenedor-titulo">
                <h1 className="titulo"> UASMONS</h1>
            </div>
            <div className="contenedor-menu">
                <div className="contenedor-menu-login">
                    <div className="contenedor-botones">
                        <button className="boton-volumen" onClick={() => setPlay(!play)}>
                            <img className="icono-volumen" src={volumen} width='60' height='60' />
                        </button>
                        <Link to="/login" className="boton-menu-login" > Iniciar Sesion</Link>
                        <Link to="/registrar" className="boton-menu-login" > Registrarse</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;