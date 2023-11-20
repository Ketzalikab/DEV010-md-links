# Markdown Links

## Índice

* [1. Preámbulo](#1-preámbulo)
* [2.Esta libreria incluye los siguientes archivos: ](#2-Esta-libreria-incluye-los-siguientes-archivos:)

***

## 1. Preámbulo

[Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado
ligero muy popular entre developers. Es usado en
muchísimas plataformas que manejan texto plano (GitHub, foros, blogs, etc.) y
es muy común encontrar varios archivos en ese formato en cualquier tipo de
repositorio (empezando por el tradicional `README.md`).

Estos archivos `Markdown` normalmente contienen _links_ (vínculos/ligas) que
muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de
la información que se quiere compartir.

Dentro de una comunidad de código abierto, nos han propuesto crear una
herramienta usando [Node.js](https://nodejs.org/), que lea y analice archivos
en formato `Markdown`, para verificar los links que contengan y reportar
algunas estadísticas.

![md-links](https://github.com/Laboratoria/bootcamp/assets/12631491/fc6bc380-7824-4fab-ab8f-7ab53cd9d0e4)

## 2. Esta libreria incluye los siguientes archivos: 

Dentro de la carpeta mdLinks de este proyecto se encuentra lo siguiente: 

## Un archivo mdLinks.js 
Este archivo contiene una función `mdLinks` es la función principal del módulo. A continuación se describe a detalle cuales son sus funciones: 

## Validación de Ruta:
Verifica si la ruta proporcionada es válida no nula ni indefinida. si no se proporciona una ruta válida, se rechaza la promesa con un error. 

## Obtención de Estadísticas del Archivo o directorio: 
 - si la ruta es un directorio, llama a la función `getMarkdownFiles` para obtener una lista de archivos Markdown en ese directorio. 
 - si la ruta es un archivo Marckdown, llama a la función `processMarkdownFile` para procesar ese archivo específico. 

 ## Unificación de Resultados: 
 - concatena los resultados obtenidos de la ejecución de `getMarkdownFiles` o `processMarkdownFile` en una 'unica matriz.

 ## Función `getMarkdownFiles`
 La función `getMarkdownFiles` toma un directorio como entrada y devuelve una promesa que se resuleve con un array de promesas. Cada promesa en este array corresponde al procesamiento de un archivo Markdown en el directorio. 

 1. Lectura de Directorio: utiliza `fsPromises.readdir` para leer el contenido del directorio y obtener una lista de archivos. 
 2. Generación de Promesas para Procesamiento Individual: 
 - Por cada archivo en el directorio, llama a la función `processMarkdownFile` con la ruta completa del archivo y la opción de validación 
 - La función devuelve un array de promesas para el procesamiento individual de cada archivo. 
 3. Resolución de Promesas: 
 - Utiliza `Promise.all` para esperar a que se completen todas las promesas de procesamiento individual. 
 - La promesa se resuelve con un array que contiene todos los resultados de procesar cada archivo. 

 ## Función `processMarkdownFile`  
 La función `processMarkdownFile`  toma la ruta d eun archivo Markdown, la opción de validación y la ruta del directorio(para que se costruyan las rutas relativas) y devuelve una promesa que se resuelve con un array de objetos de enlaces. 

 1. Lectura del Contenido del archivo: utiliza `fsPromises.readFile` para leer el contenido del archivo. 
 
 2. Busqueda de Enlaces en el Contenido: 
 - Utiliza una expresión regular (`linkRegex`) para encontrar todas las coincidencias de enlaces en el contenido del archivo. 
 - Por cada coincidencia, crea un objeto de enlace con la información como `href`, `text`, `file` y , si es necesario, inicia la validaci'on de enlace. 

 3. Validación de Enlaces 
 - Si la opción de validación está activada, utiliza Axios para realizar una solicitud HEAD a cada enlace y obtener su estado. 
 - Los resultados de la validación se agregan a los objetos de enlace. 

 4. Resolución de la Promesa: 
 - La promesa se resuleve con un array de objetos de enlace, que incluyen la información sobre los enlaces encontrados y, si es necesario, sus estados de validación. 

## Un archivo test-mdLinks-otro.js 
Este archivo contiene un ejemplo de código que nos permite saber cómo usar la función mdLinks para analizar enlaces en archivos Markdown dentro de un directorio. En este caso se agregó a la carpeta mdLinks la carpeta mi_directorio. Se proporciona una ruta de directorio de pruebas, se llama a la función mdLinks y se realizan algunas verificaciones básicas sobre los resultados obtenidos. Este tipo de pruebas puede ser útil para verificar el funcionamiento básico del módulo.

## Un archivo test-mdLinks.js
Dentro de este archivo se encuentra un código de ejemplo par ausar la función mdLinks para analizar enlaces en un archivo Markdown específico. Se proporciona la ruta del archivo de prueba(prueba.md) y se realiza la llamada a mdLinks en dos casos: 
1. Caso 1, sin Validación: la función se llama con el segundo parámetro como false, lo que significa que solo se obtendrá la información básica de los enlaces sin realizar la validación de las URLs. 
2.Caso 2, con validación: la finción se llama con el segundo parámetro como true, lo que significa que además de la información básica de los enlaces, se realiza la validación de las URLs para determinar si están activas. 

Ambos casos muestan los enlaces encontrados y manejan cualquier error que pueda ocurrir durante el proceso. 

## Una carpeta con un archivo de test. 
## Descripción del Test
Este test está diseñado para evaluar la funcionalidad básica de la función mdLinks. La función mdLinks se utiliza para analizar archivos Markdown y extraer información sobre los enlaces contenidos en ellos. El test se divide en varios casos para cubrir diferentes escenarios y verificar si la función se comporta como se espera en cada caso.

## Caso 1: deberia llamar a getMarkdownFiles si la ruta es un directorio

Este caso verifica si la función mdLinks llama a getMarkdownFiles cuando se le proporciona la ruta de un directorio. Se utiliza jest.spyOn para simular las respuestas de las funciones de sistema como lstat y readdir.

## Caso 2: deberia resolver con un array vacio si el archivo no es .md

En este caso, se verifica si la función resuelve con un array vacío cuando se le proporciona la ruta de un archivo que no es un archivo Markdown. También se utiliza jest.spyOn para simular la respuesta de lstat y determinar que el archivo no es un directorio.

## Caso 3: deberia encontrar y retornar los enlaces en un archivo Markdown

Este caso asegura que la función puede encontrar y devolver los enlaces en un archivo Markdown. Se espera que los enlaces tengan propiedades como href, text, y file. Además, se verifica que la función no devuelva un array vacío.

## Caso 4: debería manejar un error si la ruta no es válida

Aquí, se comprueba si la función arroja un error cuando se le proporciona una ruta nula. Se espera que la función maneje adecuadamente la situación y arroje un error con el mensaje correcto.

## Caso 5: deberia manejar un error al leer el archivo

Este caso evalúa si la función maneja correctamente un error al intentar leer un archivo que no existe. Se espera que la función arroje un error que coincida con el patrón /ENOENT/.

## Caso 6: debería encontrar y retornar múltiples enlaces en un archivo llamado Markdown

En este caso, se verifica si la función puede encontrar y devolver múltiples enlaces en un archivo Markdown. Además de las verificaciones básicas de los enlaces, se asegura de que el número de enlaces sea mayor que 1.

## Caso 7: deberia encontrar y validar enlaces en un archivo Markdown

El último caso se encarga de verificar si la función puede encontrar y validar enlaces en un archivo Markdown. Se utiliza axios-mock-adapter para simular respuestas HTTP y se verifica que los enlaces tengan propiedades adicionales como status y ok cuando se realiza la validación.

## Notas Adicionales

Se utiliza la biblioteca axios-mock-adapter para simular las respuestas HTTP y controlar el comportamiento de axios durante las pruebas.
Se emplea jest.spyOn para simular el comportamiento de funciones de sistema como lstat y readdir, permitiendo controlar su respuesta durante las pruebas.