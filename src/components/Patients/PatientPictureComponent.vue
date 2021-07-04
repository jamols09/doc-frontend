<template>
  <q-card flat bordered class="col-xs-12 col-sm-12 col-md-6">
    <q-card-section class="bg-teal text-white q-pt-lg">
      <div class="text-h6"> Profile Picture (Recommended)</div>
    </q-card-section>
    
    <div v-if="img">
      <!-- <q-carousel animated v-model="slide" infinite v-model:fullscreen="fullscreen" height="60vh">
        <q-carousel-slide name="first" :img-src="img" />
          <template v-slot:control>
            <q-carousel-control
              position="bottom-right"
              :offset="[18, 18]"
            >
              <q-btn
                push round dense color="white" text-color="primary"
                :icon="fullscreen ? 'fullscreen_exit' : 'fullscreen'"
                @click="fullscreen = !fullscreen"
              />
            </q-carousel-control>
          </template>
      </q-carousel> -->
      <q-card class="column">
        <div style="text-align: center;">
          <img :src="img" style="width: auto; height: 300px; object-fit: cover;" />
        </div>
      </q-card>
    </div>

    <div v-else style="text-align:center"> 
      <h1> ID Picture </h1>
    </div>

    <q-card-section class="q-my-sm column items-center">
      <div class="col"></div>
        <div class="col">
          <q-btn color="primary" label="Take Picture" @click="captureImage" />
        </div>
      <div class="col"></div>
    </q-card-section>
    
  </q-card>
</template>

<script>

import { defineComponent, ref } from 'vue'
import { Camera, CameraDirection, CameraResultType } from '@capacitor/camera';
import { useStore } from 'vuex'

export default defineComponent({
    name: 'PatientPictureComponent',

    setup() {

      const item = ref('first')
      const img = ref('')
      const $store = useStore()

      async function captureImage () {
        await Camera.getPhoto({
          quality: 70,
          allowEditing: false,
          resultType: CameraResultType.DataUrl,
          direction: CameraDirection.Front,
          promptLabelPicture: "Take a selfie"
        })
        .then( res => {
          img.value = res.dataUrl
          $store.dispatch('patient/sendImageAction', res.dataUrl)
        })
      }

      return { 
        slide: item, 
        fullscreen: ref(false), 
        img, 
        captureImage 
      }
    }
})
</script>

<style scoped>
.custom-caption {
  text-align: center;
  padding: 12px;
  color: white;
  background-color: rgba(0, 0, 0, .3);
}
</style>