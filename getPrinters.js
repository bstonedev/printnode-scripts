import dotenv from "dotenv";
dotenv.config();
import { createWriteStream } from "fs";
import { Transform } from "json2csv";
import { Readable } from "stream";
import printNode from "./lib/printnode.js";

const data = await printNode.getPrinters();
console.log("printers:", data);

const input = new Readable({ objectMode: true });
input._read = () => {};

for (const printer of data) {
  const printerRow = {
    name: printer.name,
    id: printer.id,
    description: printer.description,
    default: printer.default,
    state: printer.state,
    createTimestamp: printer.createTimestamp,
    computerName: printer.computer.name,
    computerHostname: printer.computer.hostname,
    computerState: printer.computer.state,
    computerId: printer.computer.id,
    color: printer.capabilities.color,
    supportsA4: printer.capabilities.papers.hasOwnProperty("A4"),
  };
  input.push(printerRow);
}

const output = createWriteStream(`./data/allPrinters-${process.env.ENV}.csv`, {
  encoding: "utf8",
});
const opts = {};
const transformOpts = { objectMode: true };
const json2csv = new Transform(opts, transformOpts);
input.pipe(json2csv).pipe(output);
