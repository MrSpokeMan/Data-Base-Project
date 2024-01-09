import express from "express"
import { getStudents, getStudentById, login, addGrade, deleteGrade, checkAttendance, getAttendance } from "./db.js"
import bodyParser from "body-parser"
import { authenticate } from "./auth.js"
import cors from 'cors';

const app = express()
// it should be like this but CORS is the real enemy...
const allowedOrigins = ['http://localhost:5173/'];
const options = {
    origin: '*',
    credentials: true,
}

app.use(cors(options));

// 4k FULL HD
const port = 4000

app.use(bodyParser.json())

app.get("/welcome", function (req, res) {
    res.send("Witaj w dzienniku elektronicznym!")
})

app.post("/login", async function (req, res) {
    const { username, password } = req.body;
    try {
        const { user, token } = await login(username, password);         //this doesn't work
        console.log(user)
        res.cookie("token", token, { httpOnly: true, secure: true, sameSite: "none" });
        res.send(user);
    } catch (error) {
        res.status(401).send({ success: false, message: error.message });
    }
})

app.post("/grade", authenticate, async function (req, res) {
    const { grade, student_id, course_id } = req.body;
    const result = await addGrade(grade, student_id, course_id);
    res.send(result);
})

app.get("/students", async function (req, res) {
    const students = await getStudents();
    res.send(students);
});

app.get("/student/:id", authenticate, async function (req, res) {
    const student = await getStudentById(req.params.id);
    res.send(student);
});

app.delete("/grade/:id", authenticate, async function (req, res) {
    const result = await deleteGrade(req.params.id);
    res.send(result);
});

app.post("/attendance", authenticate, async function (req, res) {
    const { student_id, course_id, isPresent } = req.body;
    const result = await checkAttendance(student_id, course_id, isPresent);
    res.send(result);
});

// Student ID to check his attendance
app.get("/attendance/:id", authenticate, async function (req, res) {
    const attendance = await getAttendance(req.params.id);
    res.send(attendance);
});

app.listen(port, function () {
    console.log(`Started application on port ${port}`)
});