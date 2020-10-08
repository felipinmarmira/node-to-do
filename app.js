const argv = require('./config/yargs').argv;
const colors = require('colors');
const porhacer = require('./por-hacer/por-hacer');

let comando = argv._[0];

switch (comando) {
    case 'crear':
        let tarea = porhacer.crear(argv.descripcion);
        console.log(tarea);
        break;

    case 'listar':
        console.log('Listar tareas por hacer');
        let listado = porhacer.getLista();
        for (let tarea of listado) {
            console.log('======= Por Hacer ======'.green);
            console.log(tarea.descripcion);
            console.log('Estado: ', tarea.completado);
            console.log('========================'.green);

        }
        break;

    case 'actualizar':
        console.log(porhacer.actualizar(argv.descripcion, argv.completado));
        break;

    case 'borrar':
        let borrado = porhacer.borrar(argv.descripcion);
        break;

    default:
        console.log('comando no reconocido');
        break;

}