let info = null;
import { axios } from "../boot/axios";
async function getUserInfo(user) {
  if (info == null) {
    const resp = await axios.get(`/api/user/${user}`);
    if (resp.status === 200) {
      info = resp.data;

      return info;
    }
  } else {
    return info;
  }
}
export { getUserInfo };
