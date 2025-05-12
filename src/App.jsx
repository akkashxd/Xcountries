import { useEffect, useState } from "react";

export default function App() {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => {
        if (!res.ok) {
          throw new Error("API error");
        }
        return res.json();
      })
      .then((data) => {
        setCountries(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data: ", err);
        setError("Something went wrong");
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // ✅ must match exact test string
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={{
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh"
    }}>
      {countries.map((country) => (
        <div key={country.cca3} style={{
          width: "200px",
          border: "1px solid #ccc",
          borderRadius: "10px",
          margin: "10px",
          padding: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <img
            src={country.flags.png}
            alt={`Flag of ${country.name.common}`}
            style={{ width: "100px", height: "100px" }}
          />
          <h2>{country.name.common}</h2>
        </div>
      ))}
    </div>
  );
}
