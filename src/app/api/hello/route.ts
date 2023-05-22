import { NextResponse } from "next/server";
import data from "../../../lib/data";

interface DataProps {
  id: number;
  img: string;
  artist: string;
  desc: string;
  song: string;
  bg: string;
}

export async function GET() {
  const body: DataProps[] = data;
  return NextResponse.json(body);
}
