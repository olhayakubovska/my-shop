

// export const updateProductAsync =
//   (id, name, image, price, category, description, session) =>
//   async (dispatch) => {
//     updateProductOperation(
//       id,
//       name,
//       image,
//       price,
//       category,
//       description,
//       session
//     );
//   };

import { ROLE } from "../../constants";
import { setUpdateProduct } from "../fetch";
import { sessions } from "../sessions";

export const updateProductAsync =
  (id, name, image, price, category, description, session) =>
  async (dispatch) => {
    const accessRoles = [ROLE.ADMIN, ROLE.MODERATOR];

    const access = await sessions.access(session, accessRoles);

    if (!access) {
      return {
        err: "Доступно только админу",
        res: null,
      };
    }

    const updatedProduct = await setUpdateProduct(
      id,
      name,
      image,
      price,
      category,
      description
    );

    return {
      err: null,
      res: updatedProduct,
    };
  };
