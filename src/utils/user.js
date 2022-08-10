import indexdb from "../utils/indexdb";

async function getUserInfo() {
  const userInfo = (await indexdb.get("userInfo")).data;
  return userInfo;
}
export { getUserInfo };
