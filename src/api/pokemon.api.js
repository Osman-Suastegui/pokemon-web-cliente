

export const obtenerEquipo = async (nombreUsuario) =>{
    return await fetch("http://localhost:3000/obtenerEquipo", {
        method: "POST",
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "usuario": nombreUsuario })
      }) 
}

export const iniciarSesion = async (LOGIN) => {
    return await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(LOGIN)
      })
}
export const obtenerRanking = async () =>{
     return await fetch("http://localhost:3000/obtenerRanking")
}