import axios from "axios";

// prettier-ignore
const HOME_URL = process.env.NEXT_PUBLIC_S3_URL
console.log(`HOME_URL`, HOME_URL);

export const getAllList = async () => {
  try {
    const res = await axios.get(HOME_URL + "/list.json");
    return res.data;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const getTerms = async (link) => {
  try {
    const res = await axios.get(link);
    return res.data;
  } catch (err) {
    console.error(err);
    return false;
  }
};
