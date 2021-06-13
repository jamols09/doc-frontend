<template>
  <q-page class="q-pa-sm">
    <div class="q-pa-sm">
      <PatientRecordTable @sendSelected="selected" />
    </div>
    <div class="row">
      <!-- <div class="q-pa-sm col-xs-12 col-md-6">
        <PatientInfo />
      </div> -->
      <div class="q-pa-sm col-xs-12 col-md-12">
        <PatientHistory :propSelected="propSelected"/>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue';

import PatientHistory from 'src/components/Records/PatientHistory'
import PatientInfo from 'src/components/Records/PatientInfo'
import PatientRecordTable from 'src/components/Records/PatientRecordTable'

export default defineComponent({
  name: 'Records',
  components: {
    PatientRecordTable,
    // PatientInfo,
    PatientHistory
  },
  setup() {

    const propSelected = ref(null)

    function selected(data) {
      propSelected.value = data
    }

    return {
      selected,
      propSelected
    }
  }
})
</script>
