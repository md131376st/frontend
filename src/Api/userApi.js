import {baseurl} from "../Settings/url";
import axios from "axios";

export const logIn = async (credentials) => {
    try {
        const response = await fetch(baseurl + '/bookshelf/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(credentials),
        });
        if (response.ok) {
            return await response.json();
        } else {
            throw 404;
        }
    } catch (e) {
        if (e === 404)
            throw "Incorrect username or password."
        throw "server Not connected"
    }

};
export const registeration = async (data) =>{
    try {


        return await axios.post(baseurl + `/bookshelf/register/`,
            {
                data}
        );
    } catch (error) {
        console.error('Error ', error);

    }
}