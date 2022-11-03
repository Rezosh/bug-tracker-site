import { useEffect, useState } from "react";

export default function useFetch(url) {
  const [error, setError] = useState();
  const [data, setData] = useState();
  return async function (body) {
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ body }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (!res.ok) {
          setError(res.message);
          return;
        }
        setData(res);
      });

    return { error, data };
  };
}
