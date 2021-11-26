
//Service system uses fetch API to make the API calls
export async function writeToRedis(data) {
    try{
        const response = await fetch('/write', {  
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