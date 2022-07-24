<template>
  <body>
    <div class="login-register">
      <div class="contain row">
        <div class="small-box col-4" :class="{ active: isLogin }">
          <div class="small-contain" v-if="isLogin">
            <div class="stitle">你好，朋友!</div>
            <p class="scontent">开始注册，和我们一起旅行</p>
            <button class="sbutton" @click="changeType">注册</button>
          </div>
          <div class="small-contain" v-else>
            <div class="stitle">欢迎回来!</div>
            <p class="scontent">与我们保持联系，请登录你的账户</p>
            <button class="sbutton" @click="changeType">登录</button>
          </div>
        </div>
        <div
          class="big-box col-8"
          :class="{ active: isLogin }"
          style="background: #eceef6"
        >
          <div class="big-contain" v-if="isLogin">
            <div class="btitle">账户登录</div>
            <div class="bform">
              <input type="email" placeholder="邮箱" v-model="form.name" />
              <!-- <span class="errTips" v-if="emailError">* 邮箱填写错误 *</span> -->
              <input
                type="password"
                placeholder="密码"
                v-model="form.password"
              />
              <div
                class="row flex items-center justify-between"
                style="width: 50%"
              >
                <input
                  type="Captcha"
                  placeholder="验证码"
                  v-model="form.captcha"
                />

                <img style="max-width: 120px" src="/api/captcha" alt="" />
              </div>
              <!-- <span class="errTips" v-if="emailError">* 密码填写错误 *</span> -->
            </div>

            <button class="bbutton" @click="userlogin">登录</button>
          </div>
          <div class="big-contain" v-else>
            <div class="btitle">创建账户</div>
            <div class="bform">
              <input type="text" placeholder="用户名" v-model="form.name" />
              <span class="errTips" v-if="existed">* 用户名已经存在！ *</span>
              <input type="email" placeholder="邮箱" v-model="form.useremail" />
              <input
                type="password"
                placeholder="密码"
                v-model="form.password"
              />
              <div
                class="row flex items-center justify-between no-wrap"
                style="width: 50%"
              >
                <input
                  type="Captcha"
                  placeholder="验证码"
                  v-model="form.captcha"
                />

                <img style="max-width: 120px" src="/api/captcha" alt="" />
              </div>
            </div>
            <button class="bbutton" @click="userreg">注册</button>
          </div>
        </div>
      </div>
      <!-- </v-card> -->
    </div>
    <canvas> </canvas>
  </body>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { axios } from "boot/axios";
import { useQuasar } from "quasar";
const $q = useQuasar();
//dialog插件，提示用户登录成功与否

async function userlogin() {
  var loginform = new FormData();
  loginform.append("name", form.value.name);
  loginform.append("password", form.value.password);
  loginform.append("captcha", "111");
  const aa = await axios.post("/api/login", loginform);
  console.log(aa);
  // $q.dialog({
  //   title: `<img src="/api/captcha" alt="" />`,
  //   message: "Some message",
  //   html: true,
  // })
  //   .onOk(() => {
  //     // console.log('OK')
  //   })
  //   .onCancel(() => {
  //     // console.log('Cancel')
  //   })
  //   .onDismiss(() => {
  //     // console.log('I am triggered on both OK and Cancel')
  //   });
}
async function userreg() {
  var regform = new FormData();
  regform.append("name", form.value.name);
  regform.append("email", form.value.useremail);
  regform.append("password", form.value.password);
  regform.append("captcha", "111");
  const aa = await axios.post("/api/register", regform);
  console.log(aa);
}

const dialog3 = ref(false);
const isLogin = ref(false);
const emailError = ref(false);
const passwordError = ref(false);
const existed = ref(false);
const form = ref({
  name: "",
  useremail: "",
  password: "",
  captcha: "",
});
function changeType() {
  isLogin.value = !isLogin.value;
  form.value.name = "";
  form.value.useremail = "";
  form.value.password = "";
}

