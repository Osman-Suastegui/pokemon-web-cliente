

import '../css/HistorialPartida.css'
function HistorialPartida({historial}) {
    
    return (
        <section className='historial-partida'>

            {
                historial.map(h => (
                    <>
                    <section className='historial-partida-info'>
                        <h5>
                        {"Resultado: " +( h.resulCombate === '1' ? 'Victoria' : 'Derrota') }
                        </h5>
                        <h5>

                        {"    Fecha de la partida: "+ h.fecha.substring(0,10)}
                        </h5>
                        <h5>

                        {"      Tiempo de duracion: " +h.tiempo + " segundos"}
                        </h5>

                    </section>
                    <section className='historial-partida-usuario'>
                        <h2>{h.usuario}</h2>
                        <img src={h.usuarioImgPoke1} alt="" />
                        <img src={h.usuarioImgPoke2} alt="" />
                        <img src={h.usuarioImgPoke3} alt="" />

                    </section>
                    <section className='historial-partida-contrincante'>
                        <h2>{h.rival}</h2>
                        <img src={h.rivalImgPoke1} alt="" />
                        <img src={h.rivalImgPoke2} alt="" />
                        <img src={h.rivalImgPoke3} alt="" />
                        
                    </section>
                        
                    </>
                )) 
            }  
        </section>
    );
}

export default HistorialPartida;