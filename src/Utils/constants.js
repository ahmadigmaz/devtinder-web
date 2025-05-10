 //use this when you push your code on production 
//export const BASE_URL = "/api";


// use this when you modyfying your code locally
//export const BASE_URL = "http://localhost:7777"; 


//make things dynamic-if location is local host then use localhost else use api

export const BASE_URL = 

        location.hostname === "localhost"? "http://localhost:7777": "/api" //


