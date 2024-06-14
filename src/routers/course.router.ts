import { Router } from "express";
import middlewares from "../middlewares";
import { courseAddUserSchema, courseCreateSchema } from "../schemas";
import { courseControllers } from "../controllers";
import {userControllers} from "../controllers"

const courseRouter: Router = Router();

courseRouter.post("", middlewares.verifyToken, middlewares.verifyAdminToken, middlewares.validateBody(courseCreateSchema), courseControllers.create)
courseRouter.get("", courseControllers.read)

courseRouter.post("/:courseId/users/:userId", middlewares.verifyToken, middlewares.verifyAdminToken, middlewares.validateIdExists, middlewares.validateCourseIdExists, courseControllers.addCourse)

courseRouter.delete("/:courseId/users/:userId", middlewares.verifyToken, middlewares.verifyAdminToken, middlewares.validateCourseIdExists, middlewares.validateIdExists, userControllers.destroyRegistrationController)

courseRouter.get("/:courseId/users", middlewares.verifyToken, middlewares.verifyAdminToken, middlewares.validateCourseIdExists, courseControllers.read)



export default courseRouter