import mysql from "mysql2";
import dotenv from "dotenv";
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

export async function getStudentInfoByParentId(id) {
    const [rows, fields] = await pool.query("SELECT * FROM student WHERE parent_id = ?", [id]);
    return rows[0];
}

export async function getStudentsByCourseId(id) {
    const [rows, fields] = await pool.query("SELECT * FROM enrollment WHERE course_id = ?", [id]);
    return rows;
}

// const result = await getStudentById(2);
// console.log(result);