onMounted(async () => {
  const STAR_COLOR = "#000000";
  const STAR_SIZE = 3;
  const STAR_MIN_SCALE = 0.2;
  const OVERFLOW_THRESHOLD = 50;
  const STAR_COUNT = (window.innerWidth + window.innerHeight) / 8;

  const canvas = document.querySelector("canvas"),
    context = canvas.getContext("2d");

  let scale = 1, // device pixel ratio
    width,
    height;

  let stars = [];

  let pointerX, pointerY;

  let velocity = { x: 0, y: 0, tx: 0, ty: 0, z: 0.0005 };

  let touchInput = false;

  generate();
  resize();
  step();

  window.onresize = resize;
  canvas.onmousemove = onMouseMove;
  canvas.onmouseleave = onMouseLeave;
  canvas.ontouchmove = onTouchMove;
  canvas.ontouchend = onMouseLeave;

  function generate() {
    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: 0,
        y: 0,
        z: STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE),
      });
    }
  }

  function placeStar(star) {
    star.x = Math.random() * width;
    star.y = Math.random() * height;
  }

  function recycleStar(star) {
    let direction = "z";

    let vx = Math.abs(velocity.x),
      vy = Math.abs(velocity.y);

    if (vx > 1 || vy > 1) {
      let axis;

      if (vx > vy) {
        axis = Math.random() < vx / (vx + vy) ? "h" : "v";
      } else {
        axis = Math.random() < vy / (vx + vy) ? "v" : "h";
      }

      if (axis === "h") {
        direction = velocity.x > 0 ? "l" : "r";
      } else {
        direction = velocity.y > 0 ? "t" : "b";
      }
    }

    star.z = STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE);

    if (direction === "z") {
      star.z = 0.1;
      star.x = Math.random() * width;
      star.y = Math.random() * height;
    } else if (direction === "l") {
      star.x = -OVERFLOW_THRESHOLD;
      star.y = height * Math.random();
    } else if (direction === "r") {
      star.x = width + OVERFLOW_THRESHOLD;
      star.y = height * Math.random();
    } else if (direction === "t") {
      star.x = width * Math.random();
      star.y = -OVERFLOW_THRESHOLD;
    } else if (direction === "b") {
      star.x = width * Math.random();
      star.y = height + OVERFLOW_THRESHOLD;
    }
  }

  function resize() {
    scale = window.devicePixelRatio || 1;

    width = window.innerWidth * scale;
    height = window.innerHeight * scale;

    canvas.width = width;
    canvas.height = height;

    stars.forEach(placeStar);
  }

  function step() {
    context.clearRect(0, 0, width, height);

    update();
    render();

    requestAnimationFrame(step);
  }

  function update() {
    velocity.tx *= 0.96;
    velocity.ty *= 0.96;

    velocity.x += (velocity.tx - velocity.x) * 0.8;
    velocity.y += (velocity.ty - velocity.y) * 0.8;

    stars.forEach((star) => {
      star.x += velocity.x * star.z;
      star.y += velocity.y * star.z;

      star.x += (star.x - width / 2) * velocity.z * star.z;
      star.y += (star.y - height / 2) * velocity.z * star.z;
      star.z += velocity.z;

      // recycle when out of bounds
      if (
        star.x < -OVERFLOW_THRESHOLD ||
        star.x > width + OVERFLOW_THRESHOLD ||
        star.y < -OVERFLOW_THRESHOLD ||
        star.y > height + OVERFLOW_THRESHOLD
      ) {
        recycleStar(star);
      }
    });
  }

  function render() {
    stars.forEach((star) => {
      context.beginPath();
      context.lineCap = "round";
      context.lineWidth = STAR_SIZE * star.z * scale;
      context.globalAlpha = 0.5 + 0.5 * Math.random();
      context.strokeStyle = STAR_COLOR;

      context.beginPath();
      context.moveTo(star.x, star.y);

      var tailX = velocity.x * 2,
        tailY = velocity.y * 2;

      // stroke() wont work on an invisible line
      if (Math.abs(tailX) < 0.1) tailX = 0.5;
      if (Math.abs(tailY) < 0.1) tailY = 0.5;

      context.lineTo(star.x + tailX, star.y + tailY);

      context.stroke();
    });
  }

  function movePointer(x, y) {
    if (typeof pointerX === "number" && typeof pointerY === "number") {
      let ox = x - pointerX,
        oy = y - pointerY;

      velocity.tx = velocity.tx + (ox / 8) * scale * (touchInput ? 1 : -1);
      velocity.ty = velocity.ty + (oy / 8) * scale * (touchInput ? 1 : -1);
    }

    pointerX = x;
    pointerY = y;
  }

  function onMouseMove(event) {
    touchInput = false;

    movePointer(event.clientX, event.clientY);
  }

  function onTouchMove(event) {
    touchInput = true;

    movePointer(event.touches[0].clientX, event.touches[0].clientY, true);

    event.preventDefault();
  }

  function onMouseLeave() {
    console.log("1");
    pointerX = null;
    pointerY = null;
  }
});
</script>
<style>
body {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  background-image: radial-gradient(
      circle at top right,
      rgba(121, 68, 154, 0.13),
      transparent
    ),
    radial-gradient(circle at 20% 80%, rgba(41, 196, 255, 0.13), transparent);
}
canvas {
  position: fixed;
  width: 100%;
  height: 100%;
}

a {
  position: absolute;
  bottom: 2vmin;
  right: 2vmin;
  color: rgba(255, 255, 255, 0.2);
  text-decoration: none;
}

