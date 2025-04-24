import axios from 'axios';

function getCookie(name) {
  const cookieValue = document.cookie
    .split('; ')
    .find(row => row.startsWith(name + '='))
    ?.split('=')[1];
  return cookieValue;
}

axios.defaults.withCredentials = true;
axios.defaults.headers.common['X-CSRFToken'] = getCookie('csrftoken');

const API_URL = 'http://localhost:8000/api';

// Configure axios to include credentials
axios.defaults.withCredentials = true;

// Get all pets
export const getAllPets = async () => {
  try {
    const response = await axios.get(`${API_URL}/pets/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching pets:', error);
    throw error;
  }
};

// Get available pets
export const getAvailablePets = async () => {
  try {
    const response = await axios.get(`${API_URL}/pets/available/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching available pets:', error);
    throw error;
  }
};

// Get pet by ID
export const getPetById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/pets/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching pet with ID ${id}:`, error);
    throw error;
  }
};

// Get user's pets
export const getUserPets = async () => {
  try {
    const response = await axios.get(`${API_URL}/pets/my_pets/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user pets:', error);
    throw error;
  }
};

// Create a new pet
export const createPet = async (petData) => {
  try {
    const response = await axios.post(`${API_URL}/pets/`, petData);
    return response.data;
  } catch (error) {
    console.error('Error creating pet:', error);
    throw error;
  }
};

// Update a pet
export const updatePet = async (id, petData) => {
  try {
    const response = await axios.put(`${API_URL}/pets/${id}/`, petData);
    return response.data;
  } catch (error) {
    console.error(`Error updating pet with ID ${id}:`, error);
    throw error;
  }
};

// Delete a pet
export const deletePet = async (id) => {
  try {
    await axios.delete(`${API_URL}/pets/${id}/`);
    return true;
  } catch (error) {
    console.error(`Error deleting pet with ID ${id}:`, error);
    throw error;
  }
};