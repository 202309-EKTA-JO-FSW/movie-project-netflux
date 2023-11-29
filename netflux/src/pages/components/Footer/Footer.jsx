import React from 'react';

const Footer = () => {
  const teamMembers = [
    {
      name: 'Sanad Alshobaki',
      github: 'https://github.com/Sanad-Alshobaki',
      linkedin: 'https://www.linkedin.com/in/sanad-alshobaki/',
    },
    {
      name: 'Ahmed Shalash',
      github: 'https://github.com/mattshal1',
      linkedin: 'https://www.linkedin.com/in/matt-shal/',
    },
    {
      name: 'Yara Jaber',
      github: 'https://github.com/YaraJaber',
      linkedin: 'https://www.linkedin.com/in/yarajaber98/',
    },
    {
      name: 'Yousef Abunameh',
      github: 'https://github.com/Yousef-AN',
      linkedin: 'https://www.linkedin.com/in/Yousef-Abunameh/',
    },
  ];

  return (
    <footer>
      <div>
        <h3>Team Members</h3>
        <ul>
          {teamMembers.map((member, index) => (
            <li key={index}>
              <p>Name: {member.name}</p>
              <p>
                Github: <a href={member.github}>{member.github}</a>
              </p>
              <p>
                LinkedIn: <a href={member.linkedin}>{member.linkedin}</a>
              </p>
            </li>
          ))}
        </ul>
      </div>
      <p>Credit Goes to : Yousef Abunameh, Yara Jaber, Sanad Alshobaki, Ahmed Shalash  </p>
    </footer>
  );
};

export default Footer;
