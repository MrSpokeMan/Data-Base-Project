import express from "express"
import { getStudents, getStudentById, login, addGrade, deleteGrade, checkAttendance, getAttendance, updateAttendance, getCoursesbyStudentId, getGradesByStudentsCourseID, getAttendanceByStudentsCourseID, getTeacherCourses, getStudentsInCourse } from "./db.js"
import bodyParser from "body-parser"
import { authenticate } from "./auth.js"
import cors from 'cors';

const app = express()
const allowedOrigins = ['http://localhost:5173'];

app.use(cors(allowedOrigins));

const port = process.env.PORT

app.use(bodyParser.json())

app.get("/welcome", function (req, res) {
    res.send("Witaj w dzienniku elektronicznym!")
})

app.get("/courses/:id", async function (req, res) {
    const courses = await getCoursesbyStudentId(req.params.id);
    res.send(courses);
});

app.get("/grades/:student_id/:course_id", async function (req, res) {
    const grades = await getGradesByStudentsCourseID(req.params.student_id, req.params.course_id);
    res.send(grades);
});

app.get("/attendance/:student_id/:course_id", async function (req, res) {
    const attendance = await getAttendanceByStudentsCourseID(req.params.student_id, req.params.course_id);
    res.send(attendance);
});

app.get("/teacher/:id", async function (req, res) {
    const courses = await getTeacherCourses(req.params.id);
    res.send(courses);
});

app.get("/students_course/:id", async function (req, res) {
    const students = await getStudentsInCourse(req.params.id);
    res.send(students);
});

app.post("/login", async function (req, res) {
    const { username, password } = req.body;
    try {
        const { user, token } = await login(username, password);
        res.cookie("token", token, { httpOnly: true, secure: true, sameSite: "none" });
        res.send({ user, token });
    } catch (error) {
        res.status(401).send({ success: false, message: error.message });
    }
})

app.post("/grade", async function (req, res) {
    const { grade, student_id, course_id } = req.body;
    const result = await addGrade(grade, student_id, course_id);
    res.send(result);
})

app.get("/students", async function (req, res) {
    const students = await getStudents();
    res.send(students);
});

app.get("/student/:id", async function (req, res) {
    const student = await getStudentById(req.params.id);
    res.send(student);
});

app.delete("/grade/:id", async function (req, res) {
    const result = await deleteGrade(req.params.id);
    res.send(result);
});

app.post("/attendance", async function (req, res) {
    const { student_id, course_id, isPresent } = req.body;
    const result = await checkAttendance(student_id, course_id, isPresent);
    res.send(result);
});

// Student ID to check his attendance
app.get("/attendance/:id", async function (req, res) {
    const attendance = await getAttendance(req.params.id);
    res.send(attendance);
});

app.put("/attendance/:id", async function (req, res) {
    const { is_excused } = req.body
    const attendace = await updateAttendance(is_excused, req.params.id)
    res.send(attendace)
})

app.listen(port, function () {
    console.log(`Started application on port ${port}`)
});