class Entrenador{

    constructor(nombre, equipo,puntuacion){
        this.nombre = nombre;
        this.equipo = equipo;
        this.puntuacion = puntuacion;
    } 

    setEquipo(equipo){
        this.equipo = equipo;
    }
    
    getNombre(){
        return this.nombre
    }
    
    setNombre(nombre){
        this.nombre = nombre
    }

    getEquipo(){
        return this.equipo;
    }

    getPuntuacion(){ //MOSTRAR EN EL RANKING
        return this.puntuacion;
    }

    setPuntuacion(puntuacion){
        this.puntuacion = puntuacion;
    }

}

export default Entrenador;