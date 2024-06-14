import {z} from "zod"


const courseSchema = z.object({
    id: z.number().positive(),
    name: z.string().max(15),
    description: z.string()
  });

  const courseCreateSchema = courseSchema.omit({
    id:true
  })

  const courseReadSchema = courseSchema.array()

  const courseAddUserSchema = z.object({
    courseId : z.number().positive()
  })


  export { courseSchema, courseCreateSchema, courseReadSchema, courseAddUserSchema}