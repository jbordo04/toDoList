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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const functionTask_ts_1 = require("./functionTask.ts");
const landing_ts_1 = require("./landing.ts");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3070;
app.use("/App.ts", express_1.default.static(__dirname + "/src/App.ts"));
app.use("/index.html", express_1.default.static(__dirname + "../index.html"));
app.use("/landing.css", express_1.default.static(__dirname + "/landing.css"));
app.use(express_1.default.urlencoded());
app.use(express_1.default.json());
app.post("/sendTask", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const req_data = req.body.data_task;
    console.log("data received", req_data);
    yield (0, functionTask_ts_1.add)(`${req_data}`);
    res.redirect("/");
}));
app.post("/markTask", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const req_data = req.body;
    yield (0, functionTask_ts_1.markAsDone)(req_data);
}));
app.post("/borrarTask", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const req_data = req.body;
    console.log("asdf", req_data);
    yield (0, functionTask_ts_1.remove)(req_data);
    res.redirect("/");
}));
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listToShow = yield (0, functionTask_ts_1.showTask)();
    console.log("In:", listToShow);
    var TaskasRendering = "";
    if (Array.isArray(listToShow)) {
        if (listToShow.length == 0)
            return res.send(landing_ts_1.Landing.replace("{{TaskasToShow}}", ""));
        for (let i = 0; i < listToShow.length; ++i) {
            TaskasRendering += `
      <div class="Task" style='display:flex; alig-item:center'>
        <p>${listToShow[i].tasca}</p>
        <div>
          <button type=button id='${listToShow[i].id}-id' class="buttDone" onclick='marcarDone(${listToShow[i].id})'>Marcar como Hecho</button>
          <button type=button id='${listToShow[i].id}-id' class="buttDelete" onclick='borrarTask(${listToShow[i].id})'>Borrar Tarea</button>
        </div>
      </div>`;
        }
    }
    res.send(landing_ts_1.Landing.replace("{{TaskasToShow}}", TaskasRendering).replace("Actualmente no tienes ninguna tarea por hacer", ""));
}));
app.listen(PORT, () => {
    console.log(`[Server]: Server is running at   http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map