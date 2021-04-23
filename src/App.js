import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [language, setLanguage] = useState("All");

  useEffect(() => {
    async function fetchData(language) {
      const body = await fetch(
        "https://api.github.com/search/repositories?q=stars:%3E10000&sort=stars"
      );
      const json = await body.json();
      if (language !== "All") {
        let filterData = json.items.filter((languageFilter) => {
          return languageFilter.language === language;
        });
        setData(filterData);
      } else {
        setData(json.items);
      }
    }
    fetchData(language);
  }, [language]);

  return (
    <div className="App">
      <div className="container">
        <nav>
          <ul>
            <li onClick={() => setLanguage("All")}>All</li>
            <li onClick={() => setLanguage("JavaScript")}>JavaScript</li>
            <li onClick={() => setLanguage("TypeScript")}>TypeScript</li>
            <li onClick={() => setLanguage("Java")}>Java</li>
            <li onClick={() => setLanguage("C++")}>C++</li>
            <li onClick={() => setLanguage("Python")}>Python</li>
          </ul>
        </nav>
        {data.map((item, i) => {
          return (
            <div className="item">
              <p className="number">#{i + 1}</p>
              <img
                className="profile-img"
                alt={item.name}
                src={item.owner.avatar_url}
              />
              <p className="name">{item.name}</p>
              <p className="login">{item.owner.login}</p>
              <p>{item.language}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
