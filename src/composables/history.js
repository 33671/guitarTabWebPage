import { ref } from "vue";
import indexdb from "../utils/indexdb";
let history = ref([]);
let historyData = [];
function useHistory() {
  indexdb.get("history").then((data) => {
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
  setTimeout(async () => {
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
  }, 2000);
}
export default useHistory;
