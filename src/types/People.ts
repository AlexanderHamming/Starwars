export interface Homeworld {
    id: number;
    name: string;
  }
  
  export interface Person {
    id: number;
    name: string;
    birth_year: string;
    eye_color: string;
    hair_color: string;
    height: string;
    mass: string;
    skin_color: string;
    wiki_link: string;
    image_url: string;
    affiliations: string[];
    created: string;
    edited: string;
    films_count: number;
    species_count: number;
    starships_count: number;
    vehicles_count: number;
    homeworld: Homeworld;
  }
  
  export interface PeopleResponse {
    current_page: number;
    data: Person[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Array<{ url: string | null; label: string; active: boolean }>;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
  }
  