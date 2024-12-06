export const setUpdateUserRole = async (userId, newRoleId) => {
  try {
    const response = await fetch(`http://localhost:3007/users/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json;charset=UTF-8" },
      body: JSON.stringify({
        roleId: newRoleId,
      }),
    });

    if (!response.ok) {
      throw new Error("error");
    }

    const updatedUserRole = await response.json();

    return updatedUserRole;
  } catch (error) {
    console.error("Ошибка при обновлении роли пользователя:", error);
  }
};
