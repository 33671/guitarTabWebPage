import { onMounted, ref, unref } from "vue";
import { axios } from "../boot/axios";
import indexdb from "../utils/indexdb";
const history = ref([]);
function useHistory() {
  onMounted(async () => {
    const data = await indexdb.get("history");
    if (data) {
      history.value = data.data;
    }
  });
  return {
    history,
    pushToHistory,
  };
}

async function pushToHistory(tab) {
  if (history.value[history.value.length - 1]._id == tab._id) return;
  history.value.push(tab);
  history.value = history.value.slice(-100);
  const data = unref(history);
  await indexdb.set("history", data);
}
export default useHistory;
