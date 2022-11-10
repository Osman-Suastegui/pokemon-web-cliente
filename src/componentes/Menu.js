import react from 'react';
import "../css/Menu.css"
import { useNavigate, Link } from 'react-router-dom'

function Menu() {
    const navigate = useNavigate()
    const cerrarSesion = (e) => {
        e.preventDefault()
        localStorage.removeItem("loggedIn")
        localStorage.removeItem("nombreUsuario")
        localStorage.removeItem("entrenador")
        navigate("/")
    }
    
    return (
        <div className="Contenedor-Menu">
            <div className="Bienvenida">
                <p>MENU</p>
                <br></br>
                <p> Bienvenido {localStorage.getItem("nombreUsuario")}</p>
            </div>
            <div className="Logo-repetido">
                <div className="Contenedor-Botones">
                    <Link to="/saladecola" className="Boton-Menu">Entrar en cola</Link>
                    <Link to="/CombatirContraBot" className="Boton-Menu">Combatir contra bot</Link>
                    <Link to="/ranking" className="Boton-Menu">Ver Ranking</Link>
                    <Link to="/crear-equipo" className="Boton-Menu">Crear Equipo</Link>
                    <Link to="/perfil" className="Boton-Menu">Ver Perfil</Link>
                    <button onClick={cerrarSesion} className="Boton-Menu">Cerrar Sesion</button>
                    <Link to="/uasdex" className="Boton-Menu">UasDex</Link>
                </div>
            </div>
        </div>
    );
}

export default Menu;