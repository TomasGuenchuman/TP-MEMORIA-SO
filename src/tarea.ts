import { agregarLog } from "./index";

export default class Tarea {
    private nombre: string;
    private tiempo_arribo: number;
    private duracion: number;
    private memoria_requerida: number;
  
    constructor(
      nombre: string,
      tiempo_arribo: number,
      duracion: number,
      memoria_requerida: number,
      log?: boolean
    ) {
      this.nombre = nombre;
      this.tiempo_arribo = tiempo_arribo;
      this.duracion = duracion;
      this.memoria_requerida = memoria_requerida;
      if (log){
        agregarLog("Se creo la tarea...");
        agregarLog(this.toString());
      }

    }
  
    getNombre(): string {
      return this.nombre;
    }

    getMemoria_requerida(): number {
      return this.memoria_requerida;
    }

    getDuracion(): number {
      return this.duracion;
    }

    clone(): Tarea {
      return new Tarea(
        this.nombre,
        this.tiempo_arribo,
        this.duracion,
        this.memoria_requerida
      );
    }

    toString(): string {
        return (
            `{ \n`+
            `  Nombre: ${this.nombre}\n` +
            `  Tiempo de arribo: ${this.tiempo_arribo}\n` +
            `  Duración: ${this.duracion}\n` +
            `  Memoria requerida: ${this.memoria_requerida}\n`+
            `}`
        );
    }
  }
  