import axios from "axios";

const apiUrl = "http://localhost:8080/api/";
const baseUrl =
  "https://dev-pb-apps.s3-eu-west-1.amazonaws.com/collection/CHhASmTpKjaHyAsSaauThRqMMjWanYkQ.json";

export const getFileList = async () => {
  try {
    const { data } = await axios.get(baseUrl);
    return data;
  } catch (error) {
    throw error;
  }
};

export const multipleFilesUpload = async (data, options) => {
  try {
    await axios.post(apiUrl + "multipleFiles", data, options);
  } catch (error) {
    throw error;
  }
};
export const getMultipleFiles = async () => {
  try {
    const { data } = await axios.get(apiUrl + "getMultipleFiles");
    return data;
  } catch (error) {
    throw error;
  }
};
