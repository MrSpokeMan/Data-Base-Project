import express from "express"
import { getStudents, getStudentById } from "./db.js"

const app = express()
const port = 3000

app.get("/",function(req, res){
    response.send("Witaj w dzienniku elektronicznym!")
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