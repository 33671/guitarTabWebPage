import { onMounted, ref, unref } from "vue";
import { axios } from "../boot/axios";
import indexdb from "../utils/indexdb";
window.indexdb = indexdb;
const history = ref([]);
let historyData = [];
function useHistory() {
  onMounted(async () => {
    const data = await indexdb.get("history");
    if (data) {
      historyData = data.data;
      history.value = data.data;
    }
  });
  return {
    history,
    pushToHistory,
  };
}

async function pushToHistory(tab) {
  if (
    historyData.length != 0 &&
    historyData[historyData.length - 1]._id == tab._id
  )
    return;
  historyData.push(tab);
  historyData = historyData.slice(-100);
  history.value = historyData;
  console.log(historyData);
  await indexdb.set("history", historyData);
}
export default useHistory;
