// lib/authenticate.js
import { jwtDecode } from "jwt-decode";

function setToken(token){
  localStorage.setItem('access_token', token);
}

export function getToken(){
    return localStorage.getItem('access_token');
}

export function readToken() {
  try {
    const token = getToken();
    return token ? jwtDecode(token) : null;
  } catch (err) {
    return null;
  }
}

export function isAuthenticated() {
    const token = readToken();  
    return (token) ? true : false;
}

export function removeToken(){
    localStorage.removeItem('access_token');
}

export function authenticateUser(username, password) {

    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json().then(data => ({ status: response.status, body: data })))
    .then(({ status, body }) => {
      if (status === 400) {
        throw new Error(body.message || 'Invalid login credentials');
      }
      if (status !== 200) {
        throw new Error(body.error || 'Failed to login');
      }
      setToken(body.token); // Store the token in localStorage or another method
      return body;
    });
  }

export function registerUser(name, username, password) {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
        method: "POST",
        body: JSON.stringify({ name, username, password }),
        headers: {
            "content-type": "application/json"
        }
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(error => {
                throw new Error(error.message || 'Failed to register');
            });
        }
        return response.json();
    });
}

//Add Favorite Book
export function addBook(bookId, title, authors, thumbnail) {
  const token = getToken();
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/addToFavorites`, {
      method: "POST",
      body: JSON.stringify({ bookId, title, authors, thumbnail }),
      headers: {
          "content-type": "application/json",
          "Authorization": `Bearer ${token}`
      }
  })
  .then(response => {
      if (!response.ok) {
          return response.json().then(error => {
              throw new Error(error.message);
          });
      }
      return response.json();
  });
}

//Fetch all user's favorite books
export function getFavorites() {
  const token = getToken();
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/favorites`, {
      method: "GET",
      headers: {
          "content-type": "application/json",
          "Authorization": `Bearer ${token}`
      }
  })
  .then(response => {
      if (!response.ok) {
          return response.json().then(error => {
              throw new Error(error.message);
          });
      }
      return response.json();
  });
}

//removeFavoriteBook
export function removeBook(bookId) {
  const token = getToken();
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/removeFavoriteBook`, {
      method: "POST",
      body: JSON.stringify({bookId}),
      headers: {
          "content-type": "application/json",
          "Authorization": `Bearer ${token}`
      }
  })
  .then(response => {
      if (!response.ok) {
          return response.json().then(error => {
              throw new Error(error.message);
          });
      }
      return response.json();
  });
}