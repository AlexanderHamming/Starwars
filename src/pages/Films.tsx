import React from "react";
import { getFilms } from "../services/StarWarsAPI";
import { useEffect, useState } from "react";
import { Film } from '../types/Films';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FilmResponse } from "../types/Films";
import Pagination from '../components/Pagination';


const Films = () => {
    const [films, setFilms] = useState<Film[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number | undefined>(undefined);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const [hasPreviousPage, setHasPreviousPage] = useState<boolean>(false);


  useEffect(() => {
    const fetchPeople = async (page: number) => {
      setIsLoading(true);
      try {
        const data: FilmResponse = await getFilms(page);
        setFilms(data.data);
        setTotalPages(data.last_page);
        setHasNextPage(data.next_page_url !== null);
        setHasPreviousPage(data.prev_page_url !== null);
      } catch (error) {
        setError(error instanceof Error ? error : new Error('Unknown error'));
      } 
        setIsLoading(false);
      
    };

    fetchPeople(currentPage);
  }, [currentPage]);

  const handleNextPage = () => {
    if (hasNextPage) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (hasPreviousPage) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  {isLoading && <p>Loading...</p>}
  {error && <p>ERROR</p>}

  return (
    <Container>
      <h1>Films</h1>
      <Row>
        {films.map((film) => (
          <Col key={film.id} sm={12} md={6} lg={4} xl={3} className="mb-4">
            <Card>
            <Card.Title>{film.title}</Card.Title>
              <Card.Img variant="top" src={film.image_url} alt={film.title} />
              <Card.Body>
               
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Pagination
          hasNextPage={hasNextPage}
          hasPreviousPage={hasPreviousPage}
          onNextPage={handleNextPage}
          onPreviousPage={handlePreviousPage}
          currentPage={currentPage}
          totalPages={totalPages}
  
      />
    </Container>
  );
};

export default Films;