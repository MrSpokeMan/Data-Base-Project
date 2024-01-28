import mysql from "mysql2";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
    waitForConnections: true,
    connectionLimit: 2,
    queueLimit: 0
}).promise();

export async function getStudents() {
    const [rows, fields] = await pool.query("SELECT * FROM student");
    return rows;
}

export async function getStudentById(id) {
    const [rows, fields] = await pool.query("SELECT * FROM student WHERE student_id = ?", [id]);
    return rows[0];
}

export async function getStudentInfoByParentId(parent_id) {
    const [rows, fields] = await pool.query("SELECT student_id FROM student WHERE parent_id = ?", [parent_id]);
    const [info, fields2] = await pool.query("SELECT grade FROM grade WHERE student_id = ?", [rows[0].student_id]);
    return info;
}

export async function getStudentGradesByStudentId(student_id) {
    const [rows, fields] = await pool.query("SELECT * FROM grade WHERE student_id = ?", [student_id]);
    return rows;
}

export async function getStudentsByCourseId(id) {
    const [rows, fields] = await pool.query("SELECT * FROM enrollment WHERE course_id = ?", [id]);
    return rows;
}

// Do przemyślenia bo mogłem coś napisaś źle, na pewno do przetestowania
export async function getStudentGradesByCourseId(course_id, student_id) {
    const [rows, fields] = await pool.query("SELECT * FROM grade WHERE course_id = ? and student_id=? ", [course_id, student_id]);
    return rows;
}

export async function getTeacherIdByCourseId(id) {
    const [rows, fields] = await pool.query("SELECT teacher_id FROM teacher WHERE course_id = ?", [id]);
    return rows[0];
}

export async function getCoursesbyStudentId(id) {
    const [rows, fields] = await pool.query("SELECT * FROM enrollment WHERE student_id = ?", [id]);
    for (let i = 0; i < rows.length; i++) {
        const [rows2, fields2] = await pool.query("SELECT * FROM course WHERE course_id = ?", [rows[i].course_id]);
        rows[i].course = rows2[0];
    }
    return rows;
}

export async function getGradesByStudentsCourseID(student_id, course_id) {
    const [rows, fields] = await pool.query("SELECT * FROM grade WHERE student_id = ? AND course_id = ?", [student_id, course_id]);
    return rows;
}

export async function getAttendanceByStudentsCourseID(student_id, course_id) {
    const [rows, fields] = await pool.query("SELECT * FROM attendance WHERE student_id = ? AND course_id = ?", [student_id, course_id]);
    return rows;
}

export async function addGrade(grade, student_id, course_id) {
    const teacher_id = await getTeacherIdByCourseId(course_id);
    const [rows, fields] = await pool.query(`INSERT INTO grade (grade, student_id, course_id, teacher_id) VALUES (?, ?, ?, ?)`, [grade, student_id, course_id, teacher_id.teacher_id]);
    return rows;
}

export async function deleteGrade(grade_id) {
    const [rows, fields] = await pool.query("DELETE FROM grade WHERE grade_id = ?", [grade_id]);
    return rows;
}

export async function checkAttendance(student_id, course_id, isPresent) {
    const teacherId = await getTeacherIdByCourseId(course_id);
    const [rows, fields] = await pool.query("INSERT INTO attendance (student_id, course_id, teacher_id ,is_present) VALUES (?, ?, ?, ?)", [student_id, course_id, teacherId.teacher_id, isPresent]);
    return rows;
}

export async function getAttendance(student_id) {
    const [rows, fields] = await pool.query("SELECT course_id, student_id, date, is_present FROM attendance WHERE student_id = ?", [student_id]);
    return rows;
}

export async function updateAttendance(isExcused, attendanceId) {
    const [rows, fields] = await pool.query("UPDATE attendance SET is_present=? WHERE attendance_id=?", [isExcused, attendanceId])
    return rows
}

export async function getTeacherCourses(teacher_id) {
    const [rows, fields] = await pool.query("SELECT course_id FROM teacher WHERE teacher_id=?", [teacher_id]);
    const [rows2, fields2] = await pool.query("SELECT * FROM course WHERE course_id=?", [rows[0].course_id]);
    return rows2;
}

export async function getStudentsInCourse(course_id) {
    const [rows, fields] = await pool.query("SELECT * FROM enrollment WHERE course_id=?", [course_id]);
    return rows;
}

// Username is a surname of a user
export async function login(username, password) {
    const user = await getUserFromDatabase(username, password);
    if (!user || user.password !== password) {
        throw new Error("Invalid username or password");
    }

    // Generate a JWT token
    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1h" });

    return { user, token };
}

async function getUserFromDatabase(username, password) {
    let poolReq;
    if (password[0] == 's')
        poolReq = pool.query("SELECT * FROM student WHERE password = ?", [username])
    else if (password[0] == 't')
        poolReq = pool.query("SELECT * FROM teacher WHERE password = ?", [username])
    else
        poolReq = pool.query("SELECT * FROM parent WHERE password = ?", [username])
    const user = poolReq
        .then(([rows]) => rows[0])
        .catch((error) => {
            console.error("Error fetching user from database:", error);
            throw error;
        });

    return user;
}
