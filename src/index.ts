import dotenv from "dotenv";
dotenv.config();
import express, { Express, Request, Response } from "express";
import { add, remove, showTask, markAsDone } from "./Task.ts";

import { Landing, ListTask } from "./landing.ts";

const app: Express = express();
const PORT = process.env.PORT || 3070;
app.use("/App.ts", express.static(__dirname + "/src/App.ts"));
app.use("/index.html", express.static(__dirname + "../index.html"));
app.use("/landing.css", express.static(__dirname + "/landing.css"));
app.use("/function.ts", express.static(__dirname + "/function.ts"));

app.use(express.urlencoded());
app.use(express.json());

// function processArray<T extends { id: string }>(input: T[]) {
//   return input.map(elem => ({ ...elem, a: 1, id: elem.id }))
// }

// processArray([{ z: 'asd', test: 1, id: 'test' }])

// export const newTask = (arg: string): Task => {
//   const tasK = {
//     data: arg,
//     toDone: false,
//     toDelete: false,
//   };
//   listTaskToDo.push(tasK);

//   // return tasK;
//   return "ok";
// };

app.post("/sendTask", (req, res) => {
  const req_data = req.body.data_task;
  console.log("data received", req_data);
  // const newTask: (req_data: string) => Task = (req_data) => {
  //   return {
  //     data: req_data,
  //     toDone: false,
  //     toDelete: false,
  //   };
  // };
  add(`${req_data}`);
  // listTaskToDo.push(newTask);
  res.redirect("/");
  // res.status(200).send("tdo ok!");
});

app.post("/borrarTask", (req, res) => {
  const req_data = req.body;
  console.log("asdf", req_data);
  res.redirect("/");
});
const Input = () => /*html*/ `
Escriba la tasca que quiera realizar:
<form method='post' action='sendTask'>
  <input type='text' name='in_task' default='Taska' />
  <div class='listTask'></div>
  <button type='submit' id='butt'>Enviar</button>
</form>
{{listaTexto}}
`;

app.get("/", async (req, res) => {
  // const inputHTML = Input();
  const listToShow = await showTask();
  console.log("In:", listToShow);
  // res.redirect("/index.html");
  var TaskasRendering: string = "";
  if (listToShow.length == 0) {
    return res.send(Landing.replace("{{TaskasToShow}}", ""));
  } else {
    for (let i = 0; i < listToShow.length; ++i) {
      TaskasRendering += /*html*/ `
    <div class="Task" style='display:flex; alig-item:center'>
      <p>${listToShow[i].tasca}</p>
      <div>
        <button type=button class="buttDone" onclick='marcarDone(this)'>Marcar como Hecho</button>
        <button type=button class="buttDelete" onclick='borrarTask(this)'>Borrar Tarea</button>
      </div>
    </div>`;
    }
  }

  //   console.log("toRedner:", TaskasRendering);
  res.send(
    Landing.replace("{{TaskasToShow}}", TaskasRendering).replace(
      "Actualmente no tienes ninguna tarea por hacer",
      ""
    )
  );
});

app.listen(PORT, () => {
  console.log(`[Server]: Server is running at   http://localhost:${PORT}`);
});
