import axios from 'axios';
import {baseurl} from "../Settings/url";

export const getAllBooks = async () => {
    try {
        const response = await axios.get(baseurl + '/bookshelf');
        // console.log(response);
        return response.data.map((book) => ({
            id: book.id,
            title: book.title,
            year: book.year,
            price: book.price,
            authors: book.authors.map((author) => author.name).join(","),


        }));

    } catch (error) {
        console.error('Error fetching data:', error);
    }

}

export const getOneBook = async (id) => {
    try {
        const response = await axios.get(baseurl + '/bookshelf/'+id);

        return response.data;

    } catch (error) {
        console.error('Error fetching data:', error);
    }

}
export const updateBook = async (book) => {
    try {

        const authors = book.authors.split(',').map((author) => ({ name: author }));
        return await axios.put(baseurl + `/bookshelf/${book.id}/`,
            {
                "title": book.title,
                "price": book.price,
                "year": book.year,
                "authors": authors }
        );
        } catch (error) {
        console.error('Error updating data', error);

    }

}
export const createBook = async (book) => {
    try {

        const authors = book.authors.split(',').map((author) => ({ name: author }));
        return await axios.post(baseurl + `/bookshelf/`,
            {
                "title": book.title,
                "price": book.price,
                "year": book.year,
                "authors": authors }
        );
    } catch (error) {
        console.error('Error ', error);

    }

}
export const deleteBook = async (id) => {
    try {
        return await axios.delete(baseurl + `/bookshelf/${id}/`);
    } catch (error) {
        console.error('Error updating data', error);

    }

}

