import requestService from "./services/requestService";

let requestServiceDefaultHeaders = {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*"
};

let Request = new requestService(requestServiceDefaultHeaders);

let Config = {
    "env": "recette",
};

export default Config;
export { Request };

