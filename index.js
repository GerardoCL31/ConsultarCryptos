#!/usr/bin/env node 
//permite ejecutar este archivo directamente como un script de Node.js


import yargs from 'yargs'; //importa la librería yargs, que sirve para construir el CLI y parsear argumentos.
import { hideBin } from 'yargs/helpers';//Importa hideBin, helper que elimina los dos primeros argumentos de process.argv 
// (el ejecutable y la ruta del script) para pasárselos a yargs correctamente.
import { getPrice } from './src/api.js';//Importa la función getPrice (tu API propia) que consulta el precio de una cripto.
import chalk from 'chalk';//Importa chalk, librería para colorear y estilizar el texto en la terminal.

// Configuración de yargs
yargs(hideBin(process.argv))//Crea la instancia de yargs pasando los argumentos de la CLI ya “limpios” con hideBin.
  .scriptName('crytowatch') //Establece el nombre del programa que se mostrará en la ayuda/uso.
  .usage('$0 <comando> [opciones]')//Define el texto de uso que verá el usuario al pedir ayuda.
  .command(//Comienza la definición de un comando nuevo.
    'precio <moneda> [vs]', //Nombre del comando y su sintaxis: precio con un argumento posicional obligatorio <moneda> y otro opcional [vs]
    'Muestra el precio actual de una criptomoneda',//Descripción del comando que aparecerá en la ayuda.
    (y) => { //Función builder: recibe un objeto y (la instancia de yargs para este comando) para configurar argumentos.
      y.positional('moneda', { //Declara el argumento posicional moneda.
        describe: 'Criptomoneda que quieres consultar',//Descripción de moneda.
        type: 'string'//Tipo de dato de moneda: string.
      })
      .positional('vs', { //Declara el argumento posicional opcional vs.
        describe: 'Moneda contra la que comparar (por defecto eur)', //describe: 'Moneda contra la que comparar (por defecto eur)',
        type: 'string', //Tipo de dato de vs: string.
        default: 'eur' //Valor por defecto de vs: 'eur'.
      });
    },
    async (args) => {
     try{
        const precio = await getPrice(args.moneda, args.vs);//Función handler: lo que se ejecuta cuando el usuario corre precio .... Es async porque usa await.
        console.log(//Empieza a imprimir el resultado por consola.
          chalk.green.bold('💰 Precio encontrado: ') +//chalk.green.bold('💰 Precio encontrado: ') +
          chalk.yellow(`${args.moneda.toUpperCase()}`) +//chalk.yellow(${args.moneda.toUpperCase()}) +
          chalk.white(' vale ') +//Texto “ vale ” en blanco.
          chalk.cyan(`${precio} ${args.vs.toUpperCase()}`)//El precio y la moneda comparativa en cian; vs también en mayúsculas.
        );
      } catch (err) {//
        console.error(chalk.red.bold(`❌ Error: ${err.message}`));//Si algo falla en el try, se captura aquí.
     }
    }
  )
  .help()//Cierra la definición de .command(...).
  .alias('h', 'help')//Añade el comando/opción --help para mostrar ayuda.
  .strict()//Activa “modo estricto”: argumentos o comandos desconocidos producirán error (evita typos silenciosos).
  .parse();//Ejecuta el parser de yargs y lanza el flujo (muestra ayuda o ejecuta el handler según los args).
