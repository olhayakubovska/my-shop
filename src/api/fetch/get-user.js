
export const getUser = async (loginToFind) => {
  try {
    const response = await fetch(
      `http://localhost:3007/users?login=${loginToFind}`
    );

    if (!response.ok) {
      throw new Error("error getUser");
    }

    const user = await response.json();

    return user[0];
  } catch (error) {
    console.log("err", error);
    throw error;
  }
};
