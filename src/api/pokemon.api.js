// API  https://api-pokemon-tnt.azurewebsites.net

// export const URL_API = "https://api-pokemon-tnt.azurewebsites.net"
export const URL_API = "http://localhost:3000"
export const obtenerHistorial = async (nombreUsuario) => {
  return await fetch(URL_API + "/obtenerHistorial" +"/"+nombreUsuario)
}

export const actualizarPuntaje = async(usuario,puntos,puntosActuales) =>{
  const mensaje = {usuario,puntos,puntosActuales}
  return await fetch(URL_API + "/actualizarPuntaje",{
    method: "PATCH",
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(mensaje)
  })
}
export const obtenerPuntaje = async (nombreUsuario) => {
  const response = await fetch(URL_API + "/obtenerPuntaje/" + nombreUsuario )
  const punt = await response.json()
  return punt
}
export const insertarHistorial = async (nombreUsuario,up1,up2,up3,nombreRival,rp1,rp2,rp3,resultCombate,fecha,tiempo) => {
  let historial = {"nombreUsuario":nombreUsuario,
                    "up1":up1,
                    "up2":up2,
                    "up3":up3,
                    "nombreRival":nombreRival,
                    "rp1" :rp1,
                    "rp2":rp2,
                    "rp3":rp3,
                    "resultCombate":resultCombate,
                    "fecha":fecha,
                    "tiempo":tiempo
                  }
  return await fetch(URL_API + "/insertarHistorial", {
    method: "POST",
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(historial)
  }) 

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