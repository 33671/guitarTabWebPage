import { ref, customRef } from "vue";
import { axios } from "boot/axios";
const searchText = ref("");
const searchScoreResult = ref([]);
const searchUserResult = ref([]);

const options = ref([]);
let last_input = "";
async function filterFn(val, update, abort) {
  if (val.trim() == last_input.trim() || val == "") abort();
  setTimeout(() => {
    if (val.trim() == last_input.trim()) abort();
    update(async () => {
      if (val.trim() === "") {
        options.value = [];
      } else {
        options.value = (
          await axios.get("/api/tabs_search/tips?s=" + searchText.value)
        ).data.map((x) => x["music_name"]);
        last_input = searchText.value;
      }
    });
  }, 500);
}

async function search(e) {
  const resScore = await axios.get("/api/tabs_search?s=" + searchText.value);
  searchScoreResult.value = resScore.data;
  const resUser = await axios.get("/api/user/search?s=" + searchText.value);
  searchUserResult.value = resUser.data;
  if (searchUserResult.value !== []) {
    for (let i in searchUserResult.value) {
      const avatarRes = await axios.get(
        "/api/user/" + searchUserResult.value[i].name
      );
      if (avatarRes.status === 200) {
        searchUserResult.value[i].avatar_id = await avatarRes.data.avator_id;
        avatarfinished.value = true;
      }
    }
  }
}
function useSearch() {
  return {
    options,
    searchScoreResult,
    searchUserResult,
    searchText,
    search,
    filterFn,
  };
}
export default useSearch;
