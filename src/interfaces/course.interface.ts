import {z} from "zod"
import { courseAddUserSchema, courseCreateSchema, courseReadSchema, courseSchema } from "../schemas";
import { QueryResult } from "pg";

type Course = z.infer<typeof courseSchema>
type CourseCreate = z.infer<typeof courseCreateSchema>
type CourseRead = z.infer<typeof courseReadSchema>

type CourseAddUser = z.infer<typeof courseAddUserSchema>

type CourseResult = QueryResult<Course>

export{Course, CourseCreate, CourseResult, CourseRead, CourseAddUser}