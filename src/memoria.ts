import Estrategia from "./algoritmos/estrategia";
import FirstFit from "./algoritmos/firstFit";
import Particion from "./particion";
import Tarea from "./tarea";
import Tanda from "./tanda";
import {clock,agregarLog, tiempoLiberacion} from "./index";

interface Retorno {
    finTarea: number,
    tarea: Tarea
}

interface Resumen {
    inicio: number,
    fin: number,
    finTarea: number,
    tarea: Tarea
}

interface Espera {
    particion: Particion,
    tiempoEspera: number;
}

export default class Memoria {
    private tamanio: number;
    private particiones: Particion[] = [];
    private tareasPendientes: Tarea[] = [];
    private totalLibre: number;
    private estrategia: Estrategia;
    private tanda: Tanda = Tanda.getInstance();
    private colaEspera: Espera[] = [];
    
    // resultados:
    private fragmentacion: number = 0;
    private tiempoRetorno: Retorno[] = [];
    private tiempoMedioRetorno: number = 0;
    private resumen: Resumen[] = [];


    constructor (tamanio: number, estrategia: Estrategia = new FirstFit()){
        this.tamanio = tamanio;
        this.totalLibre = tamanio;
        this.estrategia = estrategia;
        
        // Creo una particion LIBRE que ocupe toda la memoria
        this.particiones.push(new Particion (
            this.tamanio,// tamaño de la particion
            0,// inicio
            this.tamanio-1, // fin
            true // libre?
        ));

        agregarLog("se creo el objeto memoria...");

    }

    agregarTarea(nuevaTarea: Tarea ): void {
        agregarLog("================================");
        const textoParticiones = this.particiones
        .map(p => `[ ${p.getInicio()} , ${p.getFin()} ] -  Libre: ${p.getLibre()} - Tarea: ${p.getTarea()? p.getTarea().getNombre() : "Sin tarea asignada"} - Fin tarea: ${p.getFinTarea()}` )
        .join('\n' + '--------------------------------------------------------' + '\n');
        agregarLog("Listado de particiones:\n" + textoParticiones);
        agregarLog("================================");

        let tarea: Tarea | undefined = nuevaTarea;

        let dequeue: boolean = true;
        if ( (tarea === null) || (tarea === undefined) ){

            tarea = this.tareasPendientes.shift();
            dequeue = false;
        }

        if ( !(tarea === null) && !(tarea === undefined) ){
            agregarLog("Se quiere agregar la tarea:");
            agregarLog(tarea!.toString());
    
            // hay tareas en la cola?
            if  (dequeue) {
                let tareaAntigua: Tarea | undefined = tarea;
                this.tareasPendientes.push(tarea!); 
                tarea = this.tareasPendientes.shift();
                let tareaActual: Tarea | undefined = tarea;

                if ( !(tareaAntigua === tareaActual) ){
                    agregarLog("Hay tareas pendientes...");
                    agregarLog("nueva tarea: ");
                    agregarLog(tarea!.toString());
                }

            }
            // Hay espacio para la tarea?
            if(this.totalLibre >= tarea!.getMemoria_requerida()){

                agregarLog("Hay memoria disponible");
                const particion: Particion | null = this.estrategia.seleccionarParticion(
                    this.particiones,
                    tarea!
                );

                if ( !(particion === null) ){

                    this.crearParticion(particion, tarea!);

                } else{
                    agregarLog("No hay particion disponible para la tarea: ");
                    this.tareasPendientes.unshift(tarea!);
                }

            } else {
                // SI NO AHY MEMORIA PENDIENTE
                agregarLog("No hay memoria disponible...");
                agregarLog("Se mando a la cola de pendientes, la tarea");
                agregarLog(tarea!.toString());
                this.tareasPendientes.unshift(tarea!);
            }
        } else {
            // tarea es null
            agregarLog("");
            agregarLog("No hay tareas pendientes ni tareas nuevas");
        }

    }

