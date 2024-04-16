<template>
  <div class="icp">
    {{ `© ${year} ${author} `
    }}<a href="http://beian.miit.gov.cn/" target="_blank">{{ record }}</a>
  </div>
</template>

<script setup>
let year = new Date().getFullYear(); // 一般都是最新的一年
let author = ""; // 作者名
let record = "豫ICP备2024043581号-1"; // 备案号
</script>

<style>
.icp {
  position: absolute;
  bottom: 20px;
  right: 0;
  margin: 10px 0;
  width: 100%;
  height: 36px;
  white-space: pre;
  text-align: center;
  color: gray;
  z-index: 1000;
}
.icp > a {
  color: gray;
  text-decoration: none;
}
.icp > a:hover {
  color: black;
  text-decoration: none;
}
</style>
