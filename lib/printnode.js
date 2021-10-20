import dotenv from "dotenv";
dotenv.config();
import fetch from "node-fetch";
import { Headers } from "node-fetch";
let headers = new Headers();
const apiKey = process.env.API_KEY;
headers.set("Authorization", "Basic " + btoa(apiKey));

const printNode = {
  getComputers: async () => {
    const response = await fetch(`https://api.printnode.com/computers`, { headers: headers });
    const body = await response.json();
    return body;
  },
  getPrinters: async () => {
    const response = await fetch(`https://api.printnode.com/printers`, { headers: headers });
    const body = await response.json();
    return body;
  },
  getPastPrintjobs: async () => {
    const response = await fetch(`https://api.printnode.com/printjobs?dir=asc`, { headers: headers });
    const body = await response.json();
    return body;
  },
};

export default printNode;
