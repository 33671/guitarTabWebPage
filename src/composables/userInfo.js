import { onMounted, ref, unref } from "vue";
import { getUserInfo } from "src/utils/user";
const finished = ref(false);
const userInfo = ref({});
function useUserInfo({ user = "mine" }) {
  onMounted(async () => {
    userInfo.value = await getUserInfo(user);
    finished.value = true;
  });
  return {
    finished,
    userInfo,
  };
}

export default useUserInfo;
