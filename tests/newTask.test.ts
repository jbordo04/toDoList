import { add, markAsDone, remove, showTask } from "../src/Task";

describe("comprovar la funcionalidad de añadir una tasca", () => {
  test("Add Task", async () => {
    const task = add("Comprar comida");
    expect(task).toBe(true);
  });
  test("Done Task", async () => {
    const task = markAsDone(0);
    expect(task).toBe("update");
  });
  test("Remove Task", async () => {
    const task = remove(0);
    expect(task).toBe("ko");
  });
  test("Show List Task", async () => {
    const task = showTask();
    expect(task).toBe("list");
  });
});
