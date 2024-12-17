"use client";
import { getAllUsers, getUserById } from "@/app/utils/api";
import React, {useEffect, useState} from "react";
import { User } from "./api/users";
import StartChat from "@/app/components/startchat/StartChat";

const UsersList = () => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const fetchedUsers = await getAllUsers();

                setUsers(fetchedUsers);

                console.log(fetchedUsers);
            }
            catch(err) {
                console.log("error: "+err);
            }
        } 

        fetchUsers();
    }, []);

    const startChat = (userId: number) => {

        const fetchUserById = async () => {
            try {
                const userLoggedId = localStorage.getItem('userLoggedId');
                console.log("userloggedid: "+userLoggedId);
                console.log("userToStartChat: "+userId);

                const createdChat: boolean = await StartChat(Number(userLoggedId), userId);

                if(createdChat) {
                    window.location.href = '/chat';
                }
                else {
                    alert("ir a chat que ya existe entre ambos");
                }
                
            }
            catch(err) {
                console.log("err"+err);
            }
        }

        fetchUserById();
    }

    return (
        <div>
            <h2>User List</h2>
            {users.length === 0 ? (
            <p>No users found.</p>
            ) : (
            <ul>
                {users.map((user) => (
                <li className="mb-1.5" key={user.id}>{user.name}<button onClick={() => {
                    startChat(user.id);
                }} className="ml-1.5 bg-blue-500">start chat</button></li> // Render user names
                ))}
            </ul>
            )}
       </div>
    );
};

export default UsersList;