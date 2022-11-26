
import { useState, useEffect } from 'react'
import { obtenerHistorial,obtenerPuntaje } from '../api/pokemon.api.js'
import HistorialPartida from './HistorialPartida.js'
import "../css/Perfil.css"

function Perfil() {
    const [entrenador, setEntrenador] = useState(JSON.parse(localStorage.getItem("entrenador")))
    const [puntaje,setPuntaje] = useState()
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
        obtenerPuntaje(entrenador.nombre).then(res => {
            setPuntaje(res[0].puntaje)
        })
        obtHistorial()
    }, [])
    return (
        <div className='perfil'>
            <section className='datos-perfil'>
                <h1>{entrenador.nombre}</h1>
                <h4>puntaje: {puntaje} </h4>
                <div>
                    <h4>Total de partidas jugadas: {cantidaDerrotas + cantidadVictorias}</h4>
                    <h4>Cantidad de victorias {cantidadVictorias}</h4>
                    <h4>Porcentaje de Victorias: {Math.floor(cantidadVictorias /(cantidaDerrotas + cantidadVictorias) *100)} %</h4>
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