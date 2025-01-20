import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/movies");
  };
  return (
    <>
      <Container>
        <Row className="d-flex align-items-center" style={{ height: "60vh" }}>
          <Col className="d-flex flex-column align-items-center justify-content-center">
            <h1 className="text-center text-white">
              Welcome to our Movies Library
            </h1>
            <Button className="mt-4" onClick={handleNavigate}>
              View our Movies!
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
