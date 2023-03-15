import { onMounted, ref, unref } from "vue";
import { getUserInfo } from "src/utils/user";
import { getUserFollower } from "src/utils/userfollower";
import { getUserFollowing } from "src/utils/userfollowing";

function useUserInfo({ user = "mine" } = { user: "mine" }) {
  const finished = ref(false);
  const userInfo = ref({});
  const userFollowing = ref([]);
  const userFollower = ref([]);
  getUserInfo(user).then(async (info) => {
    // if (info.avator_id == undefined) {
    //   info["avator_id"] =
    //     "https://imgs.aixifan.com/content/2019_02_18/1550493987633.JPG";
    // }
    // debugger;
    userInfo.value = info;
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
