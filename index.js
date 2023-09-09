import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = process.env.PORT || 80;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: true
}));

let dailyTodo = [];
let workTodo = [];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
let date = new Date();
let currentDate = date.getDate();
let URL;

app.get("/", (req, res) => {
    sendDailyTasks(req, res);
});

app.get("/work", (req, res) => {
    sendWorkTasks(req, res);
});

app.post("/add", (req, res, next) => {
    if(URL === "/") {
        dailyTodo.push(req.body.addTodo);
        next();
        res.redirect("/");
    } else if(URL === "/work") {
        workTodo.push(req.body.addTodo);
        next();
        res.redirect("/work");
    }
})

app.listen(port, () => {
    console.log(`listening on ${port}`);
});

function sendDailyTasks(req, res) {
    URL = req.url;
    if(currentDate != date.getDate()) {
        dailyTodo = [];
        workTodo = [];
        currentDate = date.getDate();
    }
    res.render(__dirname + "/views/index.ejs", {
        currentDate: date.getDate(),
        currentDay: days[date.getDay()],
        currentMonth: months[date.getMonth()],
        todayTodo: dailyTodo
    });
}

function sendWorkTasks(req, res) {
    URL = req.url;
    if(currentDate != date.getDate()) {
        dailyTodo = [];
        workTodo = [];
        currentDate = date.getDate();
    }
    res.render(__dirname + "/views/index.ejs", {
        workTodo: workTodo
    });
}