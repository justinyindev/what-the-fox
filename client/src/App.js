import React, { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState({});

  useEffect(() => {
    fetch("/api/headlines")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  useEffect(() => {
    console.log({data})
  }, [data])

  return <div>Hello</div>;
}

export default App;
