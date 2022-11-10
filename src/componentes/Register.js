import React from "react";
import "../css/Register.css";

import { useState } from 'react'

function Register() {
    const [usuario, setUsuario] = useState("");
    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [confirmarContrasena, setConfirmarContrasena] = useState("");

    const handleUsuario = (e) => {
        setUsuario(e.target.value);
    };

    const handleCorreo = (e) => {
        setCorreo(e.target.value);
    };

    const handleContrasena = (e) => {
        setContrasena(e.target.value);
    };

    const handleConfirmarContrasena = (e) => {
        setConfirmarContrasena(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(contrasena != confirmarContrasena){
            alert("Las Contraseñas no coinciden.")
            return;
        }
        
        const Registro = {
            nomUsuario: usuario,
            email: correo,
            contra: contrasena,
        };

         fetch('http://localhost:3000/registrarse', {
            method: 'POST',
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(Registro)
          }).then(res => res.json())
            .then(res => {
                alert(res.mensaje)
            }); 

    };

    return (
        <div className="contenedor-register">
            <div className="logo-repetido">
                <div className="contenedor-formulario">
                    <form className="formulario" onSubmit={handleSubmit}>
                        <h1 className="titulo-formulario">Registrarse</h1>
                        <div className="contenedor-input">
                            <input className="input" type="text" placeholder="Nombre de usuario" onChange={handleUsuario}/>
                        </div>
                        <div className="contenedor-input">
                            <input className="input" type="text" placeholder="Correo electronico" onChange={handleCorreo}/>
                        </div>
                        <div className="contenedor-input">
                            <input className="input" type="password" placeholder="Contraseña" onChange={handleContrasena}/>
                        </div>
                        <div className="contenedor-input">
                            <input className="input" type="password" placeholder="Confirmar contraseña" onChange={handleConfirmarContrasena}/>
                        </div>
                        <button className="boton-Registrar" type="submit">Registrarse</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;