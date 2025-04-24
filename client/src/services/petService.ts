import api from './apiClient';

// Get all pets
export const getAllPets = async () => {
  try {
    const response = await api.get(`/pets/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching pets:', error);
    throw error;
  }
};

// Get available pets
export const getAvailablePets = async () => {
  try {
    const response = await api.get(`/pets/available/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching available pets:', error);
    throw error;
  }
};

// Get pet by ID
export const getPetById = async (id: string) => {
  try {
    const response = await api.get(`/pets/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching pet with ID ${id}:`, error);
    throw error;
  }
};

// Get user's pets
export const getUserPets = async () => {
  try {
    const response = await api.get(`/pets/my_pets/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user pets:', error);
    throw error;
  }
};

// Create a new pet
export const createPet = async (petData: any) => {
  try {
    const response = await api.post(`/pets/`, petData);
    return response.data;
  } catch (error) {
    console.error('Error creating pet:', error);
    throw error;
  }
};

// Update a pet
export const updatePet = async (id: string, petData: any) => {
  try {
    const response = await api.put(`/pets/${id}/`, petData);
    return response.data;
  } catch (error) {
    console.error(`Error updating pet with ID ${id}:`, error);
    throw error;
  }
};

// Delete a pet
export const deletePet = async (id: string) => {
  try {
    await api.delete(`/pets/${id}/`);
    return true;
  } catch (error) {
    console.error(`Error deleting pet with ID ${id}:`, error);
    throw error;
  }
};