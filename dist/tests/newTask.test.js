"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const functionTask_1 = require("../src/functionTask");
describe("comprovar las diferentes acciones", () => {
    test("Add Task", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, functionTask_1.add)("Comprar comida");
        expect(result).toBe(true);
    }));
    test("Done Task", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, functionTask_1.markAsDone)(1);
        expect(typeof result).toBe("string");
    }));
    test("Show List Task", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, functionTask_1.showTask)();
        expect(typeof result).toBe("object");
    }));
    test("Remove Task", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, functionTask_1.remove)(1);
        expect(typeof result).toBe("string");
    }));
});
//# sourceMappingURL=newTask.test.js.map