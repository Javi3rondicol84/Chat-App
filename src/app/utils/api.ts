import { User } from "../../../pages/api/users";


export const getUserById = async (id: number) => {
  try {
    const response = await fetch('/api/users?id='+id);

    if(!response.ok) {
      console.log("response is not ok");
    }

    const data: User = await response.json();

    return data;
  }
  catch(err) {
    throw new Error("error getting users");
  }
};

export const getAllUsers = async () => {
  try {
    const response = await fetch('/api/users');

    if(!response.ok) {
      console.log("response is not ok");
    }

    const data: User[] = await response.json();

    return data;
  }
  catch(err) {
    throw new Error("error getting users");
  }
};

export const createOrLoginUser = async (action: string, name: string, password: string) => {
    try {
      const response = await fetch('/api/users', { // Adjust the API endpoint if needed
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action, name, password }),
      });
  
      if (!response.ok) {
        throw new Error('Error creating user');
      }
  
      const data = await response.json();

      return data; // This will contain the response from the server, such as user details
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  };