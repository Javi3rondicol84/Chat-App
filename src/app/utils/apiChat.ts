export const createChat = async (userLoggedId: number, userId: number) => {
    const existsChat: boolean = await existsChatAlready(userLoggedId, userId);
    
    if(!existsChat) {

        try {
            const response = await fetch('/api/chat/createchat', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({userLoggedId, userId})
            })

            if(!response.ok) {
                return null;
            }

            const chatId = await getChatId(userLoggedId.toString(), userId.toString());

            return chatId;
        }
        catch(err) {
            console.log(err);
            return null;
        }
 
    }
    else {
        const chatId = await getChatId(userLoggedId.toString(), userId.toString());

        return chatId;
    }

}

export const getChatId = async (userLoggedId: string, userId: string) => {

    try {
        const response = await fetch('/api/chat/getchatid', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({userLoggedId, userId})
        })

        if(!response.ok) {
            console.log("response is null");
            return null;
        }

        const chatId = await response.json();

        return chatId.chatId;
    }
    catch(err) {
        console.log(err);
        return null;
    }
}


export const existsChatAlready = async (userLoggedId: number, userId: number) => {
    try {
        const response = await fetch('/api/chat/existschat', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({userLoggedId, userId}),
        });
    
        const data = await response.json();
    
        return data.chatExists;
    }
    catch(err) {
        console.log(err);
        return false;
    }
   
};