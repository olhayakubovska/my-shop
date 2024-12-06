import { ACTION_TYPE } from "../api/action";
import { ROLE } from "../constants";

const initialStateUser = {
  id: null,
  login: null,
  password: null,
  roleId: ROLE.GUEST,
  session: null,
};

export const UserReducer = (state = initialStateUser, action) => {
  switch (action.type) {
    case ACTION_TYPE.SET_USER:
      return {
        ...state,
        ...action.payload,
      };

    case ACTION_TYPE.LOGOUT:
      return initialStateUser;
    default:
      return state;
  }
};
