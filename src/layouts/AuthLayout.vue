<template>
  <q-layout view="hHr LpR lfr">
    <q-page-container>
    <router-view v-slot="{ Component }">
      <transition 
        enter-active-class="animated fadeInLeftBig"
        leave-active-class="animated fadeOutRightBig"
        mode="out-in" 
        :duration="300"
        appear>
        <component :is="Component" />
      </transition>
    </router-view>
    </q-page-container>
  </q-layout>
</template>


<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    setup() {
        
    },
})
</script>

<style scoped>

</style>