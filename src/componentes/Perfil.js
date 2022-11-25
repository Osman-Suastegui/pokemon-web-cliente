
import { useState, useEffect } from 'react'
import { obtenerHistorial } from '../api/pokemon.api.js'
import HistorialPartida from './HistorialPartida.js'
import "../css/Perfil.css"

function Perfil() {
    const [entrenador, setEntrenador] = useState(JSON.parse(localStorage.getItem("entrenador")))
    const [historial, setHistorial] = useState([])
    const [cantidadVictorias,setCantidadVictorias] = useState(0)
    const [cantidaDerrotas,setCantidadDerrotas] = useState(0)
    useEffect(() => {
        const obtHistorial = async () => {
            const response = await obtenerHistorial(entrenador.nombre)
            const historial = await response.json()
            setHistorial(historial)
            let victorias = 0
            let derrotas = 0
            historial.forEach(h => {
                if(h.resulCombate === '1')victorias++;
                else derrotas++;
            })
            setCantidadDerrotas(derrotas)
            setCantidadVictorias(victorias)
        }
        obtHistorial()
    }, [])
    return (
        <div className='perfil'>
            <section className='datos-perfil'>
                <h1>{entrenador.nombre}</h1>
                <h4>{entrenador.puntuacion} ₧</h4>
                <div>
                    <h4>Total de partidas jugadas: {cantidaDerrotas + cantidadVictorias}</h4>
                    <h4>Cantidad de victorias {cantidadVictorias}</h4>
                    <h4>Porcentaje de Victorias: {(cantidaDerrotas + cantidadVictorias)/cantidadVictorias *100} %</h4>
                    <h4>Cantidad de derrotas {cantidaDerrotas}</h4>
                </div>
            </section>
            <section className='historial'>
                {
                    historial.length !== 0 ? <HistorialPartida historial={historial}   /> : 'cargando historial...'
                }
            </section>
        </div>
    );
}

export default Perfil;