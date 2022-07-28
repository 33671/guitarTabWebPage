import { ref } from "vue";
import { axios } from "boot/axios";
const searchText = ref("");
const searchResult = ref([]);

async function search(e) {
  const res = await axios.get("/api/tabs_search?s=" + searchText.value);
  searchResult.value = res.data;
}
function useSearch() {
  return {
    searchResult,
    searchText,
    search,
  };
}
export default useSearch;
