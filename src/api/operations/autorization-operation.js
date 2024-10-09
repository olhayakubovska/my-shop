import { getUser } from "../fetch";
import { sessions } from "../sessions";



export const autorizationOperation = async (authLogin, authPassword) => {
  const user = await getUser(authLogin);

  if (!user) {
    return { error: "Такого пользователя нет", res: null };
  }

  const { id, login, password, roleId } = user;


  if (authPassword !== password) {
    return { error: "Неверный пароль", res: null };
  }

  return {
    error: null,
    res: {
      id,
      login,
      roleId,
      session: sessions.create(user),
    },
  };
};
