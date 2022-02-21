import React, { useState, useEffect } from "react";
import { Link, BrowserRouter as Router, Route } from "react-router-dom";

console.clear();

const DarkMode = () => {
  let root = document.getElementById("root");
  let nav = document.getElementById("nav");
  let countryText = document.getElementsByClassName("country-text");
  let countries = document.getElementsByClassName("countries")

  if(nav.style.backgroundColor === "" || nav.style.backgroundColor === "white"){
    nav.style.backgroundColor = "rgb(43, 57, 69)";
    nav.style.boxShadow = "none";
    root.style.color = "white";
    root.style.backgroundColor = "rgb(51, 62, 72)";
  

  
    for (let ct = 0; ct < countryText.length; ct++){
      countryText[ct].style.color = "white";
      countryText[ct].style.backgroundColor = "rgb(43, 57, 69)";
      countries[ct].style.boxShadow = "none";
  }} else {
    nav.style.backgroundColor = "white";
    nav.style.boxShadow = "0px 0px 9px black";
    root.style.color = "black";
    root.style.backgroundColor = "white";
    
  
    for (let rt = 0; rt < countryText.length; rt++){
      countryText[rt].style.color = "black";
      countryText[rt].style.backgroundColor = "white";
      countries[rt].style.boxShadow = "0px 0px 9px black";
    }
}
  
}

const NavBar = () => {

  //<ion-icon name="moon-outline"></ion-icon>

  return (
    <nav id="nav">
      <h1>Where in the World?</h1>
      <h3 onClick={DarkMode}><ion-icon name="moon"></ion-icon>Dark Mode</h3>
      
    </nav>
  )
}

const CountryPage = ({ match }) => {
  const {
    params: { countryName },
  } = match;
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/name/${countryName}`, {})
      .then((res) => res.json())
      .then((response) => {
        setData(response);
        setIsLoading(false);
        console.log(response[0]["name"]["common"]);
      })
      .catch((error) => console.log(error));
  }, [countryName]);

  return (
    <>
      {!isLoading && (
        <>
        <div className = "cPage">
          <h1>Name: {data[0]["name"]["common"]}</h1>
          <h2>Region: {data[0]["region"]}</h2>
          <Link to="/">Back to homepage</Link>
          </div>
        </>
      )}
    </>
  );
};

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all", {})
      .then((res) => res.json())
      .then((response) => {
        setData(response);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  console.log(JSON.stringify(data));

  return (
    <>
      {!isLoading &&
        data.map((country) => {
          return <div className = "card" key={country["name"]["common"]}>
          <Link style={{ textDecoration: 'none' }} to={`/name/${country["name"]["common"]}`}><div className="countries">
                <img className="flag" alt="flag" src={country["flags"]["png"]} />
                <div className="country-text">                
                <h2 className="country">{country["name"]["common"]}</h2>
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
      <NavBar />
      <div id="main">
      <input id="search" placeholder="Search" />
      <Router>
        <Route exact path="/" component={HomePage} />
        <Route path="/name/:countryName" component={CountryPage} />
      </Router>
      </div>
    </>
  );
};

export default App;