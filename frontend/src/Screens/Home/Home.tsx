import React from "react";
import { useEffect } from "react";
import UserForm from "./Components/UserForm";
import UserType from "./Interfaces/UserType";
import UserBlock from "./Components/UserBlock";
import api from "../../Services/api";

function Home() {
  let users: UserType[] = [];

  async function getUsers() {
    users = await api.get("/users");
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <UserForm />
      {users.map((user) => (
        <UserBlock {...user} />
      ))}
    </>
  );
}

export default Home;
