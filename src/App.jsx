import { useEffect, useState } from "react";

export default function App() {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://xcountries-backend.azurewebsites.net/all")
      .then((res) => {
        if (!res.ok) {
          throw new Error("API error");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Countries data:", data); // check keys here
        setCountries(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data: ", err);
        setError(err.message || "Something went wrong");
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div style={{ textAlign: "center", marginTop: "2rem" }}>Loading...</div>;
  }

  if (error) {
    return (
      <div style={{ color: "red", textAlign: "center", marginTop: "2rem" }}>
        {error}
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      {countries.map((country, index) => (
        <div
          key={country.cca3 || index}
          style={{
            width: "200px",
            border: "1px solid #ccc",
            borderRadius: "10px",
            margin: "10px",
            padding: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={country.flag || country.flags?.png || "https://via.placeholder.com/100"}
            alt={`Flag of ${country.name || country.name?.common || "unknown"}`}
            style={{ width: "100px", height: "100px" }}
          />
          <h2>{country.name || country.name?.common || "Unknown Country"}</h2>
        </div>
      ))}
    </div>
  );
}

