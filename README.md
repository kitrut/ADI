# ADI 2018 Manuel Morote Herrero mmh30@alu.ua.es
## [Enlace a github](https://github.com/kitrut/ADI)
## [Documentación de los endpoints](https://documenter.getpostman.com/view/5736518/RzZ4r2un)
![testapi](https://user-images.githubusercontent.com/36452194/47957803-4c7eee00-dfbd-11e8-85dc-beb82944ef6e.PNG)

# =Práctica 3=
* Objetivo: Aplicación cliente usando un framework, en mi caso Angular
Para su ejecución:
```
cd servidor/
npm i
node main.js
#en otro terminal
cd practica3Angular
ng serve
```
* Tras esto se lanzará en http:://localhost:4200/ en la que deberemos registrarnos y logearnos
![imagen](https://user-images.githubusercontent.com/36452194/51076440-b50ed900-1698-11e9-9278-9807cf84497b.png)

## Para la corrección
* Requisitos mínimos
  * Log in/out (DONE)
  * Listado/Ver detalles/Eliminar (DONE)
    * En la vista principal se verán ambas tablas
    * La tabla de puntos mostrará los detalles en un formulario que permite su edición
    * La tabla de tipos mostrará simplemente una alerta con la descripción del tipo seleccionado
  * Creación de nuevos items (DONE)
    * En la barra de navegación habrá un botón que permite crear nuevos puntos, los tipos no se podrán crear para permitir un mayor control de iconos
* Requisitos adicionales
  * CSS : en algunos componentes como en principal.component uso los flexbox para dividir la vista de las tablas, y lo he combinado con bootstrap
  * Listado 2: el segundo listado representará los tipos, debes tener en cuenta que borrar un tipo, eliminará todos los puntos asociados a este, para evitar sucesivas llamadas para recargar los datos de los puntos, solo se refrescará la primera lista al actualizar la página
  * Edición de datos: la edición de datos la hago mediante el uso de un modal en el ver detalles del punto. La variable a la que hace referencia esta doblemente
  vinculada, pero hasta que el servidor no devuelve el OK, no se actualiza la variable de la lista, permitiendo conservar el valor antiguo si no se está seguro de la edición y desea cancelarse. Solo se actualizará si pulsamos el botón del modal. 
  * Enrutador: Para el uso en Angular he usado las librerías RouterModule,Route pertenecientes al propio framework. Las rutas y que componentes deben cargar se encuentran en app.module.ts. En los botones de navegación debemos sustituir los href por routerLink para evitar el refresco de la página

# =Práctica 2=
* Se añade una aplicación cliente para mostrar los resultados arrojados por el servidor

Para su ejecución:
```
cd cliente/
npm i
node_modules/.bin/parcel index.html
#en otro terminal
cd servidor/
npm i
node main.js
```
* Tras esto se lanzará en http:://localhost:1234/ en la que deberemos registrarnos y logearnos
* Una vez conectados obtendremos una vista como esta:
![captura](https://user-images.githubusercontent.com/36452194/48981795-61413400-f0da-11e8-8071-205177186688.PNG)

## Cosas a tener en cuenta:
* Los base de datos se regenera cada vez que se lanza el servidor
* Los tipos de punto eliminan los puntos en cascada
* Los nuevos puntos todavía no tendrán un icono asociado hasta que sean validados
* Ver detalles de un punto, cargará sus datos en el formulario permitiendo así su modificación o la creación de nuevos puntos basados en este
* Los tipos no se podrán crear, se ha creado un tipo Otros que agrupará los nuevos puntos.
* La documentación del proyecto cliente se ha realizado al estilo javadoc, para no ir a fuentes externas y tener la informacion más directa

## Para la corrección
* Requisitos mínimos
  * Log in/Log up/Log out (Formulario en el lateral izquierdo)
  * Listado/Ver detalles/Eliminar (OK)
  * Creación de nuevos items (OK)
* Requisitos adicionales
  * CSS : Inicie haciendolo manual, pero dado mi nulo estilo, acabé utilizando bootstrap y migrando poco a poco a el
  * Listado 2: La columna intermedia representa ese segundo listado junto con sus funciones de detalles y borrado
  * Edición: como he mencionado en las cosas a tener en cuenta, el botón detalles de puntos cargará sus datos en el formulario permitiendo así su modificación o la creación de nuevos puntos basados en éste.
  * Estructurar el proyecto: se ha hecho lo todo lo posible para modularizar algunas partes
