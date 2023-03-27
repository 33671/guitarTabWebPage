import { axios } from "../boot/axios";
async function getUserInfo(user) {
  let info = null;
  if (info == null) {
    const resp = await axios.get(`/api/user/${user}`);
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
export { getUserInfo };
