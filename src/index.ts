import "dotenv/config";
import qs from "qs";
import axios from "axios";
import { encrypt } from "./utils/sign";

const API_URL = "https://www.coinpayments.net/api.php";
// const cmd = `currency=BTC&version=1&cmd=get_callback_address&key=${process.env.API_PUB_KEY}&format=json`;
// get_basic_info
// rates
// get_callback_address
const cmd = {
  version: 1,
  key: process.env.API_PUB_KEY,
  cmd: "get_callback_address",
  currency: "LTCT",
  ipn_url: "https://coinpayments-poc.herokuapp.com/",
};

// const cmd = {
//   version: 1,
//   key: process.env.API_PUB_KEY,
//   cmd: "get_tx_ids",
//   all: 1,
// };

// const cmd = {
//   version: 1,
//   key: process.env.API_PUB_KEY,
//   cmd: "get_tx_info",
//   txid: "861af772db68c73155c98881019590d07aa8ce8b622c0c27d82db518da1b5410",
//   full: 1,
// };

const cmdString = qs.stringify(cmd);
// `version=1&key=${process.env.API_PUB_KEY}&cmd=get_basic_info`;
console.log(cmd);
const signature = encrypt(process.env.API_PRIV_KEY!, cmdString);

const main = async () => {
  try {
    const res = await axios.post(`${API_URL}`, cmdString, {
      headers: {
        HMAC: signature,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    if (res.data.error === "ok") {
      //   console.log(Object.keys(res.data.result));
      //   Object.keys()
      console.log(res.data);
    } else {
      console.log(res.data.error);
    }
  } catch (error) {
    // console.log("Something went wrong");
    console.log(error);
  }
};

main();
