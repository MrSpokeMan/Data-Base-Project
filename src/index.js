import express from "express"
import { getStudents, getStudentById, login } from "./db.js"
import bodyParser from "body-parser"

const app = express()
const port = process.env.PORT

app.use(bodyParser.json())

app.get("/",function(req, res){
    response.send("Witaj w dzienniku elektronicznym!")
})

app.post("/login", async function (req, res) {
    const { username, password } = req.body;
    try {
        const token = await login(username, password);
        res.send({ success: true, token });
    } catch (error) {
        res.status(401).send({ success: false, message: error.message });
    }
})

app.get("/students", async function (req, res) {
    const students = await getStudents();
    response.send(students);
});

app.get("/student/:id", async function (req, res) {
    const student = await getStudentById(req.params.id);
    res.send(student);
});

app.listen(port, function () {
    console.log(`Started application on port ${port}`)
});