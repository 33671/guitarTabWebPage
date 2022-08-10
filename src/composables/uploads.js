import { onMounted, ref, unref } from "vue";
import { axios } from "../boot/axios";
import { getUserInfo } from "src/utils/user";
const uploads = ref([]);
const uploadPageCount = ref(1);
const user_name = ref("mine");
function useUploads({ user = "mine" }) {
  onMounted(async () => {
    if (user != "mine") {
      user = (await getUserInfo()).name;
    }
    user_name.value = user;
    axios.get(`/api/user/${user}/publishes`).then((resp) => {
      if (resp.status === 200) {
        uploads.value = resp.data;
        uploadPageCount.value = Math.ceil(
          parseInt(resp.headers["total-items"]) / 2
        );
        console.log(resp.data, uploadPageCount.value);
      }
    });
  });
  return {
    uploads,
    uploadPageCount,
    turnToUploadPage,
  };
}
async function turnToUploadPage(mile_stone) {
  console.log("turnToPage: " + mile_stone);
  const resp = await axios.get(
    `/api/user/${user_name.value}/publishes?mile_stone=${mile_stone}`
  );
  if (resp.status === 200) {
    uploads.value = resp.data;
  }
}
export default useUploads;
