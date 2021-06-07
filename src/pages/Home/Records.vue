<template>
  <q-page class="q-pa-sm">
    <div class="q-pa-sm">
      <PatientRecordTable />
    </div>
    <div class="row">
      <div class="q-pa-sm col-xs-12 col-md-6">
        <PatientInfo />
      </div>
      <div class="q-pa-sm col-xs-12 col-md-6">
        <PatientHistory />
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';

import PatientHistory from 'src/components/Records/PatientHistory'
import PatientInfo from 'src/components/Records/PatientInfo'
import PatientRecordTable from 'src/components/Records/PatientRecordTable'

export default defineComponent({
  name: 'Records',
  components: {
    PatientRecordTable,
    PatientInfo,
    PatientHistory
  },
  setup() {
   
    return { }
  }
})
</script>
