import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

const createMembership = async (membership) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/memberships/createmembership`,
      {
        data: membership,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al crear el pago:", error);
    throw error;
  }
};

const getMemberships = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/memberships/getmemberships`
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener el pago:", error);
    throw error;
  }
};

export { createMembership, getMemberships };
