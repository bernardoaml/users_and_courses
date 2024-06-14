import format from "pg-format";
import { Course, CourseAddUser, CourseCreate, CourseRead, CourseResult } from "../interfaces";
import { client } from "../database";
import { courseReadSchema } from "../schemas";

const create = async (payload : CourseCreate) : Promise<Course> =>{
    const queryFormat : string = format(
        'INSERT INTO "courses" (%I) VALUES (%L) RETURNING *;',
        Object.keys(payload),
        Object.values(payload)
    )

    const query : CourseResult = await client.query(queryFormat)
    return query.rows[0]
}

const read = async() : Promise<CourseRead> =>{
    const query : CourseResult = await client.query('SELECT * FROM "courses";')
    return courseReadSchema.parse(query.rows)
}

const addCourse = async(courseId: string, userId: string): Promise<{message: string}>=>{
    const queryString: string = `
    INSERT INTO "userCourses" ("courseId", "userId")
    VALUES ($1, $2)
    `

    await client.query(queryString, [courseId, userId])

    return {message: "User successfully vinculed to course"}
}


export default {create, read, addCourse}