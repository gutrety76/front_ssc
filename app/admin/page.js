"use client";
import Image from "next/image";
import Link from "next/link";
import Overview from "@/components/statistic";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
export default function Home() {
  const [data, setData] = useState();
  const [failed, setFailed] = useState(0);
  const [succed, setSucced] = useState(0);
  function formatTimestamp(timestamp) {
    let date = new Date(timestamp);

    let year = date.getUTCFullYear();
    let month = String(date.getUTCMonth() + 1).padStart(2, "0");
    let day = String(date.getUTCDate()).padStart(2, "0");
    let hour = String(date.getUTCHours()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }
  useEffect(() => {
    axios
      .get(
        "http://127.0.0.1:8000/api/statistics?start_date=2023-01-01&end_date=2023-12-31"
      )
      .then((response) => {
        setData(response.data);
        let succedCount = 0;
        let failedCount = 0;
        response.data.forEach((element) => {
          if (element.att_suc === true) {
            succedCount++;
          } else {
            failedCount++;
          }
        });
        console.log(data);
        setSucced(succedCount);
        setFailed(failedCount);
      });
  }, []);
  return (
    <>
      <div className="h-[75px] md:p-3 bg-[#c6a282] ">
        <Link href="/">
          <div className="font-bold rounded-md  md:p-2 cursor-pointer  text-2xl text-white">
            Панель управления
          </div>
        </Link>
      </div>
      <main className="grid grid-cols-1 place-content-center md:grid-cols-3 grid-rows-2 min-h-screen bg-[#c6a282] w-full flex-col ">
        <div className="col-start-1 col-end-2 row-start-1 w-full h-full flex items-center justify-center row-end-1">
          <Image
            src={`/fa.png`}
            className="rounded-[360px]"
            width={1000}
            height={200}
          />
        </div>
        <div className="col-start-2 gap-5 place-content-center grid grid-cols-1 md:grid-cols-3 md:grid-rows-1 col-end-4 row-start-1 row-end-2 ">
          <Card>
            <CardHeader className="text-2xl font-bold">
              Всего запросов:
            </CardHeader>
            <CardContent className="flex items-center justify-center">
              <Image src={`/eye.png`} width={60} height={50} />{" "}
              <span className="text-4xl ml-4 font-bold">
                {" "}
                {data && data.length}
              </span>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="text-2xl font-bold">
              Успешных входов:
            </CardHeader>
            <CardContent className="flex items-center justify-center">
              <Image src={`/eye.png`} width={60} height={50} />{" "}
              <span className="text-4xl ml-4 font-bold">
                {" "}
                {succed && succed}
              </span>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="text-2xl font-bold">
              Неуспешных входов:
            </CardHeader>
            <CardContent className="flex items-center justify-center">
              <Image src={`/eye.png`} width={60} height={50} />{" "}
              <span className="text-4xl ml-4 font-bold">
                {" "}
                {failed && failed}
              </span>
            </CardContent>
          </Card>
          <Card className="col-start-1  col-end-4 row-start-2 row-end-3 ">
            <Table className="my-0.5 p-1">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ФИО</TableHead>
                  <TableHead>Время</TableHead>

                  <TableHead className="text-right">Статус</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data &&
                  Object.entries(data).map((index, val) => {
                    console.log(val, index);
                    return (
                      <TableRow key={val}>
                        <TableCell>{index[1].name}</TableCell>
                        <TableCell>
                          {formatTimestamp(index[1].timestamp)}
                        </TableCell>

                        <TableCell>
                          {index[1].att_suc ? (
                            <span>Успешно</span>
                          ) : (
                            <span>Не успешно</span>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </Card>
        </div>
      </main>
    </>
  );
}
