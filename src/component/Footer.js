import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from 'react-router-dom';
import "../Styles/FooterStyle.css";
// import "../Styles/HomeStyle.css";
function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const scrolldown = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  const listenToScroll = () => {
    let heightToHidden = 250;
    const windowScroll =
      document.body.scrollTop || document.documentElement.scrollTop;

    windowScroll > heightToHidden ? setIsVisible(true) : setIsVisible(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", listenToScroll);
  });
  return (
   
    
    <div>
      <footer className="footer_section">
        <Container>
          <Row className="copy_right">
            <Col >
              <div className='d-flex  justify-content-center text-center'>
                <ul className="list-unstyled">
                  <li>

                    <Link to="/" className=" text-nowrap">
                      © 2024 <span>COPYRIGHT</span>. All Rights Reserved
                    </Link>
                  </li>
                  <li>
                    <Link to="/" >About Us</Link>
                  </li>
                  <li>
                    <Link to="/" >Terms Of Use</Link>
                  </li>
                  <li >
                    <Link to="/" >Privacy Policy</Link>
                  </li>

                </ul>

              </div>
            </Col>
          </Row>
        </Container>

      </footer>

       {/* Sroll To Top */}
       {isVisible && (
        <div className="scroll_top" onClick={scrollTop}>
          <i class="bi bi-arrow-up"></i>
        </div>
      )}
             {/* Sroll To down*/}
           
              <div className="scroll_down" onClick={scrolldown}>
                <i class="bi bi-arrow-down"></i>
              </div>
            
  

    </div>
  )
}

export default Footer