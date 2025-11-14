// index.ts
import * as fs from "fs";
import * as path from "path";
import * as readline from "readline";

import Tarea from "./tarea";
import Tanda from "./tanda";
import Memoria from "./memoria";
import FirstFit from "./algoritmos/firstFit";
import NextFit from "./algoritmos/nextFit";
import BestFit from "./algoritmos/bestFit";
import WorstFit from "./algoritmos/worstFit";
import Estrategia from "./algoritmos/estrategia"; // si tu clase base se llama así

// EXPORTS PRINCIPALES
export let clock: number = -1;
export let tiempoSeleccion: number = 0;
export let tiempoCarga: number = 0;
export let tiempoLiberacion: number = 0;

let log: string = "";

// =============================
//   LOG
// =============================
export function agregarLog(txt: string) {
  log += txt + "\n";
}

// =============================
//   UTIL: PREGUNTAR POR CONSOLA
// =============================
function crearInterface() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
}

function preguntar(rl: readline.Interface, texto: string): Promise<string> {
  return new Promise((resolve) => rl.question(texto, resolve));
}

// =============================
//   SELECCIONAR TANDA (JSON)
// =============================
async function seleccionarTanda(rl: readline.Interface): Promise<string> {
  const carpetaTandas = path.join(__dirname, "..", "tandas"); 
  // OJO: ajusta la ruta si tu "dist" queda en otra carpeta

  const archivos = fs
    .readdirSync(carpetaTandas)
    .filter((nombre) => nombre.toLowerCase().endsWith(".json"));

  if (archivos.length === 0) {
    console.error("No se encontraron archivos .json en la carpeta de tandas");
    process.exit(1);
  }

  console.log("======================================");
  console.log("         TANDAS DISPONIBLES");
  console.log("======================================");
  archivos.forEach((nombre, i) => {
    console.log(`${i + 1}) ${nombre}`);
  });
  console.log("======================================");

  let indiceValido = false;
  let indice = -1;

  while (!indiceValido) {
    const respuesta = await preguntar(rl, "Elige la tanda (número): ");
    const num = parseInt(respuesta.trim(), 10);

    if (!isNaN(num) && num >= 1 && num <= archivos.length) {
      indiceValido = true;
      indice = num - 1;
    } else {
      console.log("Opción inválida. Intenta de nuevo.");
    }
  }
  const archivo = archivos[indice];
  if (!archivo) throw new Error("Índice de archivo inválido");
  
  return path.join(carpetaTandas, archivo);
  
}

// =============================
//   SELECCIONAR ESTRATEGIA
// =============================
async function seleccionarEstrategia(
  rl: readline.Interface
): Promise<Estrategia> {
  console.log("======================================");
  console.log("      ESTRATEGIAS DISPONIBLES");
  console.log("======================================");
  console.log("1) First Fit");
  console.log("2) Next Fit");
  console.log("3) Best Fit");
  console.log("4) Worst Fit");
  console.log("======================================");

  let estrategia: Estrategia | null = null;

  while (!estrategia) {
    const respuesta = await preguntar(rl, "Elige la estrategia (1-4): ");
    const num = parseInt(respuesta.trim(), 10);

    switch (num) {
      case 1:
        estrategia = new FirstFit();
        break;
      case 2:
        estrategia = new NextFit();
        break;
      case 3:
        estrategia = new BestFit();
        break;
      case 4:
        estrategia = new WorstFit();
        break;
      default:
        console.log("Opción inválida. Intenta de nuevo.");
    }
  }

  return estrategia;
}

// =============================
//   TAMAÑO MEMORIA
// =============================

async function seleccionarTamanoMemoria(rl: readline.Interface): Promise<number> {
    while (true) {
      const resp = await preguntar(rl, "Ingrese el tamaño de la memoria física disponible: ");
      const tam = parseInt(resp.trim(), 10);
  
      if (!isNaN(tam) && tam > 0) {
        return tam;
      }
  
      console.log("Valor inválido. Debe ser un número entero mayor a 0.");
    }
}

// =============================
//   TIEMPO SELECCION
// =============================
  

async function seleccionarTiempoSeleccion(rl: readline.Interface): Promise<number> {
  while (true) {
    const resp = await preguntar(rl, "Ingrese el Tiempo de seleccion de particion (Enter = 0): ");
    const texto = resp.trim();

    if (texto === "") {
      return 0;
    }

    const tam = parseInt(texto, 10);

    if (!isNaN(tam) && tam > -1) {
      return tam;
    }

    console.log("Valor inválido. Debe ser un número entero mayor a -1");
  }
}

// =============================
//   TIEMPO CARGA
// =============================


