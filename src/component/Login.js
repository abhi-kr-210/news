import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { Col, Container, Row, Form } from 'react-bootstrap';
import "../Styles/LoginStyle.css";
import img1 from "../assets/brandlogo1.png";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [show, setShow] = useState(true);

  const navigate = useNavigate(); // Initialize useNavigate hook
  const handleLogin = async (e) => {
    e.preventDefault();
    let formErrors = {};
    
    if (!email) {
      formErrors.email = 'Email is required';
    }

    if (!password) {
      formErrors.password = 'Password is required';
    }

    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      toast.success('Login Successful', {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      
      // Navigate to Home page after successful login
      navigate('/home'); // Replace '/home' with the actual path to your Home.js page
    }
  };

  return (
    <section className='login_section'>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <header className='login_section_header'>
        <Link to="/">
          <img src={img1} className="img-fluid" style={{ maxWidth: "200px", maxHeight: "85px", padding: "10px" }} alt="Hero" />
        </Link>
      </header>

      <Container className='login_container'>
        <Row className='login_container_row '>
          <Col lg={{ span: 8, offset: 2 }}>
            <div className='text-center mb-0' style={{ background: "white", padding: "8px 40px", display: "inline-block", borderTop: "5px solid rgb(45 75 69)" }}>
              <h4 style={{ fontFamily: "Open Sans" }}>Login</h4>
            </div>

            <div className='login_container_col'>
              <Form className='login_form' style={{ padding: "30px 50px", maxWidth: "420px" }} onSubmit={handleLogin}>

                {errors.message && <div style={{ color: 'red' }}>{errors.message}!</div>}       

                <div className='line d-flex justify-content-center align-items-center' style={{ fontWeight: 500 }}>
                  <span></span> &nbsp;&nbsp;&nbsp;&nbsp;
                  <span></span>
                </div>
                <Form.Group className="mb-4 mt-3" controlId="exampleForm.ControlInput1">
                  <Form.Label style={{ fontWeight: 500 }}>Email : <span style={{ color: "grey" }}>*</span></Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="example@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors.email && <div style={{ color: 'red' }}>{errors.email}!</div>}
                </Form.Group>
                <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
                  <div className='d-flex justify-content-between align-items-center'>
                    <Form.Label style={{ fontWeight: 500 }}>Password : <span style={{ color: "grey" }}>*</span></Form.Label>
                    {show && <div style={{ cursor: "pointer", color: "#2079c3" }} onClick={() => setShow(!show)}>
                      <i className="bi bi-eye-fill"></i>Show 
                    </div>}
                    {show === false && <div style={{ cursor: "pointer", color: "#2079c3" }} onClick={() => setShow(!show)}>
                      <i className="bi bi-eye-slash-fill"></i>Hide
                    </div>}
                  </div>
                  <Form.Control
                    type={show ? "password" : "text"}
                    placeholder=""
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {errors.password && <div style={{ color: 'red' }}>{errors.password}!</div>}
                </Form.Group>

                <div className='mt-4'>
                  <button type="submit" className='btn btn-primary btn-block' style={{ padding: "9px 30px", borderRadius: "2px" }}>Login</button>
                </div>

                <div className='mt-3'>
                  <p>Don't have an account ?</p>
                  <div><Link to="/signupuser">SignUp as User</Link></div>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Login;
