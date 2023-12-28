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
exports.parseArg = void 0;
const functionTask_1 = require("./functionTask");
const parseArg = (args) => {
    if (args.length != 4)
        throw new Error("Son 4 comando para escribir");
    const Order = String(args[2]);
    const dataOrder = String(args[3]);
    return [Order, dataOrder];
};
exports.parseArg = parseArg;
const value = (0, exports.parseArg)(process.argv);
let data;
let idOrder;
function toDo(arg) {
    return __awaiter(this, void 0, void 0, function* () {
        switch (arg) {
            case "add":
                data = (0, functionTask_1.add)(value[1]);
                console.log("Se ha añadido una nueva tasca");
                break;
            case "mark":
                idOrder = Number(value[1]);
                data = yield (0, functionTask_1.markAsDone)(idOrder);
                console.log("Se ha marcada como hecha esta tasca: ", data);
                break;
            case "remove":
                idOrder = Number(value[1]);
                data = yield (0, functionTask_1.remove)(idOrder);
                console.log("Se ha eliminado la tasca:", data);
                break;
            case "show":
                data = yield (0, functionTask_1.showTask)();
                console.log("Estas son todas las tareas: ", data);
                break;
            case "showAll":
                data = yield (0, functionTask_1.showAllTask)();
                console.log("Estas son todas las tareas: ", data);
                break;
        }
    });
}
toDo(value[0]);
//# sourceMappingURL=Task.js.map