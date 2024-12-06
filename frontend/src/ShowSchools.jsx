import React, { useEffect, useState } from "react";
import axios from "axios";

const ShowSchools = () => {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    const fetchSchools = async () => {
      const response = await axios.get("http://localhost:5000/api/schools");
      setSchools(response.data);
    };
    fetchSchools();
  }, []);

  return (
    <div>
      <h1>Schools</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {schools.map((school) => (
          <div
            key={school.id}
            style={{ border: "1px solid", margin: "10px", padding: "10px" }}
          >
            <img
              src={`http://localhost:5000/schoolImages/${school.image}`}
              alt={school.name}
              style={{ width: "100px", height: "100px" }}
            />
            <h2>{school.name}</h2>
            <p>{school.address}</p>
            <p>{school.city}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowSchools;
