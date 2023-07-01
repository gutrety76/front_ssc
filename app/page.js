"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
export default function Home() {
  const [cards, setCards] = useState();
  const [authed, setAuthed] = useState(false);
  const [login, setLogin] = useState();
  const [password, setPassword] = useState();
  const fetch_cards = () => {
    axios
      .get("http://127.0.0.1:8000/api/getcards")
      .then((r) => {
        let sortedData = r.data.sort((a, b) => a.id_number - b.id_number);
        setCards(sortedData);
      })
      .then(() => {
        console.log(cards);
      });
  };
  useEffect(() => {
    fetch_cards();
  }, []);
  return (
    <>
      {authed && (
        <div className="h-[75px] md:p-5 bg-[#c6a282] w-full">
          <Link href="/admin">
            <div className="font-bold cursor-pointer bg text-2xl text-white">
              Статистика
            </div>
          </Link>
        </div>
      )}

      <main
        className={`gap-5   min-h-screen w-full ${
          authed
            ? "grid-cols-1 grid bg-[#c6a282]  md:grid-cols-4"
            : "flex flex-col bgauth items-center justify-center"
        } px-2 md:p-5`}
      >
        {!authed && (
          <>
            <div className=" flex flex-col items-center justify-center w-full">
              <div className="w-full md:w-[300px]">
                <Input
                  value={login}
                  onChange={(e) => {
                    setLogin(e.target.value);
                  }}
                  type="password"
                  placeholder="login"
                  className="text-2xl placeholder:text-[20px]"
                />
              </div>
              <div className=" mt-2 ring w-full md:w-[300px]">
                <Input
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  className="text-2xl  placeholder:text-[20px]"
                  type="password"
                  placeholder="password"
                />
              </div>
              <div className="mt-2 w-full md:w-[300px] ">
                <Button
                  onClick={() => {
                    if (password == "admin" && login == "admin") {
                      setAuthed(true);
                    }
                  }}
                  className="w-full bg-red-600 hover:bg-red-700"
                >
                  Войти
                </Button>
              </div>
            </div>
          </>
        )}
        {authed && (
          <>
            {cards &&
              Object.entries(cards).map(([key, value]) => {
                return (
                  <Card
                    className={`w-full select-none border-none  h-[550px] relative ${
                      value.registered ? "overlay-red" : "bg-red-700"
                    }`}
                    onClick={() => {
                      axios
                        .post(
                          `http://localhost:8000/api/${
                            value.registered ? "banuser" : "unbanuser"
                          }/${value.number}`
                        )
                        .then(() => fetch_cards());
                    }}
                    key={value.id_number}
                  >
                    {/* <CardHeader className="flex flex-col items-center justify-center w-full ">
                   
                  </CardHeader> */}
                    <CardContent className="bg-red flex flex-col items-center justify-between h-full text-7xl font-bold">
                      <Image
                        src={`/ava.png`}
                        className="mt-5 rounded-[360px]"
                        width={150}
                        height={300}
                      />

                      <div className="my-4">{value.id_number}</div>
                      <Image
                        src={`/fea.png`}
                        className=""
                        height={100}
                        width={200}
                      />
                    </CardContent>
                  </Card>
                );
              })}
          </>
        )}
      </main>
    </>
  );
}
