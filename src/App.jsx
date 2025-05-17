import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // ──────────────────────────── fetch once ────────────────────────────
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

  // ──────────────────────────── search filter ─────────────────────────
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filtered = countries.filter((country) =>
      country.name.common.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredCountries(filtered);
  };

  // ──────────────────────────── render ────────────────────────────────
  if (isLoading) return <div>Loading...</div>; // (keep exact wording)
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
          <div
            key={country.cca3 ?? country.name.common} // fallback key
            className="country-card"
          >
            <img
              src={country.flags.png || country.flags.svg}
              alt={`Flag of ${country.name.common}`}
              className="country-flag"
            />
            <h2 className="country-name">{country.name.common}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

