const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const DB = "./db.json";

function readDB() {
    return JSON.parse(fs.readFileSync(DB, "utf8"));
}

function saveDB(data) {
    fs.writeFileSync(DB, JSON.stringify(data, null, 2));
}

app.get("/api/projects", (req, res) => {
    const data = readDB();
    res.json(data.projects);
});

app.post("/api/projects", (req, res) => {
    const data = readDB();

    const project = {
        id: Date.now(),
        username: req.body.username,
        name: req.body.name,
        link: req.body.link
    };

    data.projects.push(project);

    saveDB(data);

    res.json({
        success: true,
        project
    });
});

app.delete("/api/projects/:id", (req, res) => {

    const data = readDB();

    data.projects = data.projects.filter(
        p => p.id != req.params.id
    );

    saveDB(data);

    res.json({
        success: true
    });
});

app.listen(3000, () => {
    console.log("Server Running");
});
