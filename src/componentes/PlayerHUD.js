import "../css/PlayerHUD.css";

function InfoPoke( {miPoke,danio} ) {
    return (
        <div>
            <div className='InfoJugador'>
                <h1>{miPoke?.nombre}</h1>
                <h3>{miPoke?.vida }</h3> 
                <div className="BarraVida" style={{width: `${miPoke?.vida}%`}}></div>              
            </div>
            <div className='img'>
                <img src={miPoke?.img_frente} />
            </div>
        </div>
    )
}

export default InfoPoke;