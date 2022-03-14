import crypto from "crypto";

const encrypt = (key: string, str: string) => {
  var hmac = crypto.createHmac("sha512", key);
  var signed = hmac.update(str).digest("hex");
  return signed;
};

export { encrypt };
