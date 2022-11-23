
import { useState, useEffect } from 'react'
import { obtenerHistorial } from '../api/pokemon.api.js'
import HistorialPartida from './HistorialPartida.js'

function Perfil() {
    const [entrenador, setEntrenador] = useState(JSON.parse(localStorage.getItem("entrenador")))
    const [historial, setHistorial] = useState([])
    useEffect(() => {
        const obtHistorial = async () => {
            const response = await obtenerHistorial(entrenador.nombre)
            const historial = await response.json()
            setHistorial(historial)
        }
        obtHistorial()
    }, [])
    return (
        <div className='perfil'>
            <section className='datos-perfil'>
                <h2>Esta es tu perfil y tu nombre es {entrenador.nombre}</h2>
                <h2>Esta es tu perfil y tu puntaje es {entrenador.puntuacion}</h2>

            </section>
            <section className='historial'>
                {
                    historial.length !== 0 ? <HistorialPartida historial={historial} /> : 'cargando historial...'
                }
            </section>
        </div>
    );
}

export default Perfil;