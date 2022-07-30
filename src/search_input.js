import { ref, customRef } from "vue";
import { axios } from "boot/axios";
const searchText = ref("");
const searchResult = ref([]);

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
  const res = await axios.get("/api/tabs_search?s=" + searchText.value);
  searchResult.value = res.data;
}
function useSearch() {
  return { options, searchResult, searchText, search, filterFn };
}
export default useSearch;
