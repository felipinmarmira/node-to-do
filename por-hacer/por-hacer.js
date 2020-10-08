const fs = require('fs');


let listadoToDo = [];

const guardarDB = () => {
    let data = JSON.stringify(listadoToDo);
    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('No se grabo', err);

    })
}

const cargarDB = () => {
    try {
        listadoToDo = require('../db/data.json');
    } catch (error) {
        listadoToDo = [];
    }

}

const borrar = (descripcion) => {
    cargarDB();
    let listatemp = [];

    for (let tarea of listadoToDo) {
        if (tarea.descripcion != descripcion) {
            listatemp.push(tarea);
        }
    }
    listadoToDo = listatemp
    guardarDB()
        //
        //      o de la siguiente forma
        //
        /* let nuevalista = listadoToDo.filter(tarea => {
            return tarea.descripcion !== descripcion;
        });

        if (nuevalista.length === listadoToDo.length){
            return false
        }
        else {
            listadoToDo=nuevalista;
            guardarDB();
            return true
        } */


}

const getLista = () => {
    cargarDB();
    return listadoToDo;
}

const actualizar = (descripcion, completado = true) => {
    cargarDB();
    let index = listadoToDo.findIndex(tarea => tarea.descripcion === descripcion)

    if (index >= 0) {
        listadoToDo[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }

}

const crear = (descripcion) => {

    cargarDB();
    let porhacer = {
        descripcion,
        completado: false
    };

    listadoToDo.push(porhacer);
    guardarDB();
    return porhacer;
}

module.exports = {
    crear,
    getLista,
    actualizar,
    borrar
}