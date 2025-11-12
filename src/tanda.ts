import Tarea from "./tarea";
import { agregarLog } from "./index";

export default class Tanda {
    private static instance: Tanda;
    private cola: Tarea[] = [];
    private totalTareas: number = 0;
    private listos: Tarea[] = [];

    private constructor() {
    }

    agregarTanda(items: Tarea[]) {
      if (items && items.length > 0) {
        this.cola = [...items];           
        this.totalTareas = this.cola.length;    
      } 
    }
  
    public static getInstance(): Tanda {
      if (!this.instance) {
        this.instance = new Tanda();
      }
      return this.instance;
    }

    hayTareas(): boolean{
      return this.cola.length > 0;
    }

    TandaTerminada(): boolean {

      let termino: boolean = this.listos.length === this.totalTareas;
      agregarLog("Tanda terminada? " + termino);
      agregarLog("-  Tareas lista: " + this.listos.length + " - total: " + this.totalTareas);
      return termino;
    }
  
    ObtenerTarea(): Tarea | null{
      return this.cola.shift() ?? null;
    }
  
    agregar(item: Tarea): void {
      //agregarLog(`[Tanda.agregar] entra con: ${item.getNombre()}`);
      this.listos.push(item);
      //agregarLog(`[Tanda.agregar] listos.len = ${this.listos.length}`);
    }

    toString(): string {
        const tareas = this.cola.map((t) => t.toString()).join("\n---\n");
        return `TANDA (${this.cola.length} tareas)`;
    }

    listosToString(): string {
      let texto = this.listos
      .map((t, i) => {
        const nombre = t.getNombre();
        console.log(`Tarea #${i + 1}: ${nombre}`);
        return `Tarea #${i + 1}: ${nombre}`;
      })
      .join('\n');
      texto +="\nTotal tareas: " + this.totalTareas;
    return texto;
    }
}
  