const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Add your routes here

const adminListRoutes = require("./routes/admin-routes");
const studentListRoutes = require("./routes/student-routes");
const courseListRoutes = require("./routes/course-routes");
const gradeListRoutes = require("./routes/grade-routes");
const studentCourseRoutes = require("./routes/student-course-routes");
const studentGradeRoutes = require("./routes/student-grade-routes");
const loginRoutes = require("./routes/login-routes");

app.use('/adminListRoutes', adminListRoutes);
app.use('/studentRoutes', studentListRoutes);
app.use('/courseRoutes', courseListRoutes);
app.use('/gradeRoutes', gradeListRoutes);
app.use('/studentCourseRoutes', studentCourseRoutes);
app.use('/studentGradeRoutes', studentGradeRoutes);

app.use('/loginRoutes', loginRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
