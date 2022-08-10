import { onMounted, ref, unref } from "vue";
import { axios } from "../boot/axios";
import { getUserInfo } from "src/utils/user";
const favs = ref([]);
const pageCount = ref(1);

const usefav = () => {
  onMounted(async () => {
    axios.get("/api/user/mine").then(async (resp) => {
      pageCount.value = Math.ceil(resp.data.favourites_count / 2);
    });
    const name = (await getUserInfo()).name;
    axios.get(`/api/user/${name}/fav`).then((resp) => {
      if (resp.status === 200) {
        favs.value = resp.data;
      }
      console.log(resp.data);
    });
  });
  return {
    favs,
    pageCount,
    addToFav,
    turnToPage,
  };
};
async function turnToPage(num) {
  console.log("turnToPage: " + num);
  const name = (await getUserInfo()).name;
  const resp = await axios.get(`/api/user/${name}/fav?page=${num}`);
  if (resp.status === 200) {
    favs.value = resp.data;
  }
}
async function addToFav(tab_id, tabInfo) {
  const resp = await axios.push(`/api/tabs_publish/${tab_id}/fav`);
  if (resp.status === 200) {
    return true;
  }
  return false;
}
export default usefav;
