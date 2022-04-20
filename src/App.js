import "./App.css";
import React from "react";
import { useState, useEffect } from "react";
import { db } from "./firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

function App() {
    
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState(0);
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");

  const createUser = async () => {
    await addDoc(usersCollectionRef, { name: newName, age: Number(newAge) });
  };

  const updateUser = async (id, age) => {
    const userDoc = doc(db, "users", id);
    const newFields = { age: age + 1 };
    await updateDoc(userDoc, newFields);
  };

  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
  };

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, []);

  return (
    <div className="App">›
      <div className="container">
        <header>
          <div className="wrapper">
            <span> React and Firebase</span>
          </div>
        </header>
        <main>
          <div className="wrapper">
            <div className="form">
              <h2> Create New User</h2>
              <input
                type="text"
                placeholder="Name..."
                onChange={(event) => {
                  setNewName(event.target.value);
                }}
              />
              <input
                type="number"
                placeholder="Age..."
                onChange={(event) => {
                  setNewAge(event.target.value);
                }}
              />
              <button onClick={createUser}> Create User </button>
            </div>
            <div className="form">
              <h2> Users database</h2>
              {users.map((user) => {
                return (
                  <div className="form">
                    <h4> Name: {user.name}</h4>
                    <h4> Age: {user.age}</h4>
                    <button
                      onClick={() => {
                        updateUser(user.id, user.age);
                      }}
                    >
                      Increase Age
                    </button>
                    <button
                      onClick={() => {
                        deleteUser(user.id);
                      }}
                    >
                      {" "}
                      Delete{" "}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;