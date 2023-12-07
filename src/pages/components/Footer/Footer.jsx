import React from "react"
import { MDBIcon } from "mdb-react-ui-kit"
import { Container, Row, Col, Button } from "reactstrap"

const Footer = () => {
  const teamMembers = [
    {
      name: "Sanad Alshobaki",
      github: "https://github.com/Sanad-Alshobaki",
      linkedin: "https://www.linkedin.com/in/sanad-alshobaki/",
    },
    {
      name: "Ahmed Shalash",
      github: "https://github.com/mattshal1",
      linkedin: "https://www.linkedin.com/in/matt-shal/",
    },
    {
      name: "Yara Jaber",
      github: "https://github.com/YaraJaber",
      linkedin:
        "https://www.linkedin.com/in/yarajaber98?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
    },
    {
      name: "Yousef Abunameh",
      github: "https://github.com/Yousef-AN",
      linkedin: "https://www.linkedin.com/in/Yousef-Abunameh",
    },
  ]

  return (
    <footer className="bg-dark text-white p-2">
      <Container>
        <Row>
          {teamMembers.map((member, index) => (
            <Col key={index} md="3">
              <h5 style={{ color: "#e6b31e", fontWeight: "300" }}>
                {member.name}
              </h5>
              <Button
                color="link"
                className="fs-4"
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MDBIcon fab className="fa-linkedin" />
              </Button>
              <Button
                color="link"
                className=" fs-4"
                href={member.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MDBIcon fab className="fa-github" />
              </Button>
            </Col>
          ))}
        </Row>
      </Container>

      <div
        className="text-center text-light p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}
      >
        <p style={{ fontFamily: "Tahoma" }}>
          Credit to the team for their valuable contributions!
        </p>
      </div>
    </footer>
  )
}

export default Footer
