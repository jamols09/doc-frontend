<template>
  <q-page class="wrap gutter row">
    <div class="q-pa-sm col-xs-12 col-md-6">
      <PatientComponent />
    </div>
    <div class="q-pa-sm col-xs-12 col-sm-12 col-md-6">
      <PatientPictureComponent />
    </div>
  </q-page>
</template>

<script>

import { defineComponent } from 'vue';

import PatientComponent from 'src/components/Patients/PatientComponent.vue'
import PatientPictureComponent from 'src/components/Patients/PatientPictureComponent.vue';

export default defineComponent({
  
  name: 'Patient',

  components: {
    PatientComponent,
    PatientPictureComponent,
  },
  
  setup() {


    return {
      
    }
  }
})
</script>
