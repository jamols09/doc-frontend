<template>
  <q-layout view="hHh LpR fFf">

    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />
        <q-toolbar-title>
          Admin Dashboard
        </q-toolbar-title>
        <q-btn  dense flat round icon="menu" @click="right = !right" />
      </q-toolbar>

      <q-tabs align="left">
        <!-- <q-route-tab to="/" label="Home" /> -->
      </q-tabs>
    </q-header>

    <!-- Left Drawer Component -->
    <q-drawer 
      bordered
      class="drawer-o-90 bg-primary"
      side="left" 
      :width="250"
      v-model="left"
      overlay
    >
      <DrawerLeftComponent :titleProp="path" />
    </q-drawer>
    <!-- Right Drawer Component -->
    <q-drawer
      bordered
      class="drawer-o-90"
      side="right"
      :width="250"
      :breakpoint="400"
      v-model="right"
      overlay
    >
      <DrawerRightComponent />
    </q-drawer>

    <q-page-container 
      class="auth-bg"
      @mousemove="cursorAnim"
      :style="{ 
      'background-position': backgroundPos,
      'background-image': 'url('+ imageBg +')' 
      }"
    >
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

<script>
import { useRoute } from 'vue-router'
import { ref, computed, reactive, onMounted } from 'vue'

import DrawerLeftComponent from 'src/components/Drawer/DrawerLeftComponent'
import DrawerRightComponent from 'src/components/Drawer/DrawerRightComponent'

export default {
  
  name: 'Login',

  components: {
    DrawerLeftComponent,
    DrawerRightComponent
  },

  setup() {
    
    const $route = useRoute()
    const left = ref(false)
    const right = ref(false)
    const path = computed(() => $route.matched[0].name ) //[0].name first or parent
    const imageBg = ref('');
    //CSS
    const cursor = reactive({
      x: 0,
      y: 0
    })
    const cursorAnim = ( (e) => { cursor.x = (e.pageX * -1 / 50) }) // x-axis
    const backgroundPos = computed( () => {
      return cursor.x + 'px ' + 0 + 'px'
    })
    const setImageBg = () => {
      imageBg.value = 'http://localhost:8080/img/wallpaper-mountains.jpg'
    }
    
    onMounted(() => {
      setImageBg()
    })

    return { 
      right, //Drawer
      left, //Drawer
      path, //Route

      cursorAnim, //css
      backgroundPos, //css
      imageBg //css
    }
  }
}
</script>

<style scoped>
.auth-bg {
  background-size: 3252px 1940px;
  background-repeat: no-repeat;
  background-image: url('assets/images/wallpaper-mountains.jpg');
  background-position: center center;
  padding: 0;
  margin: 0;
  height: 100%; 
  overflow: hidden;
}
</style>
