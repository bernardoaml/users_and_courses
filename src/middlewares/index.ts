import handleErrors from "./handleErrors";
import validateBody from "./validateBody.middleware";
import validateIdExists from "./validateIdExists.middleware";
import validateUsernameExists from "./validateUsernameExists.middleware";
import verifyToken from "./verifyToken.middleware";
import verifyUserPermission from "./verifyUserPermissions.middlewares";
import verifyAdminToken from "./verifyAdmin.middleware";
import validateCourseIdExists from "./validateCourseIdExists.middleware";

export default {
  handleErrors,
  validateIdExists,
  validateUsernameExists,
  validateBody,
  verifyToken,
  verifyUserPermission, 
  verifyAdminToken,
  validateCourseIdExists
};