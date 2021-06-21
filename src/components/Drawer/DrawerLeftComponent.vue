<template>
    <div>
    <!-- drawer Content Title -->
      <q-item-label header class="text-white bg-primary">
        
      </q-item-label>

      <div v-if="list">
        <q-tabs
          clickable
          v-ripple
          v-for="item in list.pages"
          :key="item.url"
          class="text-white"
        >
          <q-route-tab :to="{ path: item.url }" exact :label="item.name" />
        </q-tabs>
      </div>
      <div v-else>
        <q-spinner-ios
          color="primary"
          size="2em"
        />
        <q-tooltip :offset="[0, 8]">Loading...</q-tooltip>
      </div>

    </div>
</template>

<script>

import { watchEffect, computed } from 'vue';
import { useRoute } from 'vue-router'

export default {

  props: {
    titleProp: String
  },

  setup(props) {
    const items = [
      { 
        title: 'Home', 
        pages: [
          { name: 'Home', url: '/' },
          { name: 'Patient', url: '/patients' },
          { name: 'Records', url: '/records' },
          { name: 'Prescription', url: '/prescription' },
          { name: 'Settings', url: '/settings' },
        ]
      },
      {
        title: 'History', 
        pages: [ 'History','Settings' ]
      }
    ];

    const list = computed(() => {
      return items.filter((item) => {
        return item.title == props.titleProp
      })[0]
    })
  
    return { 
      items, //Pages
      list
    }
  }
}
</script>

<style scoped>
  .q-item__section--main {
    flex: unset;
  }
  .q-item__label.q-item__label--header {
    pointer-events: none;
  }
  .q-item__label.q-item__label--header[data-v-09450cfe] {
      background-color: rgb(237, 230, 216);
  }
  .router-link {
    text-decoration: none;
  }
  body {
    font-family: 'Comforta';
  }
</style>