
import {useState,useEffect} from 'react'

function Historial({historial}) {
   console.log(historial)
    return (
        <div>

            {
                historial.map(h => (
                    <>
                        <h2>{h.usuario}</h2>
                        <h2>{h.rival}</h2>
                    </>
                )) 
            }  
        </div>
    );
}

export default Historial;