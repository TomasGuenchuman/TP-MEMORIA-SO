import Tarea from "./tarea";
import {clock,agregarLog,tiempoSeleccion,tiempoCarga,tiempoLiberacion} from "./index";

export default class Particion {

    private libre: boolean;
    private tamanio: number;
    private tarea: Tarea | null;
    private inicio_particion: number;
    private fin_particion: number;
    private finTarea: number = -1;
    private liberacion: boolean;

    constructor (
        tamanio: number,
        inicio_particion: number,
        fin_particion: number,
        libre: boolean = false,
        tarea: Tarea | null = null,
        liberacion? : boolean
    ) {
        this.liberacion = liberacion ?? false;
        this.libre = libre;
        this.tamanio = tamanio;
        this.tarea = tarea;
        this.inicio_particion = inicio_particion;
        this.fin_particion = fin_particion;
        if ( !(tarea === null) ) {
            this.asignarTarea(tarea);
        }

        agregarLog("SE CREO LA PARTICION...");
        agregarLog(this.toString());

    }

    asignarTarea(tarea: Tarea): void {
        this.tarea = tarea;
        this.finTarea = clock + tarea.getDuracion() ; 
        this.libre = false;
    }

    getFinTarea(): number {
        return this.finTarea;
    }

    finalizarTarea(): void {
        this.libre = true;
        this.finTarea = -1;
        this.tarea = null;
        this.liberacion = false;
    }

    getLibre(): boolean {
        return this.libre;
    }

    getParticion(): Particion {
        return this;
    }

    getTamanio(): number {
        return this.tamanio;
    }

    getInicio(): number {
        return this.inicio_particion;
    }

    getFin(): number {
        return this.fin_particion;
    }

    getTarea(): Tarea {
        return this.tarea!;
    }

    getLiberacion(): boolean{
        return this.liberacion;
    }

    setLiberacion(x: boolean): void{
        this.liberacion = x;
    }


    setInicio(x: number): void{
        this.inicio_particion = x;
    }

    setFin(x: number): void {
        this.fin_particion = x;
    }

    setTamanio(x: number): void {
        this.tamanio = x;
    }

    setLibre(x: boolean): void {
        this.libre = x;
    }

    sumarFinTarea(x: number): void{
        this.finTarea += x;
    }

    toString(): string {
        return `
      ===== PARTICIÓN =====
      Libre: ${this.libre ? "Sí" : "No"}
      Tamaño: ${this.tamanio}
      Inicio/Fin: [ ${this.inicio_particion}, ${this.fin_particion} ]
      Fin tarea: clock = ${this.finTarea === -1? "-" : this.finTarea}
      ${this.tarea ? `Tarea: ${this.tarea.getNombre()}` : "Sin tarea asignada"}
      ======================
      `;
      }
      

}