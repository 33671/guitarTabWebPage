<template>
  <q-card>
    <q-card-section>
      <div class="text-subtitle1">
        关于
        <q-icon name="report" size="1em" />
      </div>
      <div style="width: 100%">
        <q-list dense class="rounded-borders">
          <!-- <q-item>
            <q-item-section> ID </q-item-section>
            <q-item-section side> {{ props.publishId }} </q-item-section>
          </q-item> -->

          <q-item>
            <q-item-section> 最后修改 </q-item-section>
            <q-item-section side>
              {{ props.info.modified_date }}
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section> 上传时间 </q-item-section>
            <q-item-section side>
              {{ props.info.publish_date }}
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section> 点击量 </q-item-section>
            <q-item-section side> 27232736 </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>下载量 </q-item-section>
            <q-item-section side> 21823 </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>歌曲名 </q-item-section>
            <q-item-section side> {{ props.info.music_name }} </q-item-section>
          </q-item>
          <q-item>
            <q-item-section> 原曲地址 </q-item-section>
            <q-item-section side>
              {{ props.info.original_music_url }}
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section> 类型 </q-item-section>
            <q-item-section side> {{ props.info.tab_type }} </q-item-section>
          </q-item>
        </q-list>
      </div>
    </q-card-section>
  </q-card>
</template>
<script setup>
const props = defineProps({ info: Object });
</script>
