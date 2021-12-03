
//Service system uses fetch API to make the API calls
export async function writeToRedis(data) {
    try{
        console.log("Service writeToRedis ");
        console.log(data);
        const response = await fetch('/send', {  
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });
        return await response.json();
    }
    catch(e){
        console.log(e);
    }
}

