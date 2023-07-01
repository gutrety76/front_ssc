"use client";
import React, { useEffect, useState } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

export default function Overview() {
  const [data, setData] = useState([]); // Add state for data
  const [jan, setJan] = useState();
  const [feb, setFeb] = useState();
  const [march, setMarch] = useState();
  const [april, setApril] = useState();
  const [may, setMay] = useState();
  const [june, setJune] = useState();
  const [july, setJuly] = useState();
  const [august, setAugust] = useState();
  const [sept, setSept] = useState();
  const [oct, setOct] = useState();
  const [nov, setNov] = useState();
  const [dec, setDec] = useState();
  const fetchData = (start, end) => {
    fetch(
      `http://localhost:8000/api/statistics?start_date=${start}?end_date=${end}`
    );
  };
  useEffect(() => {
    fetch(
      "http://localhost:8000/api/statistics?start_date=2023-01-01&end_date=2023-12-31"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setData(data))
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  }, []);

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
