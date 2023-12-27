# toDoList

Hay dos comandos para iniciar los aplicacion, en modo CLI => npm run cli, o en modo web => npm run web.

Para utilizar el modo CLI:
1- Siempre escribir el comando: npm run cli
2- Añadir siempre una cuarta palabra ==> ACCIÓN
Tienes 4:
add: Añade una tasca nueva pendiente de hacer.
mark: Marca una tasca como completada.
remove: Elimina una tasca pendiente.
show: Muestra todas las tascas pendientes.
showAll: Muestra todas las tascas pendientes, completadas y eliminadas.
3- Añadir siempre un 5a palabra, segun la acción deseada:
add => tasca entre comillas
mark => id de la tasca, se encuentra con la accion SHOW
remove => id de la tasca, se encuentra con la accion SHOW
show => una letra cualquiera

Ejemplo:
Añadir => npm run cli add 'Llamar al dentista'  
Completada => npm run cli mark 1
Eliminar => npm run cli remove 1
Mostrar Tascas => npm run cli show j
