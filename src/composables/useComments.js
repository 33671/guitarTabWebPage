import { onMounted, ref, unref } from "vue";
import { axios } from "../boot/axios";
import indexdb from "../utils/indexdb";
const comments = ref([]);
const currentCommentPage = ref(1);
let totalItemCount = 0;
const totalPageNum = ref(0);
const useComments = (tab_id) => {
  function getCommments() {
    axios.get(`/api/tabs_publish/${tab_id}/comment`).then((response) => {
      if (response.status == 200) {
        console.log(response.data);
        totalItemCount = Number(response.headers["total-items"]);
        totalPageNum.value = Math.ceil(totalItemCount / 10);
        currentCommentPage.value = 1;
        comments.value = response.data;
      }
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
        let showCommentPage = Math.ceil((totalItemCount + 1) / 10); //翻到最后一页
        turnToPage(showCommentPage);
        return true;
      }
      return false;
    });
  }
  async function turnToPage(num) {
    axios
      .get(`/api/tabs_publish/${tab_id}/comment?page=${num}`)
      .then((response) => {
        if (response.status == 200) {
          console.log(response.data);
          comments.value = response.data;
          currentCommentPage.value = num;
        }
        // pageCount.value = Math.ceil(response.favourites_count / 2);
      });
  }
  getCommments();
  return {
    turnToPage,
    sendComment,
    comments,
    currentCommentPage,
    totalPageNum,
  };
};
export default useComments;
