import fs from "fs";
import path from "path";

type Task = {
  id: number;
  tasca: string;
  toDone: boolean;
  toDelete: boolean;
};
const filePath = path.join(__dirname, "db.txt");

export const add = async (arg: string): Promise<Task | "ok" | "ko"> => {
  try {
    const dataDB = await fs.promises.readFile(filePath, "utf8");
    const dataJSON = JSON.parse(dataDB);

    const listTaskToDo: Task[] = dataJSON[0];
    const listTaskDone: Task[] = dataJSON[1];
    const listTaskRemoved: Task[] = dataJSON[2];
    let idTask: number = dataJSON[3];

    const tasK = {
      id: idTask,
      tasca: arg,
      toDone: false,
      toDelete: false,
    };
    idTask += 1;
    listTaskToDo.push(tasK);

    await fs.promises.writeFile(
      filePath,
      JSON.stringify([listTaskToDo, listTaskDone, listTaskRemoved, idTask])
    );
    return "ok";
    // return tasK;
  } catch (err) {
    return "ko";
  }
};

export const markAsDone = async (arg: number): Promise<Task | string> => {
  try {
    const dataDB = await fs.promises.readFile(filePath, "utf8");
    const dataJSON = JSON.parse(dataDB);

    const listTaskToDo: Task[] = dataJSON[0];
    const listTaskDone: Task[] = dataJSON[1];
    const listTaskRemoved: Task[] = dataJSON[2];
    const idTask: number = dataJSON[3];

    const itemIndex = listTaskToDo.findIndex((item) => item.id === arg);
    listTaskToDo[itemIndex].toDone = true;
    listTaskDone.push(listTaskToDo[itemIndex]);
    await fs.promises.writeFile(
      filePath,
      JSON.stringify([listTaskToDo, listTaskDone, listTaskRemoved, idTask])
    );
    // return listTaskToDo[itemIndex];
    // return "update";
    return listTaskToDo[itemIndex].tasca;
  } catch (err) {
    return "ko";
  }
};
export const remove = async (arg: number): Promise<string | "ko"> => {
  try {
    const dataDB = await fs.promises.readFile(filePath, "utf8");
    const dataJSON = JSON.parse(dataDB);

    const listTaskToDo: Task[] = dataJSON[0];
    const listTaskDone: Task[] = dataJSON[1];
    const listTaskRemoved: Task[] = dataJSON[2];

    const idTask: number = dataJSON[3];
    const itemIndex = listTaskToDo.findIndex((item) => item.id == arg);
    const itemDeleted = listTaskToDo.filter((item) => item.id == arg);
    listTaskToDo[itemIndex].toDelete = true;
    listTaskRemoved.push(itemDeleted[0]);

    await fs.promises.writeFile(
      filePath,
      JSON.stringify([listTaskToDo, listTaskDone, listTaskRemoved, idTask])
    );
    return itemDeleted[0].tasca;
    // return "ko";
  } catch (e) {
    return "ok";
  }
};
export const showTask = async (): Promise<
  { id: number; tasca: string }[] | "ko" | "list"
> => {
  try {
    const dataDB = await fs.promises.readFile(filePath, "utf8");
    const dataJSON = JSON.parse(dataDB);

    const listTaskToDo: Task[] = dataJSON[0];
    const listPendiente = listTaskToDo.filter(
      (task) => task.toDone == false && task.toDelete == false
    );
    const listTaskToShow = listPendiente.map(({ id, tasca }) => ({
      id,
      tasca,
    }));
    return listTaskToShow;
    // return "list";
  } catch (err) {
    return "ko";
  }
};
export const showAllTask = async (): Promise<
  { toDo: Task[]; done: Task[]; removed: Task[] } | "AllList" | "ko"
> => {
  try {
    const dataDB = await fs.promises.readFile(filePath, "utf8");
    const dataJSON = JSON.parse(dataDB);

    const listTaskToDo: Task[] = dataJSON[0];
    const listTaskDone: Task[] = dataJSON[1];
    const listTaskRemoved: Task[] = dataJSON[2];
    return { toDo: listTaskToDo, done: listTaskDone, removed: listTaskRemoved };
    // return "AllList";
  } catch (err) {
    return "ko";
  }
};

// type ParseArgas = {
//   Order: string;
//   dataOrder: number;
// };

const parseArg = (args: string[]): [string, string] => {
  if (args.length != 4) throw new Error("Son 4 comando para escribir");

  const Order = String(args[2]);
  const dataOrder = String(args[3]);
  return [Order, dataOrder];
};

const value = parseArg(process.argv);

let data;
let idOrder;
async function toDo(arg: string) {
  switch (arg) {
    case "add":
      data = add(value[1]);
      console.log("Se ha añadido una nueva tasca");
      break;
    case "mark":
      idOrder = Number(value[1]);
      data = await markAsDone(idOrder);
      console.log("Se ha marcada como hecha esta tasca: ", data);

      break;
    case "remove":
      idOrder = Number(value[1]);
      data = await remove(idOrder);
      console.log("Se ha eliminado la tasca:", data);
      break;
    case "show":
      data = await showTask();
      console.log("Estas son todas las tareas: ", data);
      break;
    case "showAll":
      data = await showAllTask();
      console.log("Estas son todas las tareas: ", data);
      break;
  }
}
toDo(value[0]);
