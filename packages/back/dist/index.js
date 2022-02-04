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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const TIMEOUT = (time) => new Promise(resolve => setTimeout(resolve, time));
const app = (0, express_1.default)();
const port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3005;
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
const appData = {
    pathInfo: [
        { connected: false, status: 'IDLE', tasks: [] },
        { connected: false, status: 'IDLE', tasks: [] },
        { connected: true, status: 'IDLE', tasks: [] },
    ],
};
const runTasks = (id) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c;
    appData.pathInfo[id].tasks = (_c = (_b = appData.pathInfo[id]) === null || _b === void 0 ? void 0 : _b.tasks) === null || _c === void 0 ? void 0 : _c.map(task => (Object.assign(Object.assign({}, task), { progress: 0 })));
    const tasks = appData.pathInfo[id].tasks;
    if ((tasks && tasks.length === 0) || !tasks) {
        throw new Error('No tasks');
    }
    let taskNumber = 0;
    appData.pathInfo[taskNumber].status = 'PROGRESS';
    for (const task of tasks) {
        if (task.progress || task.progress === 0) {
            for (let i = 0; task.progress < task.speed; task.progress++) {
                yield TIMEOUT(1000);
                console.log(`${task.name} = ${task.speed} / ${task.progress}`);
            }
        }
        else {
            throw new Error('No taks');
        }
    }
    appData.pathInfo[taskNumber].status = 'IDLE';
    console.log('THISISALL', JSON.stringify(tasks, null, '\t'));
});
app.use('*', (req, res, next) => {
    res.status(500);
    console.log('URL: ', req.originalUrl);
    // console.log('BODY: ', req.body)
    console.log('');
    next();
});
app.post('/api/trackconnect', (req, res, next) => {
    try {
        if (req.body.action === 'CONNECT') {
            appData.pathInfo[Number(req.body.id)].connected = true;
        }
        else if (req.body.action === 'DISCONNECT') {
            appData.pathInfo[Number(req.body.id)].connected = false;
        }
        else {
            throw 'Error! ' + JSON.stringify(req.body);
        }
        res.status(200);
    }
    catch (e) {
        res.status(500);
        console.error(e);
    }
    next();
});
app.post('/api/starttrack', (req, res, next) => {
    try {
        appData.pathInfo[req.body.id].tasks = req.body.action;
        runTasks(req.body.id);
        res.status(200);
    }
    catch (e) {
        res.status(500);
        console.error(e);
    }
    next();
});
app.post('/api/data', (req, res, next) => {
    res.status(200);
    next();
});
app.use('/api/*', (req, res, next) => {
    // res.status(500).send()
    // return
    res.send(res.statusCode === 500 ? {} : appData);
    // res.send(appData)
    next();
});
app.listen(port, () => console.log(`Running on port ${port}\n`));
app.get('/', (req, res) => {
    res.send('<html></html>');
});
exports.default = app;
