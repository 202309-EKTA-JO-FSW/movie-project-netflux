import React from "react";
import { Container, Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const teamMembers = [
  {
    name: "Sanad Alshobaki",
    github: "https://github.com/Sanad-Alshobaki",
    linkedin: "https://www.linkedin.com/in/sanad-alshobaki/"
  },
  {
    name: "Ahmed Shalash",
    github: "https://github.com/mattshal1",
    linkedin: "https://www.linkedin.com/in/matt-shal/"
  },
  {
    name: "Yara Jaber",
    github: "https://github.com/YaraJaber",
    linkedin: "https://www.linkedin.com/in/yarajaber98?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
  },
  {
    name: "Yousef Abunameh",
    github: "https://github.com/Yousef-AN",
    linkedin: "https://www.linkedin.com/in/Yousef-Abunameh"
  }
  // Add other team members similarly
];

const Footer = () => {
  const iconStyles = {
    color: "#FF5700", // Example color for GitHub icon
    marginRight: "5px", // Adjust spacing as needed
    fontSize: "24px", // Adjust size as needed
  };

  return (
    <footer className="bg-dark text-light py-5">
      <Container>
        <h3 className="mb-4">Team Members</h3>
        {teamMembers.map((member, index) => (
          <Row key={index} className="mb-3">
            <Col xs={12} md={6}>
              <h5>{member.name}</h5>
              <p>
                <strong>Github:</strong>{" "}
                <a href={member.github} className="text-light" target="_blank" rel="noopener noreferrer">{member.github}</a>
              </p>
              <p>
                <strong>LinkedIn:</strong>{" "}
                <a href={member.linkedin} className="text-light" target="_blank" rel="noopener noreferrer">{member.linkedin}</a>
              </p>
            </Col>
            <Col xs={12} md={6} className="d-flex align-items-center justify-content-md-end">
              <FontAwesomeIcon icon={faGithub} style={iconStyles} />
              <a href={member.github} className="text-light" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              <span className="mx-3">|</span>
              <FontAwesomeIcon icon={faLinkedin} style={iconStyles} />
              <a href={member.linkedin} className="text-light" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </Col>
          </Row>
        ))}
      </Container>
      <p className="text-muted text-center mt-4">Credit to the team for their valuable contributions!</p>
    </footer>
  );
};

export default Footer;