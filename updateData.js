import inquirer from 'inquirer';
import chalk from 'chalk';
import fs from 'fs';
import queryDB from './queryDB.js';
import dbFileCheck from './dbFileCheck.js';

export default async function updateData(info) {
  dbFileCheck();

  try {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'recordID',
        message: chalk.blue.bold('Ingresa Registro ID:'),
      },
    ]);

    let current;

    info.forEach((element) => {
      if (element.id === answers.recordID) {
        current = element;

        updateDetails(current, info);
      }
    });
  } catch (error) {
    console.log(chalk.white.bgRed('Algo salió mal!', error));
  }
}

async function updateDetails(current, info) {
  try {
    const feedbacks = await inquirer.prompt([
      {
        type: 'number',
        default: current.wi,
        name: 'wi',
        message: chalk.blue.bold('Ingresa el WI:'),
      },
      {
        type: 'input',
        default: current.iprPet,
        name: 'iprPet',
        message: chalk.blue.bold('Ingresa la PET/IPR:'),
      },
      {
        type: 'input',
        default: current.description,
        name: 'description',
        message: chalk.blue.bold('Ingresa la descripción:'),
      },
      {
        type: 'list',
        default: current.tdp,
        name: 'tdp',
        message: chalk.blue.bold('Ingresa Coord. TDP:'),
        choices: [
          { name: 'Omar Loayza Becerra', value: 'Omar Loayza Becerra' },
          { name: 'Julio Carmen Rodriguez', value: 'Julio Carmen Rodriguez' },
          { name: 'Marco Espinoza Valencia', value: 'Marco Espinoza Valencia' },
          { name: 'Fiorella Florencio', value: 'Fiorella Florencio Inga' },
          { name: 'Saul Salhuana Machuca', value: 'Saul Salhuana Machuca' },
        ],
      },
      {
        type: 'input',
        default: current.fechaPaP,
        name: 'fechaPaP',
        message: chalk.blue.bold('Ingresa fecha de pase:'),
      },
      {
        type: 'input',
        default: current.horaPaPi,
        name: 'horaPaPi',
        message: chalk.blue.bold('Ingresa hora inicio:'),
      },
      {
        type: 'input',
        default: current.horaPaPf,
        name: 'horaPaPf',
        message: chalk.blue.bold('Ingresa hora fin:'),
      },
      {
        type: 'list',
        default: current.despliegue,
        name: 'despliegue',
        message: chalk.blue.bold('Desplegado por:'),
        choices: [
          { name: 'NTTDATA', value: 'NTTDATA' },
          { name: 'TDP', value: 'TDP' },
        ],
      },
      {
        type: 'input',
        default: current.sistema,
        name: 'sistema',
        message: chalk.blue.bold('Ingrese el Sistema:'),
      },
      {
        type: 'list',
        default: current.niubiz,
        name: 'niubiz',
        message: chalk.blue.bold('Ingresa Coord. Niubiz:'),
        choices: [
          { name: 'Cesar Curitomay', value: 'Cesar Curitomay' },
          { name: 'Brando Avila', value: 'Brando Avila' },
          { name: 'Lucia Escudero', value: 'Lucia Escudero' },
          { name: 'Javier Bautista', value: 'Javier Bautista' },
          { name: 'Jaime Alvarado', value: 'Jaime Alvarado' },
        ],
      },
      {
        type: 'list',
        default: current.menu,
        name: 'menu',
        message: chalk.blue.bold('¿Se modifico el Menu GECOI ?'),
        choices: [{ name: 'SI' }, { name: 'NO', checked: true }],
      },
      {
        type: 'list',
        default: current.clearing,
        name: 'clearing',
        message: chalk.blue.bold('¿Clearing Controlado ?'),
        choices: [{ name: 'SI' }, { name: 'NO', checked: true }],
      },
    ]);

    current.wi = feedbacks.wi;
    current.iprPet = feedbacks.iprPet;
    current.description = feedbacks.description;
    current.tdp = feedbacks.tdp;
    current.fechaPaP = feedbacks.fechaPaP;
    current.horaPaPi = feedbacks.horaPaPi;
    current.horaPaPf = feedbacks.horaPaPf;
    current.despliegue = feedbacks.despliegue;
    current.sistema = feedbacks.sistema;
    current.niubiz = feedbacks.niubiz;
    current.menu = feedbacks.menu;
    current.clearing = feedbacks.clearing;

    await fs.writeFile('bd.json', JSON.stringify(info), function (err) {
      if (err) {
        console.log(chalk.white.bgRed(err));
      }
      console.log(chalk.white.bgGreen('Datos actualizados correctamente!'));
    });
  } catch (error) {
    console.log(chalk.white.bgRed('¡Algo salió mal!', error));
  }
}

queryDB(updateData);