a:hover {
  color: #fff;
}
.login-register {
  width: 50vw;
  z-index: 1;
  opacity: 0.9;
}
.contain {
  width: 100%;
  height: 100%;
}
.big-box {
  height: 60vh;
}
.big-contain {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.btitle {
  font-size: 1.5em;
  font-weight: bold;
  color: rgb(57, 167, 176);
}
.bform {
  width: 100%;
  height: 55%;
  padding: 2em 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.bform .errTips {
  display: block;
  width: 50%;
  text-align: left;
  color: red;
  font-size: 0.7em;
  margin-left: 1em;
}
.bform input {
  width: 50%;
  height: 40px;
  border: none;
  outline: none;
  border-radius: 10px;
  padding-left: 2em;
  background-color: #f0f0f0;
}
.bbutton {
  width: 20%;
  height: 40px;
  border-radius: 24px;
  border: none;
  outline: none;
  background-color: rgb(57, 167, 176);
  color: #fff;
  font-size: 0.9em;
  cursor: pointer;
}
.small-box {
  height: 100%;
  background: linear-gradient(135deg, rgb(57, 167, 176), rgb(56, 183, 145));

  border-top-left-radius: inherit;
  border-bottom-left-radius: inherit;
}
.small-contain {
  width: 100%;
  height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.stitle {
  font-size: 1.5em;
  font-weight: bold;
  color: #fff;
}
.scontent {
  font-size: 0.8em;
  color: #fff;
  text-align: center;
  padding: 2em 4em;
  line-height: 1.7em;
}
.sbutton {
  width: 60%;
  height: 40px;
  border-radius: 24px;
  border: 1px solid #fff;
  outline: none;
  background-color: transparent;
  color: #fff;
  font-size: 0.9em;
  cursor: pointer;
}
</style>
<!-- <style scoped="scoped">
body {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  background-image: radial-gradient(
      circle at top right,
      rgba(121, 68, 154, 0.13),
      transparent
    ),
    radial-gradient(circle at 20% 80%, rgba(41, 196, 255, 0.13), transparent);
}
canvas {
  position: fixed;
  width: 100%;
  height: 100%;
}

a {
  position: absolute;
  bottom: 2vmin;
  right: 2vmin;
  color: rgba(255, 255, 255, 0.2);
  text-decoration: none;
}

a:hover {
  color: #fff;
}
.login-register {
  opacity: 0.9;
  width: 60vw;
  height: 60vh;
  box-sizing: border-box;
}

.contain {
  /* width: 60%; */
  height: 600px;
  /* position: relative; */
  /* position: absolute; */
  top: 300px;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  /* border-radius: 20px; */
  box-shadow: 0 0 3px #f0f0f0, 0 0 6px #f0f0f0;
}
.big-box {
  width: 70%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 30%;
  transform: translateX(0%);
  transition: all 1s;
}
.big-contain {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.btitle {
  font-size: 1.5em;
  font-weight: bold;
  color: rgb(57, 167, 176);
}
.bform {
  width: 100%;
  height: 40%;
  padding: 2em 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.bform .errTips {
  display: block;
  width: 50%;
  text-align: left;
  color: red;
  font-size: 0.7em;
  margin-left: 1em;
}
.bform input {
  width: 50%;
  height: 30px;
  border: none;
  outline: none;
  border-radius: 10px;
  padding-left: 2em;
  background-color: #f0f0f0;
}
.bbutton {
  width: 20%;
  height: 40px;
  border-radius: 24px;
  border: none;
  outline: none;
  background-color: rgb(57, 167, 176);
  color: #fff;
  font-size: 0.9em;
  cursor: pointer;
}
.small-box {
  width: 30%;
  height: 100%;
  background: linear-gradient(135deg, rgb(57, 167, 176), rgb(56, 183, 145));
  position: absolute;
  top: 0;
  left: 0;
  transform: translateX(0%);
  transition: all 1s;
  border-top-left-radius: inherit;
  border-bottom-left-radius: inherit;
}
.small-contain {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.stitle {
  font-size: 1.5em;
  font-weight: bold;
  color: #fff;
}
.scontent {
  font-size: 0.8em;
  color: #fff;
  text-align: center;
  padding: 2em 4em;
  line-height: 1.7em;
}
.sbutton {
  width: 60%;
  height: 40px;
  border-radius: 24px;
  border: 1px solid #fff;
  outline: none;
  background-color: transparent;
  color: #fff;
  font-size: 0.9em;
  cursor: pointer;
}

.big-box.active {
  left: 0;
  transition: all 0.5s;
}
.small-box.active {
  left: 100%;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: inherit;
  border-bottom-right-radius: inherit;
  transform: translateX(-100%);
  transition: all 1s;
}
</style> -->
