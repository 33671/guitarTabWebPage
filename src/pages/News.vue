<template>
  <q-page>
    <div class="row">
      <div class="col-lg-3 col-12"></div>
      <div
        class="col-lg-6 col-12 q-pa-xl-xl q-pa-lg-xl q-pa-md-xl q-pa-sm-xl q-pa-xs-lg"
      >
        <q-card class="my-card-radius-20 bg-blue-8">
          <q-card-section>
            <div class="row">
              <div class="col-sm-8 col-12">
                <q-card class="my-card-radius-10 q-ma-lg">
                  <q-img
                    src="/api/cover_files/6ef75428-280e-4fff-906e-e2e48b5db9be"
                  >
                    <!-- 谱封面card -->
                    <div
                      class="absolute-bottom row justify-between items-center"
                    >
                      <div class="text-h6">花之塔</div>
                      <div class="text-subtitle1">2天前上传</div>
                    </div>
                  </q-img>
                </q-card>
                <q-card class="my-card-radius-10 q-ma-lg bg-teal-13">
                  <q-card-section class="q-pa-sm"
                    ><div class="row items-center justify-around">
                      <q-avatar
                        ><img
                          src="https://imgs.aixifan.com/content/2019_02_18/1550493987633.JPG"
                      /></q-avatar>
                      <div class="text-subtitle2">Zhang</div>
                      <q-btn round color="primary" size="15px">
                        <q-icon name="star" /> </q-btn
                      ><q-btn round color="primary" size="15px">
                        <q-icon name="share" /> </q-btn
                      ><q-btn round color="primary" size="15px">
                        <q-icon name="list" />
                      </q-btn>
                    </div>
                  </q-card-section>
                  <!-- 上传者信息card -->
                </q-card>
              </div>
              <div class="col-sm-4 col-12">
                <q-card class="my-card-radius-10 q-ma-lg bg-light-blue-13">
                  <!-- 谱详情card -->
                  <q-card-section
                    >1 <br />
                    1 <br />
                    1 <br />
                    1 <br />
                    1 <br />
                    1 <br />
                    1 <br />
                    1 <br />
                    1 <br />
                    1 <br />
                    1 <br />
                    1 <br />
                    1 <br />
                    1 <br />
                    1 <br />
                  </q-card-section>
                </q-card>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-lg-3 col-12"></div>
    </div>
  </q-page>
</template>

<script setup></script>
<style lang="scss" scoped>
.my-card-radius-20 {
  border-radius: 20px;
}
.my-card-radius-10 {
  border-radius: 10px;
}
</style>
