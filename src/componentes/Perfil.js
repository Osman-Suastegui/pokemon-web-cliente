
import {useState,useEffect} from 'react'
import {obtenerHistorial} from '../api/pokemon.api.js'
import Historial from './Historial.js'

function Perfil() {
    const [entrenador,setEntrenador] = useState(JSON.parse(localStorage.getItem("entrenador")))
    const [historial,setHistorial] = useState([])
    useEffect(()=>{
        const obtHistorial = async () =>{
            const response = await obtenerHistorial(entrenador.nombre)
            const historial = await response.json()
           setHistorial(historial)
        }
        obtHistorial()
    },[])
    return (
        <div>
            <h2>Esta es tu perfil y tu nombre es {entrenador.nombre}</h2>
            <h2>Esta es tu perfil y tu puntaje es {entrenador.puntuacion}</h2>
            {
                historial.length !== 0 ? <Historial historial={historial}/> :'cargando historial...'            
            }       
        </div>
    );
}

export default Perfil;