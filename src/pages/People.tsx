import React, { useEffect, useState } from 'react';
import { getPeople } from '../services/StarWarsAPI';
import { Person, PeopleResponse } from '../types/People';
import { Container, Row, Col, Card, Alert, Spinner } from 'react-bootstrap';
import Pagination from '../components/Pagination';

const People = () => {
  const [people, setPeople] = useState<Person[]>([]);
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
        const data: PeopleResponse = await getPeople(page);
        setPeople(data.data);
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

 
  return (
    <Container>
      <h1>People</h1>
      {isLoading && <Spinner animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner>}
      {error && <Alert variant="danger">{error.message}</Alert>}
      <Row>
        {people.map((person) => (
          <Col key={person.id} sm={12} md={6} lg={24} xl={3} className="mb-4">
            <Card>
              <Card.Img variant="top" src={person.image_url} alt={person.name} height={400} />
              <Card.Body>
                <Card.Title>{person.name}</Card.Title>
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

export default People;
