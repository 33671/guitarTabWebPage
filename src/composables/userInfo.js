import { onMounted, ref, unref } from "vue";
import { getUserAvator } from "src/utils/avator";
import { getUserInfo } from "src/utils/user";
const finished = ref(false);
const userInfo = ref({});
const userAvator = ref({});
function useUserInfo({ user = "mine" }) {
  onMounted(async () => {
    userInfo.value = await getUserInfo(user);
    userAvator.value = await getUserAvator(userInfo.value.avator_id);
    finished.value = true;
  });
  return {
    userAvator,
    finished,
    userInfo,
  };
}

export default useUserInfo;
