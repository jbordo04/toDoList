import { add, markAsDone, remove, showTask, showAllTask } from "./functionTask";

// type ParseArgas = {
//   Order: string;
//   dataOrder: number;
// };

export const parseArg = (args: string[]): [string, string] => {
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
