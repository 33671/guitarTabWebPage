import { ref, customRef } from "vue";
import { axios } from "boot/axios";
const searchText = ref("");
const searchResult = ref([]);

const stringOptions = ["Google", "Facebook", "Twitter", "Apple", "Oracle"];

const options = ref(stringOptions);
async function filterFn(val, update, abort) {
  // call abort() at any time if you can't retrieve data somehow

  setTimeout(() => {
    update(() => {
      if (val === "") {
        options.value = stringOptions;
      } else {
        const needle = val.toLowerCase();
        options.value = stringOptions.filter(
          (v) => v.toLowerCase().indexOf(needle) > -1
        );
      }
    });
  }, 1500);
}

async function search(e) {
  const res = await axios.get("/api/tabs_search?s=" + searchText.value);
  searchResult.value = res.data;
}
function useSearch() {
  return { options, searchResult, searchText, search, filterFn };
}
export default useSearch;
