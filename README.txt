
# StockWare App API - Proyecto SENA

## Descripción del Proyecto

API de servicios web para gestión de inventario (StockWare). Proyecto de formación en **Análisis y Desarrollo de Software** del Servicio Nacional de Aprendizaje (SENA).

- **Actividad:** Diseño y Desarrollo de servicios web  
- **Código:** GA7-220501096-AA5-EV03  
- **Institución:** Servicio Nacional de Aprendizaje (SENA) - Bogotá  
- **Programa:** Análisis y Desarrollo de Software (2758282)  
- **Fecha:** Agosto 2024

### Integrantes del Grupo 3

- **Desarrollador:** Álvaro Hernán Ruiz Vivas
- **Instructora:** Julieth Alejandra Calderón Barragán

---

## Acceso en Servidor Remoto

La aplicación está disponible en:  
👉 [https://senav3api.agrupalatam.com/](https://senav3api.agrupalatam.com/)

---

## Configuración Local

### Requisitos Previos

- **XAMPP** instalado en tu sistema
- **MySQL** configurado en XAMPP
- **PHP** 7.4 o superior

### Pasos de Instalación

#### 1. Configurar la carpeta del proyecto

```
La carpeta del proyecto debe llamarse: ProySenaProdv01
Ubicación: C:\xampp\htdocs\ProySenaProdv01
```

⚠️ **Importante:** La API busca esta ruta específica para funcionar correctamente. No cambies el nombre ni la ubicación.

#### 2. Importar la base de datos

1. Abre **phpMyAdmin** (http://localhost/phpmyadmin)
2. Crea una nueva base de datos o importa directamente
3. Importa el archivo: `stockwareapp_test_whit_contumers.sql`
4. La base de datos se llamará: `stockwareapp_test`

**Nota:** Este archivo SQL contiene datos demo necesarios para que la API funcione correctamente y permite iniciar sesión con datos de prueba.

#### 3. Acceder a la API

Una vez configurado todo, accede a:  
```
http://localhost/ProySenaProdv01/
```
