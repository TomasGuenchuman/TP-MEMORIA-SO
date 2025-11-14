# TP-MEMORIA-SO  
Trabajo Integrador – Sistemas Operativos  
**Simulador de Administración de Memoria (TypeScript + Node.js)**

Este proyecto implementa un **simulador de administración de memoria** para un sistema *monoprocesador con multiprogramación*, desarrollado como parte de la materia **Sistemas Operativos**.  
Incluye la representación de memoria física, manejo de particiones dinámicas, algoritmos de asignación (First Fit, Best Fit, Worst Fit, Next Fit) y el procesamiento secuencial de tandas de tareas.

### 📌 Supuestos del simulador
A continuación se establecen ciertos criterios y decisiones de diseño para interpretar correctamente el funcionamiento del simulador:

- **No se calcula fragmentación externa durante el tiempo de selección ni tiempo de carga.**  
  Esto se debe a que la tarea aún no fue cargada a memoria RAM, por lo cual no existen particiones a evaluar para fragmentación.

- **El tiempo de selección incluye el recálculo de la tabla de particiones.**  
  Por este motivo, en cada ciclo del reloj el simulador revisará si existen particiones contiguas que puedan fusionarse.  
  Si dos o más particiones contiguas están libres, el simulador las unificará automáticamente en una sola partición mayor.  
---

## 📖 Índice
- [Agregar Nuevas tandas](#tandas)
- [Diagramas de Gantt](#gantt)
- [Instalar las dependencias del proyecto](#instalar)
- [Ejecucion del proyecto](#ejecutar)

<a id='tandas'>

### 📌 Agregar nuevas tandas de tareas  
Para ejecutar el simulador con diferentes cargas de trabajo, simplemente incorporá un archivo **JSON** dentro de la carpeta `tandas/`.  
Cada archivo debe respetar la estructura de definición de tareas (nombre, tiempo de arribo, duración y memoria requerida).  
Una vez agregado, el simulador podrá leerlo automáticamente para generar la tanda correspondiente.

Formato que debe respetar cada elemento del JSON:
```
{
  "nombre": "T5",
  "tiempo_arribo": 4,
  "duracion": 2,
  "memoria_requerida": 30
}
```
---

<a id='gantt'>

### 📊 Pruebas incluidas (gantt.xls)  
En el archivo **gantt.xls**, ubicado en la carpeta raíz del proyecto, se incluyen diversas pruebas del simulador.  
Cada hoja del archivo utiliza como nombre:

- el **nombre de la tanda**,  
- seguido por **dos caracteres** que indican la estrategia utilizada.

Estas pruebas fueron ejecutadas con **tiempo de selección**, **tiempo de carga** y **tiempo de liberación** configurados en **0**, con el objetivo de analizar únicamente el comportamiento de los algoritmos de asignación sin retrasos adicionales.

---


<a id='instalar'>

## 🚀 Requisitos
Antes de ejecutar el proyecto, asegurate de tener instalado:

- **Node.js** (versión 18 o superior recomendada)  
- **npm** (incluido con Node)  

Podés verificar tu versión de Node con:
```
node -v
```

## 📥 Instalación y ejecución del proyecto

### 1️⃣ Clonar el repositorio
```
git clone https://github.com/TomasGuenchuman/TP-MEMORIA-SO.git
```
### 2️⃣ Entrar a la carpeta del proyecto
```
cd TP-MEMORIA-SO
```
### 3️⃣ Instalar dependencias
```
npm install
```
--------------------------------------------------------------------

<a id='ejecutar'>

## 🚀 Ejecución del proyecto
El proyecto ya viene compilado en la carpeta `dist/`.  

--------------------------------------------------------------------

## 🐧 ✔️ Si usás Linux 

### 4️⃣ Ejecutar el proyecto
```
npm run start
```
--------------------------------------------------------------------

## 🪟🍎 ✔️ Si usás Windows o macOS

### 4️⃣ Ejecutar el proyecto
```
node dist/index.js
```
## COMPILAR
en caso de error, volver a compilar el proyecto

```
npx tsc
```

--------------------------------------------------------------------
