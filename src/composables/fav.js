import { onMounted, ref, unref } from "vue";
import { axios } from "../boot/axios";
import { getUserInfo } from "src/utils/user";
const favs = ref([]);
const pageCount = ref(1);

const usefav = () => {
  onMounted(async () => {
    const info = await getUserInfo("mine");
    console.log(info);
    pageCount.value = Math.ceil(info.favourites_count / 2);
    axios.get(`/api/user/${info.name}/fav`).then((resp) => {
      if (resp.status === 200) {
        favs.value = resp.data;
      }
      console.log(resp.data);
    });
  });
  return {
    favs,
    pageCount,
    turnToPage,
    isInfav,
    removefav,
    addTofav,
  };
};
async function isInfav(tab_id) {
  const response = await axios.get(`/api/tabs_publish/${tab_id}/is_in_fav`);
  return response.status === 200;
}
async function addTofav(tab_id) {
  const response = await axios.post(`/api/tabs_publish/${tab_id}/fav`);
  return response.status === 200;
}
async function removefav(tab_id) {
  const response = await axios.delete(`/api/tabs_publish/${tab_id}/fav`);
  return response.status === 200;
}
async function turnToPage(num) {
  console.log("turnToPage: " + num);
  const name = (await getUserInfo()).name;
  const resp = await axios.get(`/api/user/${name}/fav?page=${num}`);
  if (resp.status === 200) {
    favs.value = resp.data;
  }
}

export default usefav;