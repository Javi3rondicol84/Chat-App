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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600">
        <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-semibold text-gray-800 text-center mb-6">
            Welcome, {userLoggedId}! 👋
          </h1>
          <p className="text-gray-600 text-center mb-6">
            Below is a list of available users you can start a chat with. Select a user and click <strong>"Start Chat"</strong> to begin your conversation.
          </p>
          <div>
            {users.length === 0 ? (
              <p className="text-gray-500 text-center">No users found. Please try again later.</p>
            ) : (
              <ul className="space-y-4">
                {users.map((user) =>
                  String(user.id) !== userLoggedId ? (
                    <li
                      key={user.id}
                      className="flex items-center justify-between bg-gray-100 rounded-lg p-4 shadow-sm"
                    >
                      <span className="text-gray-800 font-medium">{user.name}</span>
                      <button
                        onClick={() => {
                          startChat(user.id, user.name);
                        }}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                      >
                        Start Chat
                      </button>
                    </li>
                  ) : null
                )}
              </ul>
            )}
          </div>
        </div>
      </div>
      
    );
};

export default UsersList;