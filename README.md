# ADI 2018 Manuel Morote Herrero mmh30@alu.ua.es
## [Documentación de los endpoints](https://documenter.getpostman.com/view/5736518/RzZ4r2un)
![testapi](https://user-images.githubusercontent.com/36452194/47957803-4c7eee00-dfbd-11e8-85dc-beb82944ef6e.PNG)

# Práctica 2
* Se añade una aplicación cliente para mostrar los resultados arrojados por el servidor

Para su ejecución:
```
cd cliente/
npm i
node_modules/.bin/parcel index.html
```
* Tras esto se lanzará en http:://localhost:1234/ en la que deberemos registrarnos y logearnos
* Una vez conectados obtendremos una vista como esta:
![captura](https://user-images.githubusercontent.com/36452194/48981795-61413400-f0da-11e8-8071-205177186688.PNG)

## Cosas a tener en cuenta:
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
