import React, { useState, useEffect } from "react";
import { Link, BrowserRouter as Router, Route } from "react-router-dom";

console.clear();

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
        //console.log(response[0]["name"]);
      })
      .catch((error) => console.log(error));
  }, [countryName]);

  return (
    <>
      {!isLoading && (
        <>
          <h1>Name: {data[0]["name"]}</h1>
          <h2>Region: {data[0]["region"]}</h2>
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
          return <div className = "card" key={country.name}>
          <Link style={{ textDecoration: 'none' }} to={`/name/${country.name}`}><div className="countries">
                <img className="flag" src={country.flag} />
                <div className="country-text">                
                <h2 className="country">{country.name}</h2>
                <p className="population">Population:{country.population}</p>
                <p className="region">Region:{country.region}</p>
                <p className="capital">Capital:{country.capital}</p>
                </div>
            </div></Link>
          </div>;
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