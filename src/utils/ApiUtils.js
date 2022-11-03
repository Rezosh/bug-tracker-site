export async function sendRequest(url, method, body) {
  const response = await fetch(url, {
    method,
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.status !== 200) {
    const { message } = await response.json();
    throw new Error(message);
  }
  return response.json();
}
