<script setup>
const contacts = [
  {
    id: 1,
    name: "Ruddy Jedrzej",
    email: "rjedrzej0@discuz.net",
    letter: "R",
  },
  {
    id: 2,
    name: "Mallorie Alessandrini",
    email: "malessandrini1@marketwatch.com",
    letter: "M",
  },
  {
    id: 3,
    name: "Elisabetta Wicklen",
    email: "ewicklen2@microsoft.com",
    letter: "E",
  },
  {
    id: 4,
    name: "Seka Fawdrey",
    email: "sfawdrey3@wired.com",
    letter: "S",
  },
];
</script>

<template>
  <q-page padding>
    <q-card
      class="col-md-9"
      flat
      style="
        background-image: linear-gradient(
            to bottom,
            rgba(245, 246, 252, 0.52),
            rgba(117, 19, 93, 0.73)
          ),
          url(https://cfcore-assets.forgecdn.net/game-covers/457c8141-8d81-4d13-aaa9-b5655011fb69.png);
        background-size: cover;
      "
    >
      <q-card-section class="flex row" style="height: 100%">
        <div
          class="cover col-12 col-md-3 flex justify-center justify-sm-center justify-md-end"
        >
          <q-skeleton width="180px" height="180px" />
        </div>
        <div
          class="col-12 col-md-8 justify-center justify-md-start row flex-wrap items-center"
        >
          <div class="text-h4 ellipsis col-12">Lorem ipsum dolor si</div>
          <div class="text-caption ellipsis col-12">
            收藏:1277 标签：#初音未来 #二次元 #VOCALOID #吉他谱 #JPOP
          </div>
        </div>
        <div class="col-12 col-md-1 flex items-center justify-center">
          <q-btn color="primary">
            <q-icon size="2" name="star" />
          </q-btn>
        </div>
      </q-card-section>
    </q-card>
    <q-separator spaced />
    <div class="row justify-between q-gutter-y-md">
      <div class="q-px-sm col-md-9">
        <q-card class="q-pa-lg">
          <q-card-section class="q-pa-lg">
            <div class="text-h5 text-center q-mb-lg">Lorem ipsum dolor si</div>
            Lorem ipsum dolor sit amet, consecbr
            <br />
            tetur adipiscing elit Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Repudiandae eligendi quibusdam dolorum reiciendis
            autem deb <br />
            leniti nisi odio! Vel nulla, id nihil maiores eum aspernatur
            assumenda mollitia iure incidunt odit consectetur. Lore <br />
            m ipsum dolor sit amet consectetur adipisicing elit. Adipisci magni
            nam exercitationem quasi animi assumenda et excepturi odit officiis,
            comm odi aut

            <br />
            em vel praesentium aperiam voluptate fugiat vitae? Eaque, quo
            maiores?Lorem ipsum dolor sit amet consectetur adipisicing elit.
            <br />
            Omnis esse, quasi corrupti totam reiciendis velit magni officia,
            <br />
            dolorem que excepturi doloribus molestiae culpa ratione quidem
            deserunt fugiat consequuntur quos deleniti labore.lorem
          </q-card-section>
        </q-card>
      </div>
      <div class="col-md-3">
        <q-card>
          <q-card-section>
            <div class="text-subtitle1">
              关于
              <q-icon name="report" size="1em" />
            </div>
            <div style="width: 100%">
              <q-list dense class="rounded-borders">
                <q-item>
                  <q-item-section> ID </q-item-section>
                  <q-item-section side> weu238g3726eyug326 </q-item-section>
                </q-item>

                <q-item>
                  <q-item-section> 最后修改 </q-item-section>
                  <q-item-section side> 2022年12月1日 </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section> 上传时间 </q-item-section>
                  <q-item-section side> 2022年12月1日 </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section> 点击量 </q-item-section>
                  <q-item-section side> 27232736 </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>下载量 </q-item-section>
                  <q-item-section side> 21823 </q-item-section>
                </q-item>
              </q-list>
            </div>
          </q-card-section>
        </q-card>
        <q-card class="q-mt-lg">
          <q-card-section>
            <div class="text-subtitle1">谱文件</div>
            <q-list>
              <q-item
                v-for="contact in contacts"
                :key="contact.id"
                class="q-my-sm q-px-none"
              >
                <q-item-section avatar>
                  <q-btn color="primary" flat round>
                    <q-icon name="play_arrow" color="green" />
                  </q-btn>
                </q-item-section>

                <q-item-section>
                  <q-item-label>{{ contact.name }}</q-item-label>
                  <q-item-label caption lines="1">{{
                    contact.email
                  }}</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-btn color="primary" flat round>
                    <q-icon name="download" color="green" />
                  </q-btn>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>
<style>
@media (min-width: 1024px) {
  .justify-md-start {
    justify-content: start;
    padding-left: 30px;
  }
  .justify-md-end {
    justify-content: end;
  }
}
</style>
