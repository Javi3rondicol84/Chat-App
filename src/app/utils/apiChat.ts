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
                return false;
            }

            return true;
        }
        catch(err) {
            console.log(err);
            return false;
        }
 
    }
    else {
        return false;
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