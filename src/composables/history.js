import { reactive } from "vue";
import indexdb from "../utils/indexdb";
const history = reactive([]);
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
  if (
    historyData.length != 0 &&
    historyData[historyData.length - 1]._id == tab._id
  )
    return;
  historyData.push(tab);
  historyData = historyData.slice(-100);
  history = historyData;
  console.log(historyData);
  await indexdb.set("history", historyData);
}
export default useHistory;
