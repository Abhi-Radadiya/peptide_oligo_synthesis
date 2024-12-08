import { format } from "date-fns";

export const uploadData = (data) => {
    const uri = "https://script.google.com/macros/s/AKfycbxrpePlLfRfsSoE8dfVhF3ZsHBbKirkYEpXTwOs-G1bLpxUhMjhcDtMfWmLdcPBaBZHDA/exec";

    const formattedTime = format(new Date(), "dd MMM yyyy, HH:mm:ss:SSS");
};
