let userAvator = null;
let imgUrl = null;

import { axios } from "../boot/axios";
async function getUserAvator(avatorID) {
  if (userAvator == null) {
    const resp = await axios.get(`/api/user/avator/${avatorID}`, {
      responseType: "blob",
    });
    if (resp.status === 200) {
      const reader = new FileReader();
      console.log(resp);
      reader.addEventListener(
        "load",
        function () {
          imgUrl = reader.result;
        },
        false
      );
      if (1) {
        reader.readAsDataURL(resp.data);
      }
      reader.onload = function (readRes) {
        imgUrl = readRes.target.result;
        // console.log(imgUrl);
      };
      return imgUrl;
    }
  } else {
    // return imgUrl;
  }
}
export { getUserAvator };
