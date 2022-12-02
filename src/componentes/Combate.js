import '../css/Combate.css';
import InfoPoke from './PlayerHUD.js'; //CUADRO GRIS CON DATOS DE LOS JUGADORES
import MiEquipo from './MiEquipo.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {insertarHistorial,obtenerPuntaje,actualizarPuntaje} from '../api/pokemon.api.js'

function Combate({miHabilidad, setMiHabilidad,setContrincante, setPokemonContrincante, setJugador, pokemonContrincante, pokemonEnUsoJugador, jugador, contrincante, habilidadContrincante, setPokemonEnUsoJugador, setHabilidadContrincante,personaMasRapida,setpersonaMasRapida}) {
    
    
    const [btnBloqueado, setBtnBloqueado] = useState(false)
    const [btnHabilidadas,setBtnHabilidades] = useState(false)
    const [tiempoIniciado,setTiempoIniciado] = useState(new Date().getTime())
    const navigate = useNavigate()
   
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const elegirPokemon = (id) => {
        
        let pokeElegido = jugador.equipo.filter(poke => poke.pokemonID === id)[0]
        if(id === pokemonEnUsoJugador.pokemonID) return
        setBtnBloqueado(true)
        setPokemonEnUsoJugador(pokeElegido)
        setMiHabilidad({"habilidad":"cambiarPokemon","danio":0,"curar":0})
        setBtnHabilidades(false)
    }
    const verificarSiGanoContrincante = () => {
        let pokeDebilitados = 0
        jugador.equipo.map(pokemon => {
            if (pokemon.vida <= 0) pokeDebilitados++
        })

        return pokeDebilitados === jugador.equipo.length
    }
    const verificarSiGane = () => {
        let pokeDebilitados = 0
        contrincante.equipo.map(pokemon => {
            if (pokemon.vida <= 0) pokeDebilitados++
        })
        return pokeDebilitados === 3
    }
    const verificarGanador = () => {
        if (verificarSiGane()) {
            alert("El jugador " + jugador.nombre + " ha ganado  " )
            let fechaNueva = new Date().getTime()
            let t = Math.floor((fechaNueva-tiempoIniciado) / 1000) 
          
            let up1 = jugador.equipo[0].pokemonID
            let up2 = jugador.equipo[1].pokemonID
            let up3 = jugador.equipo[2].pokemonID

            let rp1 = contrincante.equipo[0].pokemonID
            let rp2 = contrincante.equipo[1].pokemonID
            let rp3 = contrincante.equipo[2].pokemonID
            
            let date = new Date()

            let day = date.getDate()
            let month = date.getMonth() + 1
            let year = date.getFullYear()
            let fecha = ""
            if(month < 10){
                fecha = `${year}-0${month}-${day}`
            
            }else{
                fecha = `${year}-${month}-${day}`
            }

            insertarHistorial(jugador.nombre,up1,up2,up3,contrincante.nombre,rp1,rp2,rp3,'1',fecha,t)
            obtenerPuntaje(jugador.nombre).then(res => {
                actualizarPuntaje(jugador.nombre,20,res[0].puntaje)
            })

            navigate("/menu-usuario")

        }else if (verificarSiGanoContrincante()) {
            alert("El jugador " + contrincante.nombre + " ha ganado")
            let fechaNueva = new Date().getTime()
            let t = Math.floor((fechaNueva-tiempoIniciado) / 1000) 

              
            let up1 = jugador.equipo[0].pokemonID
            let up2 = jugador.equipo[1].pokemonID
            let up3 = jugador.equipo[2].pokemonID

            let rp1 = contrincante.equipo[0].pokemonID
            let rp2 = contrincante.equipo[1].pokemonID
            let rp3 = contrincante.equipo[2].pokemonID
            
            let date = new Date()

            let day = date.getDate()
            let month = date.getMonth() + 1
            let year = date.getFullYear()
            let fecha = ""
            if(month < 10){
                fecha = `${year}-0${month}-${day}`
            
            }else{
                fecha = `${year}-${month}-${day}`
            }
            
            insertarHistorial(jugador.nombre,up1,up2,up3,contrincante.nombre,rp1,rp2,rp3,'0',fecha,t)

            navigate("/menu-usuario")
            obtenerPuntaje(jugador.nombre).then(res => {
                actualizarPuntaje(jugador.nombre,-20,res[0].puntaje)
            })
        }
    }

    const elegirAtacar = () => {
        // toast.success('Success Notification !', {
        //     position: toast.POSITION.TOP_RIGHT
        // });
        setBtnBloqueado(true)
        setMiHabilidad({"habilidad":'atacar',"danio":pokemonEnUsoJugador.fuerza,"curar":0})
    }
    const elegirCurarse = () => {
        setBtnBloqueado(true)
        const cantidadAcurarse = Math.floor(Math.random() * pokemonEnUsoJugador.defensa)
        setMiHabilidad({"habilidad":'curar',"danio":0,"curar":cantidadAcurarse})

    }
    const elegirAtacarImprobable = () => {
        setBtnBloqueado(true)
        let numRandom = Math.floor(Math.random() * 9)
        const numeros = [1,2,3,4,5,6,7,8]
        const esAcertado = numeros.includes(numRandom)
        let danioHecho =  Math.floor(pokemonEnUsoJugador.fuerza * 1.3)
        setMiHabilidad({"habilidad":'atacarImprobable',"danio":danioHecho,acerto:esAcertado})
    }
    const atacar = () => {
        
        setPokemonContrincante(poke => ({
            ...poke,
            vida: poke.vida - pokemonEnUsoJugador.fuerza
        }))
        return pokemonEnUsoJugador.fuerza
    }
    const atacarImprobable = () => {
            
            if(miHabilidad.acerto){
                toast.success("Tu ataque improbable acerto e hizo " + miHabilidad.danio,{
                    position: toast.POSITION.TOP_RIGHT
                })                
                setPokemonContrincante(poke => ({
                    ...poke,
                    vida: poke.vida - miHabilidad.danio
                }))
                return miHabilidad.danio
            }else{
                toast.info("Tu ataque improbable fallo",{
                    position: toast.POSITION.TOP_RIGHT
                }) 
            }
            return 0
        }
   
    const curar = (pokemoEnUso,setPokemon,entrenador) => {
        if(entrenador === 'usuario'){

            toast.success('El monstruo del ' + jugador.nombre + " se ha curado " + miHabilidad.curar,{
                position: toast.POSITION.TOP_RIGHT
            })
        }else{
            toast.success('El monstruo del ' + contrincante.nombre + " se ha curado " + habilidadContrincante.curar,{
                position: toast.POSITION.TOP_RIGHT
            })
        }
        setPokemon(poke => ({
            ...poke,
            vida :(poke.vida + (entrenador === 'usuario' ?  miHabilidad.curar : habilidadContrincante.curar)) > poke.vidaTotal ? poke.vidaTotal : poke.vida + (entrenador === 'usuario' ?  miHabilidad.curar : habilidadContrincante.curar)
        }))
    }

    const usuarioAtacaContrincanteAtaca = () => {
         // ataca usuario
         let danioRealizado = 0
         if (miHabilidad.habilidad ===  "atacar") danioRealizado =  atacar()
         if (miHabilidad.habilidad === "atacarImprobable") danioRealizado = atacarImprobable()
         if(miHabilidad.habilidad === "curar") curar(pokemonEnUsoJugador,setPokemonEnUsoJugador,'usuario')
         
         
         if (pokemonContrincante.vida - danioRealizado <= 0) {
             setBtnBloqueado(false)
             return
         }
         sleep(2000).then(() => {
             if (habilidadContrincante.habilidad === "atacar") {
                toast.error('El rival ' + contrincante.nombre + " te ha atacado", {
                    position: toast.POSITION.TOP_RIGHT
                });
            
                 setPokemonEnUsoJugador(poke => ({
                     ...poke,
                     vida: poke.vida - pokemonContrincante.fuerza
                 }))

                 
             }

             if (habilidadContrincante.habilidad === "atacarImprobable") {
                toast.info('Te lanzaron un ataque improbable ', {
                    position: toast.POSITION.TOP_RIGHT
                });
                if(habilidadContrincante.acerto) {
                    toast.warning('El rival ' + contrincante.nombre + " acerto su ataque, te hizo " + habilidadContrincante.danio + " de daño" , {
                        position: toast.POSITION.TOP_RIGHT
        
                    });
                }else{
                    toast.warning('El rival ' + contrincante.nombre + " faño su ataque" , {
                        position: toast.POSITION.TOP_RIGHT
                    });
                }

                 if (habilidadContrincante.acerto) {
                     setPokemonEnUsoJugador(poke => ({
                         ...poke,
                         vida: poke.vida - habilidadContrincante.danio
                     }))
                 }
             }
             if(habilidadContrincante.habilidad === "curar") curar(pokemonContrincante,setPokemonContrincante,'contrincante')
                
             

             setBtnBloqueado(false)

         })
        
    }

    const contrincanteAtacaUsuarioAtaca = () => {
        let danioRealizado = 0
        sleep(2000).then(() => {
            if (habilidadContrincante.habilidad === "atacar") {
                toast.error('El rival ' + contrincante.nombre + " te ha atacado", {
                    position: toast.POSITION.TOP_RIGHT
                });
                setPokemonEnUsoJugador(poke => ({
                    ...poke,
                    vida: poke.vida - pokemonContrincante.fuerza
                }))
                danioRealizado = habilidadContrincante.danio
                
            }

            if (habilidadContrincante.habilidad === "atacarImprobable") {

                toast.info('Te lanzaron un ataque improbable ', {
                    position: toast.POSITION.TOP_RIGHT
                });
                if(habilidadContrincante.acerto) {
                    toast.warning('El rival ' + contrincante.nombre + " acerto su ataque, te hizo " + habilidadContrincante.danio + " de daño" , {
                        position: toast.POSITION.TOP_RIGHT
        
                    });
                }else{
                    toast.warning('El rival ' + contrincante.nombre + " faño su ataque" , {
                        position: toast.POSITION.TOP_RIGHT
                    });
                }

                if (habilidadContrincante.acerto) {
                    setPokemonEnUsoJugador(poke => ({
                        ...poke,
                        vida: poke.vida - habilidadContrincante.danio
                    }))
                    danioRealizado = habilidadContrincante.danio

                }
            }
            if(habilidadContrincante.habilidad === "curar") curar(pokemonContrincante,setPokemonContrincante,'contrincante')

            sleep(1000).then(() => {

                if(pokemonEnUsoJugador.vida - danioRealizado <= 0){
                    setBtnBloqueado(false)
                    return  
                }
                if (miHabilidad.habilidad === "atacar") atacar()
                if (miHabilidad.habilidad ===  "atacarImprobable") atacarImprobable()
                if(miHabilidad.habilidad === "curar") curar(pokemonEnUsoJugador,setPokemonEnUsoJugador,'usuario')
                
                setBtnBloqueado(false)
            })

        })
    }
    const lanzarAtaques = () => {  
        setBtnBloqueado(true)
        
        if (pokemonEnUsoJugador.velocidad > pokemonContrincante.velocidad) {
            usuarioAtacaContrincanteAtaca()
               
        } 
        if (pokemonContrincante.velocidad > pokemonEnUsoJugador.velocidad) {
           contrincanteAtacaUsuarioAtaca()
        }
        
    }

    useEffect(() => {
        if (miHabilidad != null && habilidadContrincante != null && pokemonEnUsoJugador.tipo !== pokemonContrincante.tipo ) {
           
            lanzarAtaques()
            setMiHabilidad(null)
            setHabilidadContrincante(null)
        }

        if(personaMasRapida != null && miHabilidad != null && habilidadContrincante != null){
            if(personaMasRapida === jugador.nombre){
                usuarioAtacaContrincanteAtaca()
            }else{
                contrincanteAtacaUsuarioAtaca()
            }
            setpersonaMasRapida(null)
            setMiHabilidad(null)
            setHabilidadContrincante(null)
        }

    }, [miHabilidad, habilidadContrincante,personaMasRapida])

    useEffect(()=>{
       

    },[personaMasRapida,miHabilidad,habilidadContrincante])
    useEffect(()=>{
        verificarGanador()
    },[contrincante,jugador])
    useEffect(() => {
        setJugador(jugador => ({
            ...jugador,
            equipo: jugador.equipo.map(poke => {
                if (pokemonEnUsoJugador.pokemonID == poke.pokemonID) {
                    poke.vida = pokemonEnUsoJugador.vida
                }
                return poke

            })
        }))

        if (pokemonEnUsoJugador.vida <= 0) {
            alert("El pokemon " + pokemonEnUsoJugador.nombre + " ha sido debilitado, cambia de pokemon ")
            setBtnHabilidades(true)
            setBtnBloqueado(false)
        }
    }
    , [pokemonEnUsoJugador?.vida])




    useEffect(() => {
        setContrincante(jugador => ({
            ...jugador,
            equipo: jugador.equipo.map(poke => {
                if (pokemonContrincante.pokemonID == poke.pokemonID) {
                    poke.vida = pokemonContrincante.vida
                }
                return poke

            })
        }))

    }
    , [pokemonContrincante?.vida])

    return (
            <div className='Contenedor-Combate'>
                {/* falta crear un arreglo de links de backgrounds y que se escojan random en cada batalla */}
                <div className='Contenedor-Combate-Info'>

                    <section className='poke2'>
                        <InfoPoke miPoke={pokemonEnUsoJugador} className="Usuario" nombre="usuario" />
                    </section>
                    <section className='poke1'>
                        <InfoPoke miPoke={pokemonContrincante} className="Contrincante" nombre="contrincante" />
                    </section>
                  
                    
                    <div className='Pokemons'>
                        <MiEquipo equipos={contrincante.equipo} jugador={contrincante.nombre}  />
                        <MiEquipo equipos={jugador.equipo} jugador={jugador.nombre}   />
                        <div className="cambiar-poke">
                            {jugador.equipo.map(poke => (
                            <button onClick={() => elegirPokemon(poke.pokemonID)} disabled={poke.vida <= 0 ? true : false || btnBloqueado} className='Boton-Pokemon'>{poke.nombre}</button>
                            ))}
                        </div>
                        
                    </div>
                   
                </div>
                <div className='Habilidades'>

                    <button  disabled={btnBloqueado ||  btnHabilidadas } name='atacar' onClick={elegirAtacar} className='Boton-Habilidad' alt="Ataque simple 100& accuracy"></button>
                    <button disabled={btnBloqueado || btnHabilidadas } name="atacarImprobable" onClick={elegirAtacarImprobable} className='Boton-Habilidad'></button>
                    <button onClick={elegirCurarse} disabled={btnBloqueado || btnHabilidadas } name='curar' className='Boton-Habilidad'></button>
                </div>
                <ToastContainer />
            </div>
    );
}

export default Combate; 