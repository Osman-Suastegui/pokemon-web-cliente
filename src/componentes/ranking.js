import '../css/ranking.css';
import { obtenerRanking } from '../api/pokemon.api.js'
import { useEffect, useState } from 'react'

function Ranking() {
    const [ranking, setRanking] = useState([])
    useEffect(() => {
        const obtRanking = async () => {
            const response = await obtenerRanking()
            const ranking = await response.json()
            setRanking(ranking)    
        }
        obtRanking()
    }, [])

    return (
        <div className='Contenedor-principal'>
            <div className='Titulo-Ranking'>
                    <h1>Ranking</h1>
            </div>
            <div className='repetir-logo'>
                <div className='Tabla-Ranking'>
                    <table class="styled-table">
                            <thead> 
                                <tr> 
                                    <th>POSICION</th> 
                                    <th>NOMBRE</th> 
                                    <th>PTS</th> 
                                </tr> 
                            </thead> 
                            <tbody>
                                {ranking.map((usuario, index) => (
                                    <tr>
                                        <td>{index + 1} </td>
                                        <td>{usuario.nomusuario} </td>
                                        <td>{usuario.puntaje} </td>
                                    </tr>
                                    ))
                                }
                            </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Ranking; 