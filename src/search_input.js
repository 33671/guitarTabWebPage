import { ref, customRef } from "vue";
import { axios } from "boot/axios";
const searchText = ref("");
const searchResult = ref([]);

const options = ref([]);
let last_input = "";
async function filterFn(val, update, abort) {
  // call abort() at any time if you can't retrieve data somehow
  setTimeout(() => {
    if (searchText.value == last_input) return;
    update(async () => {
      if (val === "") {
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
