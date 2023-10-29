import {baseurl} from "../Settings/url";
import axios from "axios";

export const logIn = async (credentials) => {
    try {
        return await axios.post(baseurl + `/bookshelf/login/`,
            credentials,
            )
    } catch (e) {
        if (e === 401)
            throw "Incorrect username or password."
        throw "server Not connected"
    }

};
export const registeration = async (data) =>{
    try {


        return await axios.post(baseurl + `/bookshelf/register/`,

                data
        );
    } catch (error) {
        console.error('Error ', error);

    }
}