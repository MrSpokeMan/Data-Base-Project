-- Create Parent table first as it's referenced by Student
CREATE TABLE `Parent` (
    `parent_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `surname` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`parent_id`)
);

-- Then create Student table with foreign key reference to Parent
CREATE TABLE `Student` (
    `student_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `surname` VARCHAR(255) NOT NULL,
    `parent_id` INT UNSIGNED NOT NULL,
    PRIMARY KEY (`student_id`),
    FOREIGN KEY (`parent_id`) REFERENCES `Parent`(`parent_id`)
);

-- Create Course table with foreign key references to Teacher and Student
CREATE TABLE `Course` (
    `course_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`course_id`)
);

-- Create Teacher table
CREATE TABLE `Teacher` (
    `teacher_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `surname` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `is_headteacher` TINYINT(1) NOT NULL,
    `course_id` INT UNSIGNED,
    PRIMARY KEY (`teacher_id`),
    FOREIGN KEY (`course_id`) REFERENCES `Course`(`course_id`)
);

-- Create Attendance table with foreign key references to Student and Teacher
CREATE TABLE `Attendance` (
    `attendance_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `course_id` INT UNSIGNED NOT NULL,
    `teacher_id` INT UNSIGNED NOT NULL,
    `student_id` INT UNSIGNED NOT NULL,
    `date` TIMESTAMP DEFAULT NOW(),
    `is_present` TINYINT(1) NOT NULL,
    PRIMARY KEY (`attendance_id`),
    FOREIGN KEY (`course_id`) REFERENCES `Course`(`course_id`),
    FOREIGN KEY (`teacher_id`) REFERENCES `Teacher`(`teacher_id`),
    FOREIGN KEY (`student_id`) REFERENCES `Student`(`student_id`)
);

-- Create Grade table with foreign key references to Course, Teacher, and Student
CREATE TABLE `Grade` (
    `grade_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `course_id` INT UNSIGNED NOT NULL,
    `teacher_id` INT UNSIGNED NOT NULL,
    `student_id` INT UNSIGNED NOT NULL,
    `grade` INT NOT NULL,
    PRIMARY KEY (`grade_id`),
    FOREIGN KEY (`course_id`) REFERENCES `Course`(`course_id`),
    FOREIGN KEY (`teacher_id`) REFERENCES `Teacher`(`teacher_id`),
    FOREIGN KEY (`student_id`) REFERENCES `Student`(`student_id`)
);

-- Create Enrollment table with foreign key references to Course and Student
CREATE TABLE `Enrollment` (
    `enrollment_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `course_id` INT UNSIGNED NOT NULL,
    `student_id` INT UNSIGNED NOT NULL,
    PRIMARY KEY (`enrollment_id`),
    FOREIGN KEY (`course_id`) REFERENCES `Course`(`course_id`),
    FOREIGN KEY (`student_id`) REFERENCES `Student`(`student_id`)
);