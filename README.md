ConsultarCryptos
🔧 Módulos usados

Se han usado estos módulos:

Yargs → para crear la interfaz de línea de comando.

Chalk → para colorear y dar formato al texto en la consola.

Axios → para hacer peticiones HTTP a APIs.

Node.js → es el entorno propio de ejecución.

 1. Yargs

Permite que el programa entienda los comandos como:

crytowatch precio bitcoin usd


Yargs convierte eso en un objeto JavaScript como:

{
  _: ['precio'],
  moneda: 'bitcoin',
  vs: 'usd'
}

 2. Chalk

Colorea el texto en la terminal.
Ejemplo:

chalk.green.bold('💰 Precio encontrado:')


Esto permite mostrar resultados en la consola con colores y estilos (por ejemplo, verde y en negrita).

 3. Axios

Hace peticiones HTTP fácilmente, como esta:

await axios.get('https://api.coingecko.com/api/v3/simple/price', {
  params: { ids: 'bitcoin', vs_currencies: 'eur' }
});


Axios facilita la conexión con APIs externas, en este caso CoinGecko, para obtener el precio actual de una criptomoneda.

4. Node.js

Permite que el programa se ejecute desde la terminal.
Algunos aspectos importantes:

#!/usr/bin/env node → hace que el archivo sea ejecutable.

process.argv → contiene los argumentos del comando.

import/export → modulariza el código entre archivos (index.js y api.js).

 Estructura del proyecto
crytowatch/
├── index.js     → CLI principal
│   ├─ yargs  → define comandos
│   ├─ chalk  → colorea salida
│   └─ llama a getPrice()
└── src/api.js   → lógica de conexión a la API
    └─ axios  → consulta CoinGecko



# 1) Clona el repo
git clone https://github.com/GerardoCL31/ConsultarCryptos
cd ConsultarCryptos

# 2) Instala dependencias
npm install

# 3) (opcional) hacer ejecutable en Unix:
chmod +x index.js

# 4) Crea el comando `crytowatch` en tu máquina:
npm link        # (lo desinstalas con npm unlink -g crytowatch)
# o ejecuta sin link: node index.js precio bitcoin usd

# 5) Prueba:
crytowatch precio bitcoin usd
crytowatch precio eth           # usa EUR por defecto
