# Markdown Links

## Índice

* [1. Introducción](#1-introducción)
* [2. Descripción](#2-descripción)
* [3. Diagrama de flujo](#3-diagrama-de-flujo)
* [4. Modo de uso](#4-mode-de.uso)
* [5. Desplegado en NPM](#5-desplegado-en-NPM)

***

## 1. Introducción

 Markdown un lenguaje de marcado
ligero muy popular entre developers. Es usado en muchísimas plataformas que
manejan texto plano (GitHub, foros, blogs, ...) y es muy común
encontrar varios archivos en ese formato en cualquier tipo de repositorio
(empezando por el tradicional `README.md`).

Estos archivos `Markdown` normalmente contienen _links_ (vínculos/ligas) que
muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de
la información que se quiere compartir.

Dentro de una comunidad de código abierto, nos han propuesto crear una
herramienta usando [Node.js](https://nodejs.org/), que lea y analice archivos
en formato `Markdown`, para verificar los links que contengan y reportar
algunas estadísticas.



## 2. Descripción

Este proyecto contiene uan librería que es capaz de analizar archivos y directorios, seleccionando a los archivos que su extención sea **markdown** (.md), y extrae los links que contenga para hacerles una serie de verificaciones con estadísticas.


## 3. Diagrama de flujo

El siguiente [Diagrama de flujo](https://miro.com/app/board/uXjVMHqQnGA=/?share_link_id=701567099394) perimite visualizar el orden en el que el proyecto se fue haciendo para generar la librería. 

## 4. Modo de uso

### Instalación
La librería se instala con el siguiente comando desde el terminal: `npm i md-links-laumontero` 

### Ejecución
La librería se ejecuta desde la terminal:  
`md-links-laumontero <ruta archivo> [options]`


### Ejemplo, si se ejecuta sin opciones: 
 `$ md-links-laumontero ./ruta/example.md`

Debe salir

```sh
Texto: Link a algo
Url: http://ejemplo.com/
File:  ./ruta/example.md 
```


### Ejemplo, si se ejecuta con opción --validate: 
`$ md-links-laumontero ./ruta/example.md --validate`

Debe salir

```sh
Texto: Link a algo
Url: http://ejemplo.com/
File:  ./ruta/example.md 
Status: 200 o 404
Message: 'OK' O 'Not Found'
```

### Ejemplo, si se ejecuta con opción --stats: 
`$ md-links-laumontero ./ruta/example.md --stats`

Debe salir

```sh
Total: (cantidad de links encontrados)
Unique: (cantidad de links encontrados y que no se repiten)
```

### Ejemplo, si se ejecuta con opciones --validate --stats: 
`$ md-links-laumontero ./ruta/example.md --validate --stats`

Debe salir

```sh
Total: (cantidad de links encontrados)
Broken: (cantidad de links que no funcionan)
Unique: (cantidad de links encontrados y que no se repiten)
```

## 5. Desplegado en NPM

[NPM](https://www.npmjs.com/package/md-links-laumontero)