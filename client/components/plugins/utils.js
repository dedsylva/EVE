
const axios = require('axios');
import { HOST } from '../../constants';
const baseURL= `http://${HOST}:3000`;

const openOTGView = () => {
  try {
    const res = await axios.get(`${baseURL}/`); 

    console.log(res.data.results) 

  if (res.status != 200) throw Error(res.status);

  } catch (err) {
    console.log(err);
  }

}

export default openOTGView;