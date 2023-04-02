import { axios } from "../boot/axios";
async function getUserInfo(user) {
  let info = null;
  if (info == null) {
    const resp = await axios.get(`/api/user/${user}`);
    if (resp.status === 200) {
      info = resp.data;
      if (resp.data.reserve_field == undefined) {
        info.reserve_field = {
          social: { bilibili: "", netease: "", wechat: "", qq: "" },
          location: "",
          musicChoice: "吉他",
          description: "",
          banner_id: "d12cf1a3-df95-4b4b-9488-9243cb5dfd99",
        };
      }
      return info;
    }
    console.log("failed to get userinfo");
    return null;
  } else {
    return info;
  }
}
export { getUserInfo };
