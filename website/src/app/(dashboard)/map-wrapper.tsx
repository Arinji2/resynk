"use client";

import dynamic from "next/dynamic";
import type { IncidentsRecord } from "../../../pocketbase-types";

const IndiaMap = dynamic(() => import("./map"), { ssr: false });

export default function IndiaMapWrapper({
  incidentsData,
}: {
  incidentsData: IncidentsRecord[];
}) {
  return <IndiaMap incidentsData={incidentsData} />;
}
