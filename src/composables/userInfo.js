import { onMounted, ref, unref } from "vue";
import { getUserInfo } from "src/utils/user";
import { getUserFollower } from "src/utils/userfollower";
import { getUserFollowing } from "src/utils/userfollowing";

const finished = ref(false);
const userInfo = ref({});
const userFollowing = ref([]);
const userFollower = ref([]);
function useUserInfo(user = "mine") {
  onMounted(async () => {
    userInfo.value = await getUserInfo(user);
    console.log(userInfo.value.name);
    userFollowing.value = await getUserFollowing(userInfo.value.name);
    userFollower.value = await getUserFollower(userInfo.value.name);
    console.log(userFollower.value);
    console.log(userFollowing.value);
    finished.value = true;
  });
  return {
    finished,
    userInfo,
    userFollower,
    userFollowing,
  };
}

export default useUserInfo;
