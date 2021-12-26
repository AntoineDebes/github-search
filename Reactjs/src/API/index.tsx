import Axios, { Method } from "axios";

interface ApiProps {
  method: Method;
  fetchApiUrl: string;
  data?: any;
  params?: any;
  tokenProp?: any;
}

function Api({ method, fetchApiUrl, data, params, tokenProp }: ApiProps) {
  const token = tokenProp || localStorage.getItem("Token") || "";

  return new Promise((res, rej) => {
    Axios({
      method, // Method like GET, POST, DELETE, PUT ...
      url: `${process.env.REACT_APP_API_URL}${fetchApiUrl}`,
      headers: {
        authorization: token, // sending the token for the verification
      },
      data, // data passed
      params,
      timeout: 30000,
    })
      .then((response) => {
        // console.log(response);
        res(response);
      })
      .catch((err) => {
        // console.log(err);
        rej(err);
      });
  });
}

export default Api;
