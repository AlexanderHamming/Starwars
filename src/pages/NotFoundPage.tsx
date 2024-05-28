import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const NotFoundPage = () => {
  return (
    <div className="text-center">
      <h1>Could not find that page</h1>
      <iframe
        src="https://giphy.com/embed/jd6TVgsph6w7e"
        width="480"
        height="270"
        className="giphy-embed"
        allowFullScreen
        title="Not Found"
      ></iframe>
      <div className="mt-3">
        <Link to="/">
          <Button variant="primary">Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
