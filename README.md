# TP-MEMORIA-SO  
Trabajo Integrador – Sistemas Operativos  
**Simulador de Administración de Memoria (TypeScript + Node.js)**

Este proyecto implementa un **simulador de administración de memoria** para un sistema *monoprocesador con multiprogramación*, desarrollado como parte de la materia **Sistemas Operativos**.  
Incluye la representación de memoria física, manejo de particiones dinámicas, algoritmos de asignación (First Fit, Best Fit, Worst Fit, Next Fit) y el procesamiento secuencial de tandas de tareas.

### 📌 Agregar nuevas tandas de tareas  
Para ejecutar el simulador con diferentes cargas de trabajo, simplemente incorporá un archivo **JSON** dentro de la carpeta `tandas/`.  
Cada archivo debe respetar la estructura de definición de tareas (nombre, tiempo de arribo, duración y memoria requerida).  
Una vez agregado, el simulador podrá leerlo automáticamente para generar la tanda correspondiente.

### 📊 Pruebas incluidas (gantt.xls)  
En el archivo **gantt.xls**, ubicado en la carpeta raíz del proyecto, se incluyen diversas pruebas del simulador.  
Cada hoja del archivo utiliza como nombre:

- el **nombre de la tanda**,  
- seguido por **dos caracteres** que indican la estrategia utilizada.

Estas pruebas fueron ejecutadas con **tiempo de selección**, **tiempo de carga** y **tiempo de liberación** configurados en **0**, con el objetivo de analizar únicamente el comportamiento de los algoritmos de asignación sin retrasos adicionales.

---



## 🚀 Requisitos
Antes de ejecutar el proyecto, asegurate de tener instalado:

- **Node.js** (versión 18 o superior recomendada)  
- **npm** (incluido con Node)  

Podés verificar tu versión de Node con:
```
node -v
```

---

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

### 4️⃣ Compilar el proyecto (TypeScript → JavaScript)
```
npm run build
```

### 5️⃣ Ejecutar el proyecto
```
npm run start
```

---