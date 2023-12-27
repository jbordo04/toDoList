export const Landing = /*html*/ `
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>ToDo</title>
    <meta charset="UTF-8" />
    <link rel="stylesheet" href="/landing.css">
    <script src="/function.ts"></script>
  </head>
  <body >
    <div class='bodyTask'>
      <div class='inputTask' style="di">
        <h2>Que Tasca quieres enviar?</h2>
        <form method='post' action='/sendTask'>
          <input type='text' name='data_task' placeholder='Taska' required/>
          <div class='listTask'></div>
          <button type='submit' id='buttSubmit'>Enviar</button>
        </form>
      </div>
      <div class="listTask">
        Actualmente no tienes ninguna tarea por hacer
        {{TaskasToShow}}
      </div>    
    </div>
  </body>
</html>
`;
export const ListTask = /*html*/ `

`;
