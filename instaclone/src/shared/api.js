import axios from "axios";

const accessToken = document.cookie.split("=")[1];

export const api = axios.create({
    baseURL: "http://13.209.72.212",
    headers: {
        "content-type": "application/json;charset=UTF-8",
        accept: "application/json,",
        authorization: `${accessToken}`,
    },
});