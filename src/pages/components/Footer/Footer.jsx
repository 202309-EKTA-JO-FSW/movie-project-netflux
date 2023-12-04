import React from "react"

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
      linkedin: "https://www.linkedin.com/in/Yousef-Abunameh", // Update with the correct LinkedIn link when available
    },
    // Add other team members similarly
  ]

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
      <p>Credit to the team for their valuable contributions!</p>
    </footer>
  )
}

export default Footer
