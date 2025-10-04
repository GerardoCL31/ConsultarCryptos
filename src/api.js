import axios from 'axios' //Importa la librería axios, que sirve para hacer peticiones HTTP (en este caso, a una API pública).
//Es como fetch, pero con más opciones y sintaxis más limpia.
const BASE_URL = 'https://api.coingecko.com/api/v3';//Define una constante con la URL base de la API de CoinGecko.
//Así, si necesitas cambiarla en el futuro, solo cambias esta línea.


export async function getPrice(moneda, vs = 'eur') {//Declara y exporta una función asíncrona llamada getPrice, para poder usarla desde otros archivos
  try {
    // Hacemos la petición GET a la API pública de CoinGecko
    const response = await axios.get(`${BASE_URL}/simple/price`, {
      params: {
        ids: moneda,
        vs_currencies: vs
      }
    });

    
    const precio = response.data[moneda]?.[vs];// Extraemos el precio de la respuesta

    if (!precio) {
      throw new Error(`No encontré precio para ${moneda} en ${vs}`); //Si precio no existe (porque CoinGecko no devolvió nada), lanza un error con un mensaje claro.
//Esto hace que el flujo pase directamente al catch.
    }

    return precio;
  } catch (error) { //Devuelve el precio encontrado.
    throw new Error(`Error al consultar CoinGecko: ${error.message}`); //Si ocurre cualquier error (problemas de conexión, error 404, etc.), 
    // captura la excepción y lanza otra más legible, agregando contexto.
  }
}