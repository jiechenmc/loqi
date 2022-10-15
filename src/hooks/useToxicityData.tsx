import { useEffect, useState } from "react";

// kinda buggy rn
// aim to replace the home page fetch request with this hook
// async hooks baby

interface ToxicityResponse {
  source: string;
  toxicity: number;
}

interface Payload {
  message: string;
}

const useToxicityData = (payload: Payload): ToxicityResponse => {
  const [data, setData] = useState<ToxicityResponse>({
    source: "",
    toxicity: 0,
  });

  useEffect(() => {
    if (payload.message !== "") {
      const aux = async () => {
        const resp = await fetch("/api/toxicity", {
          headers: { "Content-Type": "application/json" },
          method: "POST",
          body: JSON.stringify(payload),
        });
        const d = await resp.json();
        setData(d);
      };
      aux();
    }
  }, []);

  console.log(data);
  return data;
};

export default useToxicityData;
