import format from "pg-format";
import {
  User,
  UserCreate,
  UserRead,
  UserResult,
  UserReturn,
  UserUpdate,
} from "../interfaces";
import { client } from "../database";
import { hash } from "bcryptjs";
import { userReadSchema, userReturnSchema } from "../schemas";


const create = async (payload: UserCreate): Promise<UserReturn> => {

  payload.password = await hash(payload.password, 10)

  const queryFormat: string = format(
    'INSERT INTO "users" (%I) VALUES (%L) RETURNING *;',
    Object.keys(payload),
    Object.values(payload)
  );

  const query: UserResult = await client.query(queryFormat);
  return userReturnSchema.parse(query.rows[0]);
};

const read = async (): Promise<UserRead> => {
  const query: UserResult = await client.query('SELECT * FROM "users";');
  return userReadSchema.parse(query.rows);
};

const partialUpdate = async (
  userId: string,
  payload: UserUpdate
): Promise<UserReturn> => {
  if(payload.password){
    payload.password = await hash(payload.password, 10)
  }
  const queryFormat: string = format(
    'UPDATE "users" SET (%I) = ROW (%L) WHERE "id" = $1 RETURNING *;',
    Object.keys(payload),
    Object.values(payload)
  );

  const query: UserResult = await client.query(queryFormat, [userId]);
  return userReturnSchema.parse(query.rows[0]);;
};

const destroy = async (userId: string): Promise<void> => {
  await client.query('DELETE FROM "users" WHERE "id" = $1;', [userId]);
};

const destroyRegistrationService = async (courseId: string, userId: string): Promise<void> => {
  const queryString : string = `
    UPDATE "userCourses"
    SET "active" = false
    WHERE "userId" = $1 AND "courseId" = $2;
  `

  await client.query(queryString, [userId, courseId]);
};

export default { create, read, partialUpdate, destroy, destroyRegistrationService};