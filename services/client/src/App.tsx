import { useState, useEffect } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import axios from "axios";
import Users from "./components/Users";
import AddUser from "./components/AddUser";

export interface User {
  created_date: string;
  email: string;
  id: number;
  username: string;
}

const App = () => {
  const [users, setUsers] = useState<User[]>([]);

  const addUserToList = (newUser: User) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_SERVICE_URL}/users`,
        );
        if (response.status === 200) {
          setUsers(response.data);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <ChakraProvider>
      <AddUser addUserToList={addUserToList} />
      <Users users={users} />
    </ChakraProvider>
  );
};

export default App;