    crearParticion(particion: Particion, tarea: Tarea): void {

        agregarLog("Particion disponible para la tarea: ");
        agregarLog(particion.toString());

        if ( particion.getTamanio() === tarea!.getMemoria_requerida() ){
            // el tamaño de la aprticion coincide con el que necesita la tarea
            agregarLog("La particion es del mismo tamaño que lo que requiere la tarea");
            particion.asignarTarea(tarea!);

            this.totalLibre -= tarea!.getMemoria_requerida();
            agregarLog("Se asigno la tarea a la particion.");
            agregarLog(particion.toString());

        } else {
            // la particion no es del mismo tamaño que necesita la Tarea.
            
            agregarLog("La particion es mas grande que lo que requiere la tarea");

            const finParticionLibre: number = particion.getFin();

            const nuevaParticion: Particion = new Particion(
                tarea!.getMemoria_requerida(),
                particion.getInicio(),
                particion.getInicio() + ( tarea!.getMemoria_requerida() - 1 ),
                false,
                tarea
            );

            // AGREGAR NUEVA PARTICION
                const indice = this.particiones.indexOf(particion);

                if (indice === -1) {
                    throw new Error("La partición de referencia no existe en el arreglo.");
                }

                this.particiones.splice(indice, 0, nuevaParticion);

            particion.setInicio( nuevaParticion.getFin() + 1 );
            particion.setFin(finParticionLibre);
            particion.setTamanio( particion.getTamanio() - nuevaParticion.getTamanio() );
            this.totalLibre -= nuevaParticion.getTamanio();
            agregarLog("Se modifico la particion libre");
            agregarLog(particion.toString());
        }

    }

    espacioDisponible(tarea: Tarea): boolean {
        return this.totalLibre >= tarea.getMemoria_requerida();
    }

    fusionarParticionesContiguas(): void {
        let x: number = 0;
        agregarLog("Se intenta fusionar particiones ocntiguas");
        const resultado: Particion[] = [];
        let actual = this.particiones[0];
      
        for (let i = 1; i < this.particiones.length; i++) {
          const siguiente = this.particiones[i];
      
          // se pueden fusionar?
          const sonLibres = (actual!.getLibre()) && (siguiente!.getLibre());
          const sonContiguas = (actual!.getFin()) === ( siguiente!.getInicio() - 1 );
      
          if (sonLibres && sonContiguas) {
            agregarLog(`Se fusionan las particiones: [ ${actual!.getInicio()}, ${actual!.getFin()} ] y [ ${siguiente!.getInicio()}, ${siguiente!.getFin()} ]`);
            x += 1;
            // extendemos la partición actual
            const nuevoFin = siguiente!.getFin();
            actual!.setFin(nuevoFin);
            actual!.setTamanio(actual!.getTamanio() + siguiente!.getTamanio());
            // no se hace push hasta no saber si la sigeiente esta libre
          } else {

            resultado.push(actual!);
            actual = siguiente;

          }
        }
      
        // meter la última
        resultado.push(actual!);
        agregarLog("-   Particiones fusionadas: " + x);
        this.particiones = resultado;
    }

