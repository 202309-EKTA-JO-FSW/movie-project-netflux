import React from "react"
import { Container, Row, Col, Button } from "reactstrap"

const HeroSection = () => {
  return (
    <div
      className={`hero-section text-white`}
      style={{
        backgroundImage: `url('/images/global-home-bg-comp.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "400px",
      }}
    >
      <Container>
        <Row>
          <Col md={6}>
            <h1 className="display-4">
              Welcome to <span style={{ color: "#e6b31e" }}>Netflux</span>
            </h1>
            <p className="lead">Where All Movies There</p>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default HeroSection
