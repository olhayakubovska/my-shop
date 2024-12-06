import { setUpdateUserRole } from "../fetch";

export const updateRoleAsync = (userId, newRoleId) => async (dispatch) => {
  const newRole = await setUpdateUserRole(userId, newRoleId);

  return {
    err: null,
    res: newRole,
  };
};
