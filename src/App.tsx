import './assets/app.scss'
import Home from './pages/pages_home/Home';
import Films from './pages/pages_home/Films';
import FilmDetails from './pages/pages_details/FilmDetails';
import People from './pages/pages_home/People';
import PeopleDetails from './pages/pages_details/PersonDetails'
import NotFoundPage from './pages/pages_home/NotFoundPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import NavigationBar from "./components/navbar"
import './assets/app.scss';



const App = () => (
<div id="App">
    <NavigationBar />
    <Container className="mt-3">
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/films" element={<Films />} />
        <Route path="films/:id" element={<FilmDetails />} />
        <Route path="/people" element={<People />} />
        <Route path="people/:id" element={<PeopleDetails />} />
      </Routes>
    </Container>
    </div>
);

export default App;
