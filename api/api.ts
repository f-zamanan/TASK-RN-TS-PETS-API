import axios from "axios";

const FetchAllPets_url = "https://pets-react-query-backend.eapi.joincoded.com";

const FetchOnePet_url = "https://pets-react-query-backend.eapi.joincoded.com";

const fetchAllPets = async () => {
  const response = await axios.get(`${FetchAllPets_url}/pets`);
  return response.data;
};
// const instance = axios.get(`${FetchAllPets_url}/pets`);
// console.log(instance);
const fetchOnePet = async (id: number) => {
  const response = await axios.get(`${FetchOnePet_url}/pets/${id}`);
  return response.data;
};

export { fetchAllPets, fetchOnePet };
