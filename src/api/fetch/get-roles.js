
export const getRoles = async () => {
  try {
    const response = await fetch("http://localhost:3007/roles");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const roles = await response.json();
    return roles;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw error; 
  }
};
