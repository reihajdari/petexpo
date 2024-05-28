import axios from "axios";

export async function getAllPets(searchTerm) {
  const url = `http://localhost:3000/pet/?keyword=` + searchTerm;

  const res = await axios.get(url);
  return res.data;
}

export async function getSinglePet(selectedPetId) {
  const res = await axios.get("http://localhost:3000/pet/" + selectedPetId);
  return res.data;
}

export const updatePet = (petId, petData) => {
  let response;
  try {
    response = axios.put(`http://localhost:3000/pet/${petId}`, petData);
  } catch (error) {
    console.log(error);
  }
  return response.data;
};

export async function deletePet(id) {
  const res = await axios.delete("http://localhost:3000/pet/" + id);
  return res.data;
}

export async function createPet(data) {
  const res = await axios.post(" http://localhost:3000/pet/", {
    name: data.name,
    breed_group: data.breed_group,
    size: data.size,
    lifespan: data.lifespan,
    origin: data.origin,
    temperament: data.temperament,
    description: data.description,
    category: data.category,
    image: data.image,
    colors: data.colors,
  });
  return res.data;
}
