"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AcademicSemester_router_1 = require("../AcademicSemester/AcademicSemester.router");
const Department_router_1 = require("../Department/Department.router");
const AcademicFaculty_router_1 = require("../Faculty/AcademicFaculty.router");
const Student_router_1 = require("../Student/Student.router");
const Users_routers_1 = require("../Users/Users.routers");
const express_1 = require("express");
const rootRouter = (0, express_1.Router)();
const routers = [
    {
        path: '/user',
        route: Users_routers_1.userRouter,
    },
    {
        path: '/academicSemester',
        route: AcademicSemester_router_1.AcademicSemesterRouter,
    },
    {
        path: '/academicFaculty',
        route: AcademicFaculty_router_1.AcademicFacultyRouter,
    },
    {
        path: '/department',
        route: Department_router_1.DepartmentRouter,
    },
    {
        path: '/student',
        route: Student_router_1.StudentRouter,
    },
];
routers.forEach((route) => rootRouter.use(route.path, route.route));
exports.default = rootRouter;
