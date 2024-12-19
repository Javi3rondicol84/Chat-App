"use client";
import { getAllUsers, getUserById } from "@/app/utils/api";
import React, {useEffect, useState} from "react";
import { User } from "./api/users";
import StartChat from "@/app/components/startchat/StartChat";

const UsersList = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [userLoggedId, setUserLoggedId] = useState<string>('');

    useEffect(() => {
        const userLoggedId = localStorage.getItem('userLoggedId');
        if(userLoggedId) {
            setUserLoggedId(userLoggedId);
        }
            
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

    const startChat = (userId: number, nameUser: string) => {

        const fetchUserById = async () => {
            try {
                const userLoggedId = localStorage.getItem('userLoggedId');
                const secondUserId: string = userId.toString();
                localStorage.setItem('secondUserId', secondUserId);
                localStorage.setItem('nameSecondUser', nameUser);

                const chatId: string = await StartChat(Number(userLoggedId), userId);

                localStorage.setItem('chatId', chatId);

                window.location.href = '/chat';
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

                 String(user.id) !== userLoggedId ? (
                    <li className="mb-1.5" key={user.id}>{user.name}<button onClick={() => {
                        startChat(user.id, user.name);
                    }} className="ml-1.5 bg-blue-500">start chat</button></li> 
                 ):null        
                ))}
            </ul>
            )}
       </div>
    );
};

export default UsersList;