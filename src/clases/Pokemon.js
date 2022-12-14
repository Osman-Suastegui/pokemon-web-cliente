class Pokemon{
    
    constructor(id,nombre, tipo, vida, fuerza, velocidad, defensa,img_frente,img_espaldas){
        this.pokemonID = id 
        this.nombre = nombre;
        this.tipo = tipo;
        this.vida = vida;
        this.fuerza = fuerza;
        this.velocidad = velocidad;
        this.defensa = defensa;
        this.img_frente = img_frente
        this.img_espaldas = img_espaldas
        this.vidaTotal = vida 
    }

    show(){
        console.log(`Name: ${this.nombre}, Type: ${this.tipo}, Vida: ${this.vida}, Ataque: ${this.fuerza}`);
    }
    getAtaque(){
        return this.fuerza
    }
    atacar(pokemon){
        pokemon.vida -= this.fuerza;
    }

    atacarEspecial(pokemon){
        pokemon.vida -= this.fuerza * 2;
    }

    getVida(){
        return this.vida;
    }

    setVida(vida){
        this.vida = vida;
    }

    Defender(){
        return "Bloqueado";
    }


    build() {
    return {
      vida: this.vida,
      nombre: this.nombre,
      fuerza: this.fuerza,
      velocidad: this.velocidad,
      defensa: this.defensa,
      img_frente:this.img_frente,
      img_espaldas:this.img_espaldas
        };
    }
}
export default Pokemon;
