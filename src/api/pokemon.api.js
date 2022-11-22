// API  https://api-pokemon-tnt.azurewebsites.net
export const URL_API = "http://localhost:3000"

export const obtenerHistorial = async (nombreUsuario) => {
  return await fetch(URL_API + "/obtenerHistorial" +"/"+nombreUsuario)
}
export const obtenerVidaTotalPokemon = async (pokemonID) => {
  const response = await fetch(URL_API + "/obtenerVidaTotalPokemon" +"/"+pokemonID)
  const vida = await response.json()
  return vida
}
export const obtenerEquipo = async (nombreUsuario) =>{
    return await fetch(URL_API + "/obtenerEquipo", {
        method: "POST",
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "usuario": nombreUsuario })
      }) 
}

export const iniciarSesion = async (LOGIN) => {
    return await fetch(URL_API + '/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(LOGIN)
      })
}
export const obtenerRanking = async () =>{
     return await fetch( URL_API + "/obtenerRanking")
}