"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const Input = require("./src/App.ts");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3070;
app.use("/App.ts", express_1.default.static(__dirname + "/src/App.ts"));
app.get("/", (req, res) => {
    res.send(Input);
});
app.listen(PORT, () => {
    console.log(`[Server]: Server is running at   http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map