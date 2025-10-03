#!/usr/bin/env node
// index.js
// ===============================
// Punto de entrada del CLI
// Aquí definiremos los comandos usando yargs

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { getPrice } from './src/api.js';
import chalk from 'chalk';

// Configuración de yargs
yargs(hideBin(process.argv))
  .scriptName('crytowatch') 
  .usage('$0 <comando> [opciones]')
  .command(
    'precio <moneda> [vs]',
    'Muestra el precio actual de una criptomoneda',
    (y) => {
      y.positional('moneda', {
        describe: 'Criptomoneda que quieres consultar',
        type: 'string'
      })
      .positional('vs', {
        describe: 'Moneda contra la que comparar (por defecto eur)',
        type: 'string',
        default: 'eur'
      });
    },
    async (args) => {
     try{
        const precio = await getPrice(args.moneda, args.vs);
        console.log(
          chalk.green.bold('💰 Precio encontrado: ') +
          chalk.yellow(`${args.moneda.toUpperCase()}`) +
          chalk.white(' vale ') +
          chalk.cyan(`${precio} ${args.vs.toUpperCase()}`)
        );
      } catch (err) {
        console.error(chalk.red.bold(`❌ Error: ${err.message}`));
     }
    }
  )
  .help()
  .alias('h', 'help')
  .strict()
  .parse();
