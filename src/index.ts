import "dotenv/config";
import qs from "qs";
import axios from "axios";
import { encrypt } from "./utils/sign";

const API_URL = "https://www.coinpayments.net/api.php";
// const cmd = `currency=BTC&version=1&cmd=get_callback_address&key=${process.env.API_PUB_KEY}&format=json`;
const cmd = `version=1&key=${process.env.API_PUB_KEY}&cmd=get_basic_info`;
console.log(cmd);
const signature = encrypt(process.env.API_PRIV_KEY!, cmd);
console.log(signature);

const main = async () => {
  try {
    const res = await axios.post(`${API_URL}`, qs.stringify(qs.parse(cmd)), {
      headers: {
        HMAC: signature,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    console.log(res.data);
  } catch (error) {
    // console.log("Something went wrong");
    console.log(error);
  }
};

main();
