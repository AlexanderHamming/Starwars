import axios from "axios";
import { FilmResponse } from "../types/Films";

const instance = axios.create({
    baseURL: "https://swapi.thehiveresistance.com/api",
    timeout: 10000,
	headers: {
		"Accept": "application/json",
		"Content-Type": "application/json",
	},
});



const get = async <T>(endpoint: string) => {
	const res = await instance.get<T>(endpoint);
	return res.data;
}


export const getFilms = () => get<FilmResponse>('/films/');
