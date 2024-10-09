import { ACTION_TYPE } from "../api/action";

const initialStateApp = {
  wasLogout: false,
  isGoBackToTheMainPage: false,
  modal: {
    text: "",
    onConfirm: () => {},
    onCancel: () => {},
    isOpen: false,
  },
};

export const AppReducer = (state = initialStateApp, action) => {
  switch (action.type) {
    case ACTION_TYPE.LOGOUT:
      return {
        ...state,
        wasLogout: !state.wasLogout,
      };
    case ACTION_TYPE.CLOSE_MODAL:
      return initialStateApp;
    case "isGoBackToTheMainPage":
      return {
        ...state,
        isGoBackToTheMainPage: true,

      };

    case ACTION_TYPE.ON_OPEN_MODAL:
      return {
        ...state,
        modal: {
          ...state.modal,
          ...action.payload,
          isOpen: true,
        },
      };
    default:
      return initialStateApp;
  }
};
