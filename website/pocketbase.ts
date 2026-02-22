import PocketBase from "pocketbase";
import { TypedPocketBase } from "./pocketbase-types";

const pb = new PocketBase("https://db-aissms.arinji.com") as TypedPocketBase;

await pb
  .collection("_superusers")
  .authWithPassword(process.env.PB_EMAIL!, process.env.PB_PASS!);

export default pb;
