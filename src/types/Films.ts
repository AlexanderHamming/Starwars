export interface Character {
  id: number;
  name: string;
}

export interface Planet {
  id: number;
  name: string;
}

export interface Species {
  id: number;
  name: string;
}

export interface Starship {
  id: number;
  name: string;
}

export interface Vehicle {
  id: number;
  name: string;
}


export interface Film {
    id: number;
    title: string;
    episode_id: string;
    opening_crawl: string;
    director: string;
    producer: string;
    release_date: string;
    image_url: string;
    created: string;
    edited: string;
    characters_count: number;
    planets_count: number;
    starships_count: number;
    vehicles_count: number;
    species_count: number;
    characters: Character[];
    planets: Planet[];
    starships: Starship[];
    vehicles: Vehicle[];
    species: Species[];
  }
  
  export interface FilmResponse {
    current_page: number;
    data: Film[];
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