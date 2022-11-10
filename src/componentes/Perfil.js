
import {useState,useEffect} from 'react'

function Perfil() {
    const [entrenador,setEntrenador] = useState(JSON.parse(localStorage.getItem("entrenador")))
    return (
        <div>
            <h2>Esta es tu perfil y tu nombre es {entrenador.nombre}</h2>
            <h2>Esta es tu perfil y tu puntaje es {entrenador.puntuacion}</h2>            
        </div>
    );
}

export default Perfil;