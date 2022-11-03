export async function useRequest(url) {
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  async function (method, body)  {
    try {
      setLoading(true);
      const res = await fetch(url, {
        method,
        body: body ? JSON.stringify(body) : undefined,
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    error,
    response,
    loading,
  };
}
