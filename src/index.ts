import datos from "../tandas/memoria_par.json";
import Tarea from "./tarea";
import Tanda from "./tanda";
import Memoria from "./memoria";
import FirstFit from "./algoritmos/firstFit";
import NextFit from "./algoritmos/nextFit";
import BestFit from "./algoritmos/bestFit";
import WorstFit from "./algoritmos/worstFit";

export let clock: number = -1;
export let tiempoSeleccion: number = 0;
export let tiempoCarga: number = 0;
let log: string = "";

export function agregarLog (txt: string) {
    log +=  txt + "\n"
}

const tareas = datos.map( (t) => new Tarea(t.nombre, t.tiempo_arribo, t.duracion, t.memoria_requerida,true) );
const tanda = Tanda.getInstance();
tanda.agregarTanda(tareas);

agregarLog("=======================================================");
agregarLog("                  Datos cargados");
agregarLog("=======================================================");
let tamanio: number = 130;
let memoria: Memoria = new Memoria(tamanio, new NextFit());

//console.log(tanda.toString());

// SIMULADOR

while ( (tanda.hayTareas()) || (memoria.hayTareasPendiente()) ){
    clock += 1;
    agregarLog("");
    agregarLog("==============================================================");
    agregarLog("                TIEMPO [" + clock + "]");
    agregarLog("==============================================================");
    agregarLog("");


    memoria.finalizarTareas();
    agregarLog("Memoria disponible: " +  memoria.getTotalLibre() );

    let tarea: Tarea | null = tanda.ObtenerTarea();
    memoria.agregarTarea(tarea!);

    memoria.calcularFragmentacion()
}
agregarLog(tanda.listosToString());
agregarLog("Fragmentacion: " + memoria.getFragmentacion());
console.log(log);
