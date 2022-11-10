import react from 'react';
import "../css/MiEquipo.css";   


function MiEquipo({equipos}) {


    return (
        <div className="Contenedor-Equipo" >
           {equipos.map((poke) => (
                  <img  key={poke.pokemonID} src={poke.img_frente} /> 
           ))}
        </div>
    )
}

export default MiEquipo;