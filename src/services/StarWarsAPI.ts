import axios from "axios";
import { FilmResponse, Film } from "../types/Films";
import { PeopleResponse, Person } from "../types/People";

const instance = axios.create({
  baseURL: "https://swapi.thehiveresistance.com/api",
  timeout: 10000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

const get = async <T>(endpoint: string) => {
  const res = await instance.get<T>(endpoint);
  return res.data;
};

export const getFilms = (page: number, query: string = "") => {
  const endpoint = query
    ? `/films?page=${page}&search=${query}`
    : `/films?page=${page}`;
  return get<FilmResponse>(endpoint);
};

export const getFilm = (id: string) => {
  return get<Film>(`/films/${id}`);
};

export const getPeople = (page: number, query: string = "") => {
  const endpoint = query
    ? `/people?page=${page}&search=${query}`
    : `/people?page=${page}`;
  return get<PeopleResponse>(endpoint);
};

export const getPerson = (id: string) => {
  return get<Person>(`/people/${id}`);
};
