import { useEffect, useState } from "react";
import "./App.css";          // ⬅️  import the stylesheet

export default function App() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(
      "https://countries-search-data-prod-812920491762.asia-south1.run.app/countries"
    )
      .then((res) => {
        if (!res.ok) throw new Error("API error");
        return res.json();
      })
      .then((data) => {
        setCountries(data);
        setFilteredCountries(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Something went wrong");
        setIsLoading(false);
      });
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    setFilteredCountries(
      countries.filter((c) =>
        c.name.toLowerCase().includes(term.toLowerCase())
      )
    );
  };

  if (isLoading) return <div>Loading...</div>;   // ✅ keep exact text
  if (error)     return <div>{error}</div>;

  return (
    <div className="app">
      <input
        type="text"
        className="search-bar"
        placeholder="Search for a country"
        value={searchTerm}
        onChange={handleSearch}
      />

      <div className="country-grid">
        {filteredCountries.map((country) => (
          <div key={country.name} className="country-card">
            <img
              src={country.flag}
              alt={`Flag of ${country.name}`}
              className="country-flag"
            />
            <h2 className="country-name">{country.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
