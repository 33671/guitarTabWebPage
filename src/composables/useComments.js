import { onMounted, ref, unref } from "vue";
import { axios } from "../boot/axios";
import indexdb from "../utils/indexdb";
const comments = ref([]);
const pageCount = ref(1);
const useComments = (tab_id) => {
  function getCommments() {
    axios.get(`/api/tabs_publish/${tab_id}/comment`).then((response) => {
      if (response.status == 200) {
        console.log(response.data);
        comments.value = response.data;
      }
      // pageCount.value = Math.ceil(response.favourites_count / 2);
    });
  }
  async function sendComment(text) {
    if (text.trim().length == 0) {
      return false;
    }
    let data = new FormData();
    data.append("text", text);
    axios.post(`/api/tabs_publish/${tab_id}/comment`, data).then((response) => {
      if (response.status === 200) {
        console.log(response);
        getCommments();
        return true;
      }
      return false;
    });
  }
  getCommments();
  return {
    sendComment,
    comments,
    pageCount,
  };
};
export default useComments;
