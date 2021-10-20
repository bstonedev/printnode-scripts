import dotenv from "dotenv";
dotenv.config();
import { createWriteStream } from "fs";
import { Transform } from "json2csv";
import { Readable } from "stream";
import printNode from "./lib/printnode.js";

const data = await printNode.getComputers();
console.log("data", data);

const input = new Readable({ objectMode: true });
input._read = () => {};

for (const computerRow of data) {
  input.push(computerRow);
}

const output = createWriteStream(`./data/allComputers-${process.env.ENV}.csv`, {
  encoding: "utf8",
});
const opts = {};
const transformOpts = { objectMode: true };
const json2csv = new Transform(opts, transformOpts);
input.pipe(json2csv).pipe(output);
