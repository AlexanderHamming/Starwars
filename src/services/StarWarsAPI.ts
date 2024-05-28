import axios from "axios";
import { FilmResponse } from "../types/Films";
import { PeopleResponse } from "../types/People";

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


export const getFilms = (page: number, query: string = '') => {
	const endpoint = query ? `/films?page=${page}&search=${query}` : `/films?page=${page}`;
	return get<FilmResponse>(endpoint);
  };

  export const getPeople = (page: number, query: string = '') => {
	const endpoint = query ? `/people?page=${page}&search=${query}` : `/people?page=${page}`;
	return get<PeopleResponse>(endpoint);
  };