import React, { FormEvent, useState } from 'react';
import { Form, Button, Row, Col} from 'react-bootstrap';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedSearchInput = searchInput.trim()
    onSearch(trimmedSearchInput);
  };

  return (
    <Form onSubmit={handleSearchSubmit} className="mb-4">
    <Form.Group as={Row} controlId="search" className="align-items-center">
      <Col xs={10} md={6} lg={4}>
        <Form.Control
          type="text"
          placeholder="Enter film title"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </Col>
      <Col xs="auto" className="mt-2 mt-md-0">
        <Button variant="primary" type="submit">
          Search
        </Button>
      </Col>
    </Form.Group>
  </Form>
  );
};

export default SearchBar;