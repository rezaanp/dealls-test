import axios from 'axios';

const BASE_URL = 'https://dummyjson.com/'

const API = axios.create({
  baseURL: BASE_URL,
});

//FETCH API FOR CLIENT RENDERING
async function clientGet(endpoint: string) {
  try {
    const response = await API.get(endpoint);
    return response
  } catch (error) {
    console.error('Error:', error);
  }
}

//FETCH API FOR SERVER RENDERING
async function serverGet(endpoint: string) {
  try {
    const response = await fetch(BASE_URL + endpoint) 
    return response.json()
  } catch (error) {
    console.error('Error:', error);
  }
}

export {clientGet, serverGet}