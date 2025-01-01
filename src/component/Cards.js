import React, { useState } from "react";
import { Col, Card } from "react-bootstrap";
import "../Styles/CardsStyle.css";
import { Link } from "react-router-dom";
import { usePayoutContext } from './Payoutcontext';

function Cards({ image, name, type, paragraph, title, url }) {
  const [isDisplay, setDisplay] = useState(false);

  const { handleCardClick } = usePayoutContext();

  const handleClick = () => {
    handleCardClick(name, url);
  };
  
  return (
    <Col sm={6} lg={4} xl={3} className="mb-0 card_col">
      
        <div onClick={handleClick}>
          <Card
            className="overflow-hidden card_image_dim"
            onMouseMove={() => setDisplay(true)}
            onMouseLeave={() => setDisplay(false)}
             // Trigger on click
          >
            <div className="overflow-hidden card_img_box" style={{ cursor: "pointer" }}>
              <Card.Img variant="top" src={image} />
            </div>
            <Card.Body>
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <p>{name}</p>
                </div>
                <div>
                  <h5>{type}</h5>
                </div>
              </div>
              <Card.Title className="mb-3" style={{ fontSize: "1rem" }}>
                {title}
              </Card.Title>
              <Card.Text className="mb-0" style={{ color: "#4f4f4f", fontSize: "0.8rem" }}>
                {paragraph}
              </Card.Text>
            </Card.Body>
          </Card>

          <div className={`perarticleprice ${isDisplay ? "display_price" : ""}`}>
            <p style={{ color: "white", fontWeight: "700", fontSize: "1rem" }} className="mb-0">
              Per Article Price
            </p>
            <p style={{ fontWeight: "800", fontSize: "3rem", color: "#fc9f32" }}>$&nbsp;10</p>
          </div>
        </div>
      
    </Col>
  );
}

export default Cards;
