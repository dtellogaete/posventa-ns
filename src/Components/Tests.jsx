import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Test= () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost/api/')
      .then(response => {
        setData(response.data.items);
      })
      .catch(error => {
        setError(error);
      });
  }, []);

  if (error) {
    return <div>An error has occurred: {error.message}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  console.log(data.items)

  return (
    <div>
      {data.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
};

export default Test;