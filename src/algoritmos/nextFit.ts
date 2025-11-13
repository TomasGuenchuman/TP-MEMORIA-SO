import Estrategia from "./estrategia";
import Particion from "../particion";
import Tarea from "../tarea";
import {agregarLog} from "../index";

export default class NextFit extends Estrategia {
    private inicioUltimaAsignacion: number = 0;
    private finUltimaAsignacion: number = 0;
    private ultimaAsignacion: number = 0;

    seleccionarParticion(particiones: Particion[], tarea: Tarea): Particion | null {
        agregarLog("==========================================");
        agregarLog("Utilizacion Next Fit");
        agregarLog("-  Ultima asignacion: " + `[ ${this.inicioUltimaAsignacion} , ${this.finUltimaAsignacion} ]`);
        let i: number = 0;
        
        // no guardo el indice, porque al fusionarse las particiones, pierde sentido guardarlo
        const ultimaParticion: Particion | undefined = this.buscarParticion(particiones,tarea);
        agregarLog("-  Comienza la busqueda desde: " + `[ ${ultimaParticion!.getInicio()} , ${ultimaParticion!.getFin()} ]`);
        let j: number =  particiones.indexOf(ultimaParticion!);
        this.ultimaAsignacion = j;

        do{

            let particion: Particion | undefined = particiones[j];


            if (
                particion!.getLibre() && 
                ( particion!.getTamanio() >= tarea.getMemoria_requerida() )
            ) {     
                agregarLog("Se encontro una particion despues de recorrer " + i + " particiones");
                agregarLog("==========================================");
                this.inicioUltimaAsignacion = particion!.getInicio();
                this.finUltimaAsignacion = particion!.getFin();
                agregarLog("-  Particion a asignar: " + `[ ${this.inicioUltimaAsignacion} , ${this.finUltimaAsignacion} ]`);
                return particion!;
            }

            i += 1;
            j = (j + 1) % particiones.length;

        }while (j !== this.ultimaAsignacion);

        agregarLog("==========================================");
        return null;
    }

    buscarParticion(particiones: Particion[], tarea: Tarea): Particion | undefined {
      
        for (let i = 0; i < particiones.length; i++) {
            
            const p = particiones[i];
            const inicio = Math.min(p!.getInicio(), p!.getFin());
            const fin = Math.max(p!.getInicio(), p!.getFin());
    
            if (this.inicioUltimaAsignacion >= inicio && this.inicioUltimaAsignacion <= fin) {
                return p!;
            }

        }
      
      }

  }
  