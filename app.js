require('colors');
const {
  inquirerMenu,
  listadoTareasBorrar,
  pause,
  leerInput,
} = require('./helpers/inquirer');
const Tareas = require('./models/tareas');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');

const main = async () => {
  let opt = '';
  const tareas = new Tareas();

  const tareasDB = leerDB();

  if (tareasDB) {
    tareas.cargarTareasFromArray(tareasDB);
  }

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case '1':
        const desc = await leerInput('Descripción:');
        tareas.crearTarea(desc);
        break;
      case '2':
        tareas.listadoCompleto();
        break;
      case '3':
        tareas.listarPendientesCompletadas(true);
        break;
      case '4':
        tareas.listarPendientesCompletadas(false);
        break;
      case '6':
        const id = await listadoTareasBorrar(tareas.listadoArr);
        console.log({ id });
        break;
    }

    guardarDB(tareas.listadoArr);
    await pause();
  } while (opt !== '0');
};
main();
