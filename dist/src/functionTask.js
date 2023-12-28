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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.showAllTask = exports.showTask = exports.remove = exports.markAsDone = exports.add = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const filePath = path_1.default.join(__dirname, "db.txt");
const add = (arg) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dataDB = yield fs_1.default.promises.readFile(filePath, "utf8");
        const dataJSON = JSON.parse(dataDB);
        const listTaskToDo = dataJSON[0];
        const listTaskDone = dataJSON[1];
        const listTaskRemoved = dataJSON[2];
        let idTask = dataJSON[3];
        const tasK = {
            id: idTask,
            tasca: arg,
            toDone: false,
            toDelete: false,
        };
        idTask += 1;
        listTaskToDo.push(tasK);
        yield fs_1.default.promises.writeFile(filePath, JSON.stringify([listTaskToDo, listTaskDone, listTaskRemoved, idTask]));
        return true;
    }
    catch (err) {
        return false;
    }
});
exports.add = add;
const markAsDone = (arg) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dataDB = yield fs_1.default.promises.readFile(filePath, "utf8");
        const dataJSON = JSON.parse(dataDB);
        const listTaskToDo = dataJSON[0];
        const listTaskDone = dataJSON[1];
        const listTaskRemoved = dataJSON[2];
        const idTask = dataJSON[3];
        const itemIndex = listTaskToDo.findIndex((item) => item.id === arg);
        listTaskToDo[itemIndex].toDone = true;
        listTaskDone.push(listTaskToDo[itemIndex]);
        yield fs_1.default.promises.writeFile(filePath, JSON.stringify([listTaskToDo, listTaskDone, listTaskRemoved, idTask]));
        return listTaskToDo[itemIndex].tasca;
    }
    catch (err) {
        return false;
    }
});
exports.markAsDone = markAsDone;
const remove = (arg) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dataDB = yield fs_1.default.promises.readFile(filePath, "utf8");
        const dataJSON = JSON.parse(dataDB);
        const listTaskToDo = dataJSON[0];
        const listTaskDone = dataJSON[1];
        const listTaskRemoved = dataJSON[2];
        const idTask = dataJSON[3];
        const itemIndex = listTaskToDo.findIndex((item) => item.id == arg);
        const itemDeleted = listTaskToDo.filter((item) => item.id == arg);
        listTaskToDo[itemIndex].toDelete = true;
        listTaskRemoved.push(itemDeleted[0]);
        yield fs_1.default.promises.writeFile(filePath, JSON.stringify([listTaskToDo, listTaskDone, listTaskRemoved, idTask]));
        return itemDeleted[0].tasca;
    }
    catch (e) {
        return false;
    }
});
exports.remove = remove;
const showTask = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dataDB = yield fs_1.default.promises.readFile(filePath, "utf8");
        const dataJSON = JSON.parse(dataDB);
        const listTaskToDo = dataJSON[0];
        const listPendiente = listTaskToDo.filter((task) => task.toDone == false && task.toDelete == false);
        const listTaskToShow = listPendiente.map(({ id, tasca }) => ({
            id,
            tasca,
        }));
        return listTaskToShow;
    }
    catch (err) {
        return false;
    }
});
exports.showTask = showTask;
const showAllTask = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dataDB = yield fs_1.default.promises.readFile(filePath, "utf8");
        const dataJSON = JSON.parse(dataDB);
        const listTaskToDo = dataJSON[0];
        const listTaskDone = dataJSON[1];
        const listTaskRemoved = dataJSON[2];
        return { toDo: listTaskToDo, done: listTaskDone, removed: listTaskRemoved };
    }
    catch (err) {
        return "ko";
    }
});
exports.showAllTask = showAllTask;
//# sourceMappingURL=functionTask.js.map