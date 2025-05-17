import { useEffect, useState } from "react";

export default function App() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://countries-search-data-prod-812920491762.asia-south1.run.app/countries")
      .then((res) => {
        if (!res.ok) {
          throw new Error("API error");
        }
        return res.json();
      })
      .then((data) => {
        setCountries(data);
        setFilteredCountries(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data: ", err);
        setError("Something went wrong");
        setIsLoading(false);
      });
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    const filtered = countries.filter((country) =>
      country.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredCountries(filtered);
  };

  if (isLoading) {
    return <div>Loading...</div>; // must match exact test string
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={{ padding: "20px", backgroundColor: "#1c2938", minHeight: "100vh", color: "white" }}>
      <input
        type="text"
        placeholder="Search for a country"
        value={searchTerm}
        onChange={handleSearch}
        style={{
          display: "block",
          margin: "0 auto 20px auto",
          padding: "10px",
          width: "300px",
          borderRadius: "5px",
          border: "1px solid #ccc"
        }}
      />
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center"
      }}>
        {filteredCountries.map((country) => (
          <div key={country.name} style={{
            width: "200px",
            border: "1px solid #ccc",
            borderRadius: "10px",
            margin: "10px",
            padding: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
            color: "black"
          }}>
            <img
              src={country.flag}
              alt={`Flag of ${country.name}`}
              style={{ width: "100px", height: "100px" }}
            />
            <h2>{country.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
