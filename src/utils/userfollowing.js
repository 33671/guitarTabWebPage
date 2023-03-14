let info = null;
import { axios } from "../boot/axios";
async function getUserFollowing(user) {
  if (info == null) {
    const resp = await axios.get(`/api/user/${user}/fo`);
    if (resp.status === 200) {
      info = resp.data;
      return info;
    }
    console.log("failed to get userinfo");
    return null;
  } else {
    return info;
  }
}
export { getUserFollowing };
