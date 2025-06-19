import { useState, useEffect } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";

import axios from "axios";
import NavBar from "./components/NavBar";

import Users from "./components/Users";
import AddUser from "./components/AddUser";
import About from "./components/About";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";

export interface User {
  created_date: string;
  email: string;
  id: number;
  username: string;
}

const App = () => {
  const [title] = useState("TestDriven.io");
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
      <NavBar title={title} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <AddUser addUserToList={addUserToList} />
              <Users users={users} />
            </>
          }
        />
        <Route path="/about" element={<About />} />
        <Route
          path="/register"
          element={<RegisterForm onSubmit={() => {}} />}
        />
        <Route path="/login" element={<LoginForm onSubmit={() => {}} />} />
      </Routes>
    </ChakraProvider>
  );
};

export default App;
