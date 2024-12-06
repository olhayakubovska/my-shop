export const deleteSession = async (sessionId) => {
  console.log(sessionId, "sessionIdFetch");
  try {
    const response = await fetch(
      `http://localhost:3007/sessions/${sessionId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      // Логирование для диагностики
      const errorMessage = await response.text();
      throw new Error(
        `Ошибка при удалении сессии: ${response.status} - ${errorMessage}`
      );
    }

    return response;
  } catch (error) {
    console.error("Ошибка в deleteSession:", error.message);
    throw error;
  }
};
