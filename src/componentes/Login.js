import React from "react";
import "../css/Login.css";
import { useNavigate } from 'react-router-dom'
import Entrenador from "../clases/Entrenador";
import Pokemon from "../clases/Pokemon";
import { useState } from "react";
import { obtenerEquipo, iniciarSesion } from '../api/pokemon.api.js'
function Login() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");


  const asignarEquipo = async () => {
    let nombre = localStorage.getItem("nombreUsuario")
    const response = await obtenerEquipo(nombre)
    let pokemones = await response.json()    
    let equipoEntrenador = []
    pokemones.map(pokemon => {
      equipoEntrenador.push(new Pokemon(
        pokemon.nombre,
        pokemon.tipo,
        pokemon.vida,
        pokemon.fuerza,
        pokemon.velocidad,
        pokemon.defensa,
        pokemon.img_frente,
        pokemon.img_espaldas
      ))
    })

    let entrenadorUsuario = new Entrenador(nombre, equipoEntrenador, 100,);
    localStorage.setItem("entrenador", JSON.stringify(entrenadorUsuario))
    
  }
  const handleUsuario = (e) =>  setUsuario(e.target.value);
  const handleContrasena = (e) => setContrasena(e.target.value);
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const Login = {
      nomusuario: usuario,
      contra: contrasena,
    };
    const response = await iniciarSesion(Login)
    const user = await response.json()

    if (user.loggedIn) {
      localStorage.setItem("nombreUsuario", user.usuario)
      localStorage.setItem("loggedIn", "true")
      asignarEquipo()
      navigate("/menu-usuario")
    } else {
      alert("Usuario o contra invalidas")
    }

};

return (
  <div className="contenedor-login">
    <div className="logo-repetido">
      <div className="contenedor-formulario">
        <h1 className="Titulo"><p>Inicio</p> <p>de</p> <p>sesion</p></h1>
        <form className="formulario-login" onSubmit={handleSubmit}>
          <input className="input-login" type="text" placeholder="Usuario" onChange={handleUsuario} />
          <input className="input-login" type="password" placeholder="Contraseña" onChange={handleContrasena} />
          <button className="boton-login" type="submit">
            INICIAR SESION
          </button>
        </form>
      </div>
    </div>
  </div>

);
}

export default Login;