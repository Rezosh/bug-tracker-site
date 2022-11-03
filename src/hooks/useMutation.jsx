import { revalidateLiveQueries } from "../App";

export default function useMutation(key) {
  return async function (data) {
    await fetch(key, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    await revalidateLiveQueries();
    return { error: null };
  };
}
