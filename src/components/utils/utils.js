// utils/utils.js
export const loginRequest = async (username, password) => {
  try {
    const response = await fetch("https://test.silicon-access.com/fapi/auth/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    return { success: response.ok, data };
  } catch (error) {
    return { success: false, data: { message: "Ocurrió un error en la autenticación." } };
  }
};
