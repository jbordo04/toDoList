import { add, markAsDone, remove, showTask } from "../src/functionTask";

describe("comprovar las diferentes acciones", () => {
  test("Add Task", async () => {
    const result = await add("Comprar comida");
    expect(result).toBe(true);
  });
  test("Done Task", async () => {
    const result = await markAsDone(1);
    expect(typeof result).toBe("string");
  });
  test("Show List Task", async () => {
    const result = await showTask();
    expect(typeof result).toBe("object");
  });
  test("Remove Task", async () => {
    const result = await remove(1);
    expect(typeof result).toBe("string");
  });
});
