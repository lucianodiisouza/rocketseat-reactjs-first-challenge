import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  function getRepositories() {
    api.get("repositories").then((res) => {
      setRepositories(res.data);
    });
  }

  useEffect(() => {
    getRepositories();
  }, []);

  async function handleAddRepository() {
    const res = await api.post("repositories", {
      title: `Projeto ${Date.now()}`,
      url: "https://github.com/lucianodiisouza/frontend",
      techs: ["ReactJs"],
    });

    const repository = res.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    setRepositories(repositories.filter((repository) => repository.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => {
          return (
            <li key={repository.id}>
              <a href={repository.url} target="_blank">
                {repository.title}
              </a>
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          );
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
