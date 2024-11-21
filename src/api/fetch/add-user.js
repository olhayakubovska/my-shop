import { ROLE } from "../../constants";

export const addUser = async (login, password) => {
  try {
    const response = await fetch("http://localhost:3007/users", {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=UTF-8" },
      body: JSON.stringify({
        login,
        password,
        roleId: ROLE.READER,
      }),
    });

    if (!response.ok) {
      throw new Error("Ошибка при создании пользователя");
    }

    const users = await response.json();
    return users;
  } catch (error) {
    console.log("Ошибка на сервере:", error);
    throw error;
  }
};
