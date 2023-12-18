import React from 'react';
import '../styles/notStyle.css';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="not-found-container">
      {/* <aside><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/4424790/Mirror.png" alt="404 Image" />
      </aside> */}
      <main className="not-found-content">
        <h1>Sorry!</h1>
        <p>
          Recipe is not present in our menu<em>... try something different</em>
        </p>
        <button className="not-found-button" onClick={() => {navigate("/")}}>Go Home</button>
      </main>
    </div>
  );
}

export default NotFound;
