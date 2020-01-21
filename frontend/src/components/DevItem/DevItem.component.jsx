import React from "react";
import './DevItem.styles.css'

const DevItem = props => {
  const { dev } = props;
  return (
    <li className="dev-item">
      <header>
        <img src={dev.avatar_url} alt={dev.name} />
        <div className="user-info">
          <strong>{dev.name}</strong>
          <span>{dev.technologies.join(", ")}</span>
          <p>{dev.bio}</p>
          <a href={`https://github.com/${dev.github_username}`}>
            Acessar perfil no Github
          </a>
        </div>
      </header>
    </li>
  );
};

export default DevItem;
