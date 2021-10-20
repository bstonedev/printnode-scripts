import dotenv from "dotenv";
dotenv.config();
import { createWriteStream } from "fs";
import { Transform } from "json2csv";
import { Readable } from "stream";
import printNode from "./lib/printnode.js";

const data = await printNode.getPastPrintjobs();
console.log("printers:", data);

const input = new Readable({ objectMode: true });
input._read = () => {};

for (const printJob of data) {
  console.log("printJob", printJob);
  const printerJobRow = {
    title: printJob.title,
    created: printJob.createTimestamp,
    contentType: printJob.contentType,
    jobState: printJob.state,
    source: printJob.source,
    printerName: printJob.printer.name,
    printerId: printJob.printer.id,
    printerDescription: printJob.printer.description,
    printerDefault: printJob.printer.default,
    printerState: printJob.printer.state,
    computerName: printJob.printer.computer.name,
    computerHostname: printJob.printer.computer.hostname,
    computerState: printJob.printer.computer.state,
    computerId: printJob.printer.computer.id,
    supportsColor: printJob.printer.capabilities.color,
    supportsA4: printJob.printer.capabilities.papers.hasOwnProperty("A4"),
  };
  input.push(printerJobRow);
}

const output = createWriteStream(`./data/pastPrintJobs-${process.env.ENV}.csv`, {
  encoding: "utf8",
});
const opts = {};
const transformOpts = { objectMode: true };
const json2csv = new Transform(opts, transformOpts);
input.pipe(json2csv).pipe(output);
