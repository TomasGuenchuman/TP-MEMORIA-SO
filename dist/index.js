"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tiempoLiberacion = exports.tiempoCarga = exports.tiempoSeleccion = exports.clock = void 0;
exports.agregarLog = agregarLog;
// index.ts
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const readline = __importStar(require("readline"));
const tarea_1 = __importDefault(require("./tarea"));
const tanda_1 = __importDefault(require("./tanda"));
const memoria_1 = __importDefault(require("./memoria"));
const firstFit_1 = __importDefault(require("./algoritmos/firstFit"));
const nextFit_1 = __importDefault(require("./algoritmos/nextFit"));
const bestFit_1 = __importDefault(require("./algoritmos/bestFit"));
const worstFit_1 = __importDefault(require("./algoritmos/worstFit"));
// EXPORTS PRINCIPALES
exports.clock = -1;
exports.tiempoSeleccion = 0;
exports.tiempoCarga = 0;
exports.tiempoLiberacion = 0;
let log = "";
// =============================
//   LOG
// =============================
function agregarLog(txt) {
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
function preguntar(rl, texto) {
    return new Promise((resolve) => rl.question(texto, resolve));
}
// =============================
//   SELECCIONAR TANDA (JSON)
// =============================
async function seleccionarTanda(rl) {
    const carpetaTandas = path.join(__dirname, "..", "tandas");
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
        }
        else {
            console.log("Opción inválida. Intenta de nuevo.");
        }
    }
    const archivo = archivos[indice];
    if (!archivo)
        throw new Error("Índice de archivo inválido");
    return path.join(carpetaTandas, archivo);
}
// =============================
//   SELECCIONAR ESTRATEGIA
// =============================
async function seleccionarEstrategia(rl) {
    console.log("======================================");
    console.log("      ESTRATEGIAS DISPONIBLES");
    console.log("======================================");
    console.log("1) First Fit");
    console.log("2) Next Fit");
    console.log("3) Best Fit");
    console.log("4) Worst Fit");
    console.log("======================================");
    let estrategia = null;
    while (!estrategia) {
        const respuesta = await preguntar(rl, "Elige la estrategia (1-4): ");
        const num = parseInt(respuesta.trim(), 10);
        switch (num) {
            case 1:
                estrategia = new firstFit_1.default();
                break;
            case 2:
                estrategia = new nextFit_1.default();
                break;
            case 3:
                estrategia = new bestFit_1.default();
                break;
            case 4:
                estrategia = new worstFit_1.default();
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
async function seleccionarTamanoMemoria(rl) {
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
async function seleccionarTiempoSeleccion(rl) {
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
async function seleccionarTiempoCarga(rl) {
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
async function seleccionarTiempoLiberacion(rl) {
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
    const datos = JSON.parse(contenido);
    // 2) Cargar tareas a partir del JSON elegido
    const tareas = datos.map((t) => new tarea_1.default(t.nombre, t.tiempo_arribo, t.duracion, t.memoria_requerida, true));
    const tanda = tanda_1.default.getInstance();
    tanda.agregarTanda(tareas);
    // 3) Elegir estrategia
    const estrategia = await seleccionarEstrategia(rl);
    const tamanio = await seleccionarTamanoMemoria(rl);
    exports.tiempoSeleccion = await seleccionarTiempoSeleccion(rl);
    exports.tiempoCarga = await seleccionarTiempoCarga(rl);
    exports.tiempoLiberacion = await seleccionarTiempoLiberacion(rl);
    rl.close();
    agregarLog("=======================================================");
    agregarLog("                  Datos cargados");
    agregarLog("=======================================================");
    let memoria = new memoria_1.default(tamanio, estrategia);
    let colaEspera = [];
    const tiempoEspera = exports.tiempoSeleccion + exports.tiempoCarga;
    while (tanda.hayTareas() || memoria.hayTareasPendiente()) {
        exports.clock += 1;
        agregarLog("");
        agregarLog("==============================================================");
        agregarLog("                TIEMPO [" + exports.clock + "]");
        agregarLog("==============================================================");
        agregarLog("");
        memoria.finalizarTareas();
        agregarLog("Memoria disponible: " + memoria.getTotalLibre());
        let tarea = tanda.ObtenerTarea();
        if (tiempoEspera > 0) {
            // Reduzco el tiempo restante en la cola
            for (const item of colaEspera) {
                agregarLog("======== REDUCCION TIEMPOS DE ESPERA ========");
                item.tiempoRestante -= 1;
                agregarLog(`Tiempo de espera tarea ${item.tarea.getNombre()} - ${item.tiempoRestante}`);
            }
            if (!(tarea === null)) {
                colaEspera.push({
                    tarea: tarea,
                    tiempoRestante: tiempoEspera
                });
                agregarLog(`Se añadio la tarea ${tarea.getNombre()} a la cola de espera - tiempo restante: ${tiempoEspera}`);
                tarea = null;
            }
            // alguna tarea puede salir de la cola?
            for (let i = 0; i < colaEspera.length; i++) {
                if (colaEspera[i].tiempoRestante <= 0) {
                    agregarLog(`La tarea ${colaEspera[i].tarea.getNombre()} puede salir - espera = ${colaEspera[i].tiempoRestante}`);
                    let eliminado = colaEspera.splice(i, 1)[0];
                    tarea = eliminado.tarea;
                    break;
                }
            }
            agregarLog("==========================================");
        }
        memoria.agregarTarea(tarea);
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
    const ruta = "eventos.txt";
    fs.writeFileSync(ruta, log, "utf8");
    console.log("Archivo creado correctamente:", ruta);
}
// Ejecutar
main().catch((err) => {
    console.error("Error en la simulación:", err);
});
//# sourceMappingURL=index.js.map