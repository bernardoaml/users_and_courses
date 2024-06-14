import { Request, Response } from "express";
import { Course, CourseRead} from "../interfaces";
import { courseServices} from "../services";

const create = async (req: Request, res: Response): Promise<Response> => {
  const course: Course = await courseServices.create(req.body);
  return res.status(201).json(course);
};

const read = async (req: Request, res: Response): Promise<Response> => {
  const courses: CourseRead = await courseServices.read();
  return res.status(200).json(courses);
};


const addCourse = async (req: Request, res: Response): Promise<Response> => {
  const message: {message: string} = await courseServices.addCourse(req.params.courseId, req.params.userId);
  return res.status(201).json(message);
};


export default { create, read , addCourse}


