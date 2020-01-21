import React, { useState, useEffect } from "react";

const DevForm = ({ onSubmit }) => {
  const [github_username, setGithubUsername] = useState("");
  const [technologies, setTechnologies] = useState("");

  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
      },
      error => {
        console.log(error);
      },
      {
        timeout: 30000
      }
    );
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    await onSubmit({
      github_username,
      technologies,
      latitude,
      longitude
    });
    setGithubUsername("");
    setTechnologies("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-block">
        <label htmlFor="github_username">Usuário do Github</label>
        <input
          name="github_username"
          id="github_username"
          required
          value={github_username}
          onChange={event => setGithubUsername(event.target.value)}
        />
      </div>

      <div className="input-block">
        <label htmlFor="technologies">Tecnologias</label>
        <input
          name="technologies"
          id="technologies"
          required
          value={technologies}
          onChange={event => setTechnologies(event.target.value)}
        />
      </div>

      <div className="input-group">
        <div className="input-block">
          <label htmlFor="latitude">Latitude</label>
          <input
            onChange={event => setLatitude(event.target.value)}
            type="number"
            name="latitude"
            id="latitude"
            required
            value={latitude}
          />
        </div>

        <div className="input-block">
          <label htmlFor="longitude">Longitude</label>
          <input
            onChange={event => setLongitude(event.target.value)}
            type="number"
            name="longitude"
            id="longitude"
            required
            value={longitude}
          />
        </div>
      </div>
      <button type="submit">Salvar</button>
    </form>
  );
};

export default DevForm;
