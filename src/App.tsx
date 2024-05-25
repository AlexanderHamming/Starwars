import './assets/app.scss'
import Home from "./pages/Home";
import Films from "./pages/Films";
import People from './pages/People';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import NavigationBar from "./components/navbar"


const App = () => (
<div id="App">
    <NavigationBar />
    <Container className="mt-3">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/films" element={<Films />} />
        <Route path="/people" element={<People />} />
      </Routes>
    </Container>
    </div>
);

export default App;
