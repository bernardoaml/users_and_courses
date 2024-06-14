import { Router } from "express";
import middlewares from "../middlewares";
import { userControllers } from "../controllers";
import { userCreateSchema, userUpdateSchema } from "../schemas";
import verifyUserPermission from "../middlewares/verifyUserPermissions.middlewares";

const userRouter: Router = Router();

userRouter.post(
  "",
  middlewares.validateBody(userCreateSchema),
  middlewares.validateUsernameExists,
  userControllers.create
);
userRouter.get("", middlewares.verifyToken, middlewares.verifyAdminToken,userControllers.read);

userRouter.use("/:userId", middlewares.verifyToken, 
middlewares.verifyUserPermission, 
middlewares.validateIdExists, 
);

userRouter.get("/:userId", userControllers.retrieve);

userRouter.get("/:userId/courses",middlewares.verifyToken, middlewares.verifyAdminToken, middlewares.validateIdExists, userControllers.retrieve);

userRouter.patch(
  "/:userId",
  middlewares.validateBody(userUpdateSchema),
  middlewares.validateUsernameExists,
  userControllers.partialUpdate
);

userRouter.delete("/:userId", userControllers.destroy);

export default userRouter;