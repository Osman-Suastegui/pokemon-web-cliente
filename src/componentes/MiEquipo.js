import react from 'react';
import "../css/MiEquipo.css";   


function MiEquipo({equipos, jugador}) {
    


    return (
        <div className="Contenedor-Equipo" >
            <h4>{jugador}</h4>
           {equipos.map((poke) => (
                  <img  key={poke.pokemonID} src={poke.img_frente} /> 
           ))}
        </div>
    )
}

export default MiEquipo;