    finalizarTareas(): void {
        agregarLog("Se busca finalizar tareas...");
        let x: number = 0;
        // reducir el tiempo de espera        
        if (tiempoLiberacion > 0){

            agregarLog("======== REDUCCION TIEMPOS DE ESPERA ========");
            for (const item of this.colaEspera) {
                item.tiempoEspera -= 1;
            }
    
            // hay alguna tarea que pueda finalizar
            for (const particion of this.particiones) {
    
                // puede finalizar la tarea?
                if ( !(particion.getLibre()) && (particion.getFinTarea() <= clock)  && !(particion.getLiberacion()) ){
    
                    this.colaEspera.push({
                        particion: particion,
                        tiempoEspera: tiempoLiberacion
                    });
    
                    particion.setLiberacion(true);
    
                }
            
            }
    
          // hay tareas que puedan salir de la cola?
          for (let i = 0; i < this.colaEspera.length; i++) {
    
            if (this.colaEspera[i]!.tiempoEspera <= 0) {
                x += 1;
                let eliminado: Espera | undefined = this.colaEspera.splice(i, 1)[0];
                let particion: Particion | undefined = eliminado!.particion;
                // LE TENGO QUE SUMAR EL TIEMPO DE LA LIBERACION A lA PARTICION.
                particion.sumarFinTarea(tiempoLiberacion);
    
                // logica finalizacion de la tarea
                agregarLog("Se libero la particion");
                this.tanda.agregar(particion.getTarea().clone());
                agregarLog(particion.toString());
                this.tiempoRetorno.push({
                    finTarea: particion.getFinTarea(),
                    tarea: particion.getTarea().clone()
                });
                this.resumen.push({
                    inicio: particion.getInicio(),
                    fin: particion.getFin(),
                    finTarea: particion.getFinTarea(),
                    tarea: particion.getTarea().clone()
                });
                this.totalLibre += particion.getTamanio();
                particion.finalizarTarea();
                
            }

        }
        
      }else {
        // no hay tiempo de liberacion
        for (const particion of this.particiones) {
    
            // puede finalizar la tarea?
            if(!particion.getLibre() && (particion.getFinTarea() <= clock) ){
    
                // logica finalizacion de la tarea
                agregarLog("Se libero la particion");
                this.tanda.agregar(particion.getTarea().clone());
                agregarLog(particion.toString());
                this.tiempoRetorno.push({
                    finTarea: particion.getFinTarea(),
                    tarea: particion.getTarea().clone()
                });
                this.resumen.push({
                    inicio: particion.getInicio(),
                    fin: particion.getFin(),
                    finTarea: particion.getFinTarea(),
                    tarea: particion.getTarea().clone()
                });
                this.totalLibre += particion.getTamanio();
                x += 1;
                particion.finalizarTarea();

            }
        
        }

      }


        agregarLog("-   Tareas finalizadas: " + x);


        if(this.particiones.length >= 2){
            this.fusionarParticionesContiguas();
        }
        
    }

    calcularFragmentacion(): void {

        const hayPendientes: boolean = (this.tareasPendientes.length > 0);
        const hayOcupadas = this.particiones.some(p => !p.getLibre());

        for (const p of this.particiones) {
            // la partion esta libre Y es la ultima tarea a ejecutar?
            if ( p.getLibre() && (hayPendientes || this.tanda.hayTareas()) ){
                if ( ( !(p.getLiberacion()) && hayOcupadas ) ){
                    this.fragmentacion += p.getTamanio();
                }

            }
        }

    }

    calculoTiempoRetorno(): void {
        let retornoTanda: number = 0;
        agregarLog("-Retorno procesos: ");
        for (const retorno of this.tiempoRetorno) {
            agregarLog(`  Tarea: ${retorno.tarea.getNombre()} - Tiempo Retorno: ${retorno.finTarea}`);
            retornoTanda = retorno.finTarea;
            this.tiempoMedioRetorno += retornoTanda;
        }
        agregarLog("-Retorno de la tanda: " + retornoTanda);
        agregarLog("total tareas: " + this.tanda.getTotalTarea());
        agregarLog("-Tiempo medio de Retorno: " + this.tiempoMedioRetorno/this.tiempoRetorno.length);
        
    }

    getResumen(): void {
        agregarLog("RESUMEN: ");
        for (const resumen of this.resumen) {
            agregarLog(`  Tarea: ${resumen.tarea.getNombre()} - particion: [ ${resumen.inicio} , ${resumen.fin} ] - Fin tarea: ${resumen.finTarea}`);
        }
    }

    getTotalLibre(): number {
        return this.totalLibre;
    }

    getFragmentacion(): number {
        return this.fragmentacion;
    }

    hayTareasPendiente(): boolean {
        const hayOcupadas = this.particiones.some(p => !p.getLibre());

        return (this.tareasPendientes.length > 0) || (hayOcupadas);
    }
    
}  