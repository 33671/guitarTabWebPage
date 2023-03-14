import { onMounted, ref, unref } from "vue";
import { getUserInfo } from "src/utils/user";
import { getUserFollower } from "src/utils/userfollower";
import { getUserFollowing } from "src/utils/userfollowing";

const finished = ref(false);
const userInfo = ref({});
const userFollowing = ref([]);
const userFollower = ref([]);
function useUserInfo({ user = "mine" } = { user: "mine" }) {
  onMounted(async () => {
    userInfo.value = await getUserInfo(user);
    userFollowing.value = await getUserFollowing("zhang");
    userFollower.value = await getUserFollower("zhang");
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
