import axios from "axios";
import { getCookie } from "./Cookie";

const token = document.cookie.split("=")[1];

const accessToken = token;
console.log(accessToken);

export const api = axios.create({
    baseURL: "http://13.209.72.212",
    headers: {
        "content-type": "application/json;charset=UTF-8",
        accept: "application/json,",
        authorization: "Bearer " + `${accessToken}`,
    },
});