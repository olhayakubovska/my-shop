export const getUsers = async () => {
  try {
    const response = await fetch("http://localhost:3007/users");
    if (!response.ok) {
      throw new Error("error");
    }

    const users = await response.json();
    return users;

  } catch (error) {
    console.log("error");
  }
};
