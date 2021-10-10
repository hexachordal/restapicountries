import React, { useState, useEffect } from "react";
import { Link, BrowserRouter as Router, Route } from "react-router-dom";


const CountryPage = ({ match }) => {
  const {
    params: { countryName },
  } = match;
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    fetch(`https://restcountries.com/v2/name/${countryName}`, {})
      .then((res) => res.json())
      .then((response) => {
        setData(response);
        setIsLoading(false);
        console.log(`https://restcountries.com/v2/name/${countryName}`);
      })
      .catch((error) => console.log(error));
  }, [countryName]);

  return (
    <>
      {!isLoading && (
        <>
          <h1>Name: {data.name}</h1>
          <h2>Region: {data.region}</h2>
          <Link to="/">Back to homepage</Link>
        </>
      )}
    </>
  );
};

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    fetch("https://restcountries.com/v2/all", {})
      .then((res) => res.json())
      .then((response) => {
        setData(response);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
    
      {!isLoading &&
        data.map((country) => {
          return <h5 key={country.name}>
          <Link to={`/name/${country.name}`}>{country.name}'s Page</Link>
          </h5>;
        })}
    </>
  );
};

const App = () => {
  return (
    <>
      <Router>
        <Route exact path="/" component={HomePage} />
        <Route path="/name/:countryName" component={CountryPage} />
      </Router>
    </>
  );
};

export default App;