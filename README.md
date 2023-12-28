# toDoList

Empezar por ejecutar `npm install` dentro de la carpeta del proyecto.

Hay varios comandos para ejecutar:

`npm test` inicia los test de comandos
`npm run eslint` inicia el eslint
`npm run cli` inicia la app a traves de CLI
`npm run web` inicia la app a través de un pagina web

Para utilizar el modo CLI:

1- Siempre escribir el comando: `npm run cli`

2- Añadir siempre una cuarta palabra ==> ACCIÓN

Tienes 4:

`add`: Añade una tasca nueva pendiente de hacer.
`mark`: Marca una tasca como completada.
`remove`: Elimina una tasca pendiente.
`show`: Muestra todas las tascas pendientes.
`showAll`: Muestra todas las tascas pendientes, completadas y eliminadas.

3- Añadir siempre un 5a palabra, segun la acción deseada:

add + tasca entre comillas

mark + id de la tasca, se encuentra con la accion SHOW

remove + id de la tasca, se encuentra con la accion SHOW

show + una letra cualquiera

Ejemplo:

Añadir => `npm run cli add 'Llamar al dentista'`
Completada => `npm run cli mark 1`
Eliminar => `npm run cli remove 1`
Mostrar Tascas => `npm run cli show j`

Para utilizar el modo WEB:

1- Iniciarlo con el comando `npm run web`

2- Si no se abre una pestaña en el navegador automaticamente, hacer ctrl + click al enlace de localhost

3- Ejemplo visual dinámico del potencial de la app
