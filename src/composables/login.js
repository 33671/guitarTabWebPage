import { axios } from "src/boot/axios";
import { ref } from "vue";
import indexdb from "../utils/indexdb";
const loginStatus = ref(false);

(async () => {
  const status = await axios.get("/api/login_status");
  loginStatus.value = status.status == 200;
})();

async function userlogin(name, password) {
  var loginform = new FormData();
  loginform.append("name", name);
  loginform.append("password", password);
  loginform.append("captcha", "111");
  const aa = await axios.post("/api/login", loginform);
  if (aa.status == 200) {
    loginStatus.value == true;
    await indexdb.set("userInfo", aa.data);
  }
  console.log(aa.data);
}
async function userreg(name, useremail, password) {
  var regform = new FormData();
  regform.append("name", name);
  regform.append("email", useremail);
  regform.append("password", password);
  regform.append("captcha", "111");
  const aa = await axios.post("/api/register", regform);
  console.log(aa);
}
async function logout() {
  await axios.get("/api/logout");
}

export { userlogin, logout, userreg, loginStatus };
