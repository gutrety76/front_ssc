"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  const [cards, setCards] = useState();
  const fetch_cards = () => {
    fetch("http://127.0.0.1:8000/api/getcards")
      .then((r) => r.json())
      .then((r) => setCards(r));
  };
  useEffect(() => {
    // fetch_cards();
    axios
      .get("http://127.0.0.1:8000/api/getcards")
      .then((r) => setCards(r.data));
  }, []);
  return (
    <main className=" min-h-screen w-full grid grid-cols-3 px-2 md:px-0">
      {cards &&
        Object.entries(cards).map(([key, value]) => {
          console.log(value);
          return (
            <Card key={value.id}>
              <CardContent>{value.id_number}</CardContent>
            </Card>
          );
        })}
    </main>
  );
}
