import fs from "fs";
import path from "path";
type Task = {
  id: number;
  tasca: string;
  toDone: boolean;
  toDelete: boolean;
};

const filePath = path.join(__dirname, "db.txt");

export const add = async (arg: string): Promise<Task | boolean> => {
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
    return true;
  } catch (err) {
    return false;
  }
};

export const markAsDone = async (
  arg: number
): Promise<Task | boolean | string> => {
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
    return false;
  }
};
export const remove = async (arg: number): Promise<string | boolean> => {
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
    return false;
  }
};
export const showTask = async (): Promise<
  { id: number; tasca: string }[] | boolean
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
    // return true;
  } catch (err) {
    return false;
  }
};
export const showAllTask = async (): Promise<
  [Task[], Task[], Task[]] | "AllList" | "ko"
> => {
  try {
    const dataDB = await fs.promises.readFile(filePath, "utf8");
    const dataJSON = JSON.parse(dataDB);

    const listTaskToDo: Task[] = dataJSON[0];
    const listTaskDone: Task[] = dataJSON[1];
    const listTaskRemoved: Task[] = dataJSON[2];
    return [listTaskToDo, listTaskDone, listTaskRemoved];
    // return "AllList";
  } catch (err) {
    return "ko";
  }
};