async function seleccionarTiempoCarga(rl: readline.Interface): Promise<number> {
  while (true) {
    const resp = await preguntar(rl, "Ingrese el Tiempo de carga promedio (Enter = 0): ");
    const texto = resp.trim();

    if (texto === "") {
      return 0;
    }

    const tam = parseInt(texto, 10);

    if (!isNaN(tam) && tam > -1) {
      return tam;
    }

    console.log("Valor inválido. Debe ser un número entero mayor a -1");
  }
}


// =============================
//   TIEMPO LIBERACION
// =============================

async function seleccionarTiempoLiberacion(rl: readline.Interface): Promise<number> {
  while (true) {
    const resp = await preguntar(rl, "Ingrese el Tiempo de liberación de partición (Enter = 0): ");
    const texto = resp.trim();

    if (texto === "") {
      return 0;
    }

    const tam = parseInt(texto, 10);

    if (!isNaN(tam) && tam > -1) {
      return tam;
    }

    console.log("Valor inválido. Debe ser un número entero mayor a -1");
  }
}


// =============================
//   MAIN
// =============================
async function main() {
  const rl = crearInterface();

  // 1) Elegir archivo de tanda
  const rutaTanda = await seleccionarTanda(rl);
  console.log("\nTanda seleccionada:", rutaTanda);

  const contenido = fs.readFileSync(rutaTanda, "utf8");
  const datos: {
    nombre: string;
    tiempo_arribo: number;
    duracion: number;
    memoria_requerida: number;
  }[] = JSON.parse(contenido);

  // 2) Cargar tareas a partir del JSON elegido
  const tareas = datos.map(
    (t) =>
      new Tarea(
        t.nombre,
        t.tiempo_arribo,
        t.duracion,
        t.memoria_requerida,
        true
      )
  );
  const tanda = Tanda.getInstance();
  tanda.agregarTanda(tareas);

  // 3) Elegir estrategia
  const estrategia = await seleccionarEstrategia(rl);

  const tamanio = await seleccionarTamanoMemoria(rl);
  tiempoSeleccion = await seleccionarTiempoSeleccion(rl);
  tiempoCarga = await seleccionarTiempoCarga(rl);
  tiempoLiberacion = await seleccionarTiempoLiberacion(rl);

  rl.close();

  agregarLog("=======================================================");
  agregarLog("                  Datos cargados");
  agregarLog("=======================================================");

  let memoria: Memoria = new Memoria(tamanio, estrategia);

  // =============================
  //    SIMULADOR
  // =============================

  interface Espera {
    tarea: Tarea,
    tiempoRestante: number
  }

  let colaEspera: Espera[] = [];
  const tiempoEspera: number = tiempoSeleccion + tiempoCarga;

  while (tanda.hayTareas() || memoria.hayTareasPendiente()) {

    clock += 1;
    agregarLog("");
    agregarLog("==============================================================");
    agregarLog("                TIEMPO [" + clock + "]");
    agregarLog("==============================================================");
    agregarLog("");
    
    memoria.finalizarTareas();
    agregarLog("Memoria disponible: " + memoria.getTotalLibre());

    let tarea: Tarea | null = tanda.ObtenerTarea();

    if (tiempoEspera > 0){

      // Reduzco el tiempo restante en la cola
      for (const item of colaEspera) {
        agregarLog("======== REDUCCION TIEMPOS DE ESPERA ========");
        item.tiempoRestante -= 1;
        agregarLog(`Tiempo de espera tarea ${item.tarea.getNombre()} - ${item.tiempoRestante}`);
      }

      if ( !(tarea === null) ){

        colaEspera.push({
          tarea: tarea,
          tiempoRestante: tiempoEspera
        });
        agregarLog(`Se añadio la tarea ${tarea.getNombre()} a la cola de espera - tiempo restante: ${tiempoEspera}`);
        tarea = null;

      }

      // alguna tarea puede salir de la cola?
      for (let i = 0; i < colaEspera.length; i++) {

        if (colaEspera[i]!.tiempoRestante <= 0) {
          agregarLog(`La tarea ${colaEspera[i]!.tarea.getNombre()} puede salir - espera = ${colaEspera[i]!.tiempoRestante}`);
          let eliminado = colaEspera.splice(i, 1)[0];
          tarea = eliminado!.tarea;
          break;
        }
      }
      
      agregarLog("==========================================");

    }

    memoria.agregarTarea(tarea!);

    memoria.calcularFragmentacion();

  }

  agregarLog(tanda.listosToString());
  agregarLog("========================================");
  agregarLog("Fragmentacion: " + memoria.getFragmentacion());
  memoria.calculoTiempoRetorno();
  agregarLog("========================================");
  memoria.getResumen();

  console.log(log);

  // crear TXT
  const ruta: string = "eventos.txt";

  fs.writeFileSync(ruta, log, "utf8");

  console.log("Archivo creado correctamente:", ruta);

}

// Ejecutar
main().catch((err) => {
  console.error("Error en la simulación:", err);
});
