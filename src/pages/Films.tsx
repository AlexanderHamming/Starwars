import React from "react";
import { getFilms } from "../services/StarWarsAPI";
import { useEffect, useState } from "react";
import { Film } from '../types/Films';
import { Container, Row, Col, Card } from 'react-bootstrap';


const Films = () => {
    const [films, setFilms] = useState<Film[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | false>(false);

  useEffect(() => {
    const fetchFilms = async () => {
        setIsLoading(true);
      try {
        const data = await getFilms();
        setFilms(data.data); 
       } catch (err) {
			
			if (err instanceof Error) {
				setError(err.message);
			} else {
				setError("Aouch, stop throwing things that are not Errors at me");
			}
		
      }
      setIsLoading(false);
    };

    fetchFilms();
  }, []);
  
  return (
    <Container>
      <h1>Films</h1>
      <Row>
        {films.map((film) => (
          <Col key={film.id} sm={12} md={6} lg={4} xl={3} className="mb-4">
            <Card>
              <Card.Img variant="top" src={film.image_url} alt={film.title} />
              <Card.Body>
                <Card.Title>{film.title}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Films;