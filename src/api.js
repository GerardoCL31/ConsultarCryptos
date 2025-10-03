import axios from 'axios'
const BASE_URL = 'https://api.coingecko.com/api/v3';

/**
 * Consulta el precio de una cripto frente a otra
 * @param {string} moneda - criptomoneda (ej: 'bitcoin')
 * @param {string} vs - moneda comparativa (ej: 'eur', 'usd')
 * @returns {number} precio actual
 */
export async function getPrice(moneda, vs = 'eur') {
  try {
    // Hacemos la petición GET a la API pública de CoinGecko
    const response = await axios.get(`${BASE_URL}/simple/price`, {
      params: {
        ids: moneda,
        vs_currencies: vs
      }
    });

    // Extraemos el precio de la respuesta
    const precio = response.data[moneda]?.[vs];

    if (!precio) {
      throw new Error(`No encontré precio para ${moneda} en ${vs}`);
    }

    return precio;
  } catch (error) {
    throw new Error(`Error al consultar CoinGecko: ${error.message}`);
  }
}