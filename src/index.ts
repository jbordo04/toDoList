import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { add, remove, markAsDone, showAllTask } from "./functionTask.ts";
// import { marcarDone } from "./function.ts";
import { Landing } from "./landing.ts";

const app = express();
const PORT = process.env.PORT || 3070;
app.use("/App.ts", express.static(__dirname + "/src/App.ts"));
app.use("/index.html", express.static(__dirname + "../index.html"));
app.use("/landing.css", express.static(__dirname + "/landing.css"));
app.use("/function", express.static(__dirname + "/function.js"));

app.use(express.urlencoded());
app.use(express.json());

app.post("/sendTask", async (req, res) => {
  const req_data = req.body.data_task;
  await add(`${req_data}`);

  res.redirect("/");
});

app.post("/markTask", (req, res) => {
  const req_data = req.body.id;
  markAsDone(req_data);
  res.redirect("/");
});

app.post("/borrarTask", (req, res) => {
  const req_data = req.body.id;
  remove(req_data);
  res.redirect("/");
});

app.get("/", async (req, res) => {
  const listToShow = await showAllTask();

  let TaskasRendering: string = "";
  if (Array.isArray(listToShow[0])) {
    if (listToShow[0].length == 0)
      return res.send(Landing.replace("{{TaskasToShow}}", ""));
    const lite = listToShow[0].filter((task) => task.toDelete != true);
    for (let i = 0; i < lite.length; ++i) {
      const status = lite[i].toDone ? "Hecha" : "Marcar como hecha";
      TaskasRendering += /*html*/ `
      <div class="Task" style='display:flex; alig-item:center'>
        <p>${lite[i].tasca}</p>
        <div>
          <button type=button id='${lite[i].id}-id' class="buttDone" onclick='marcarDone(${lite[i].id})'>${status}</button>
          <button type=button id='${lite[i].id}-id' class="buttDelete" onclick='borrarTask(${lite[i].id})'>Borrar Tarea</button>
        </div>
      </div>`;
    }
  }

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
