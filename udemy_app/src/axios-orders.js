import axios from "axios";

const instance = axios.create({
  baseURL: "https://unbronce-my-burger.firebaseio.com/"
});

export default instance;
