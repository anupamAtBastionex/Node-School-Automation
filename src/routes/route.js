const express = require('express');
// const AuthorController = require('../controllers/authorController');
const Midd = require("../middleware/authMiddleware");
//const BookController  = require("../controllers/bookController");
//const usersController = require("../controllers/userController");
const StudentController     = require("../controllers/StudentController");
const StaffController       = require("../controllers/StaffController");
const StaffTypeController   = require("../controllers/StaffTypeController");
const DepartmentController  = require("../controllers/DepartmentController");
const AttendanceController  = require("../controllers/AttendanceController");

const router = express.Router();

// router.post("/authors", AuthorController.createAuthor)//q1
// router.post("/login", AuthorController.login)   //q2


// router.post("/book", Midd.middleWare, BookController.createBook)//q3
// router.get("/getBook", BookController.fetchBooks)//q4

 //router.put("/books/:bookId", Midd.middleWare, BookController.updateBook)

// router.delete("/books/:bookId", Midd.middleWare, BookController.deleteById)
// router.get("/getBookByQuery", BookController.getBookByQuery)//q4


//router.post("/user/create", usersController.createUser);


const multer = require("multer");

const crypto = require('crypto');

// Generate a random string of specified length
const generateRandomString = (length) => {
  return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
};

// Generate a random filename for the image
const generateRandomFilename = (extension) => {
    const randomString = generateRandomString(16); // Specify the desired length of the random string
    return randomString + '.' + extension;
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const extension     = file.originalname.split('.').pop();
    const newFilename   = generateRandomFilename(extension);
    console.log(newFilename);
    cb(null, newFilename);
  },
});

const upload = multer({ storage: storage });

var mandatoryFields = ['name', 'father_name', 'age', 'mobile', 'email', 'admission_date', 'class_name'];

router.post("/student/createStudent", upload.single("image"), Midd.validateFields(mandatoryFields), StudentController.createStudent);
router.post("/student/createStudents", StudentController.createStudents);
router.get("/student/getStudent/:stId", StudentController.getStudentById);
router.get("/student/getStudents", StudentController.getStudents);
router.put("/student/:stId", StudentController.updateStudent);
router.delete("/student/:stId", StudentController.deleteStudent);

router.post("/staff/createStaff", StaffController.createStaff);
router.post("/staff/createStaffs", StaffController.createStaffs);
router.get("/staff/getStaff/:stfId", StaffController.getStaffById);
router.get("/staff/getStaffs", StaffController.getStaffs);
router.put("/staff/:stfId", StaffController.updateStaff);
router.delete("/staff/:stfId", StaffController.deleteStaff);

router.post("/staffType/createStaffType", StaffTypeController.createStaffType);
router.post("/staffType/createStaffTypes", StaffTypeController.createStaffTypes);
router.get("/staffType/getStaffType/:stfId", StaffTypeController.getStaffTypeById);
router.get("/staffType/getStaffTypes", StaffTypeController.getStaffTypes);
router.put("/staffType/:stfId", StaffTypeController.updateStaffType);
router.delete("/staffType/:stfId", StaffTypeController.deleteStaffType);

router.post("/department/createDepartment", DepartmentController.createDepartment);
router.post("/department/createDepartments", DepartmentController.createDepartments);
router.get("/department/getDepartment/:deptId", DepartmentController.getDepartmentById);
router.get("/department/getDepartments", DepartmentController.getDepartments);
router.put("/department/:deptId", DepartmentController.updateDepartment);
router.delete("/department/:deptId", DepartmentController.deleteDepartment);

router.post("/attendance/createAttendance", AttendanceController.createAttendance);
router.post("/attendance/createAttendances", AttendanceController.createAttendances);
router.get("/attendance/getAttendance/:deptId", AttendanceController.getAttendanceById);
router.get("/attendance/getAttendances", AttendanceController.getAttendances);
router.put("/attendance/:deptId", AttendanceController.updateAttendance);
router.delete("/attendance/:deptId", AttendanceController.deleteAttendance);

module.exports = router;
