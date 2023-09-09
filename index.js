import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use("/", (req, res) => {
    res.render("index.ejs");
})

app.listen(port, () => {
    console.log(`listening on ${port}`);
});

