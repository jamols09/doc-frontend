<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="confirmModal" persistent transition-show="scale" transition-hide="scale">
      <q-card style="min-width: 300px;">
        <q-card-section class="bg-orange-4 text-white" >
          <div class="text-h6"> Confirmation </div>
        </q-card-section>
        <q-card-section class="q-pa-lg q-px-sm">
          <q-field label="Full Name" stack-label class="col-grow">
            <template v-slot:control>
              <div class="self-center full-width no-outline" tabindex="0"> {{ data.firstname }} {{ data.middlename }} {{ data.lastname }} </div>
            </template>
          </q-field>
          <q-field label="Birthdate" stack-label class="col-grow">
            <template v-slot:control>
              <div class="self-center full-width no-outline" tabindex="0">{{ data.birthdate }}</div>
            </template>
          </q-field>
          <q-field label="Province" stack-label class="col-grow">
            <template v-slot:control>
              <div class="self-center full-width no-outline" tabindex="0">{{ data.address.province }}</div>
            </template>
          </q-field>
          <q-field label="City" stack-label class="col-grow">
            <template v-slot:control>
              <div class="self-center full-width no-outline" tabindex="0">{{ data.address.city }}</div>
            </template>
          </q-field>
          <q-field label="Barangay" stack-label class="col-grow">
            <template v-slot:control>
              <div class="self-center full-width no-outline" tabindex="0">{{ data.address.barangay }}</div>
            </template>
          </q-field>
          <q-field label="Address line 1" stack-label class="col-grow">
            <template v-slot:control>
              <div class="self-center full-width no-outline" tabindex="0">{{ data.address.line1 }}</div>
            </template>
          </q-field>
          <div v-if="!data.avatar" class="q-pa-lg text-center">
            <div class="text-h6"> Do you want to submit without an ID ? </div>
          </div>
        </q-card-section>
        
        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Confirm" color="primary" v-close-popup @click="sendData"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { useQuasar, QSpinnerGears } from 'quasar'
import { ref, defineComponent, computed, toRefs, reactive } from 'vue'
import { useStore } from 'vuex'
import phil from 'philippine-location-json-for-geer'
import _ from 'lodash'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'PatientModal',
  
  setup () {
    
    const $router = useRouter()
    const $store = useStore()
    const $q = useQuasar()
    const confirmModal = ref(false)

    const data = computed(() => {
      if(confirmModal.value){
        let a = _.cloneDeep($store.getters['patient/getPatient'])
        const city = phil.city_mun.filter(item => item.mun_code == a.address.city)
        const province = phil.provinces.filter(item => item.prov_code == a.address.province)
        const barangay = phil.barangays.filter(item => item.brgy_code == a.address.barangay)
        if(a.address.city) { a.address.city = city[0].name }
        if(a.address.province) { a.address.province = province[0].name }
        if(a.address.barangay) { a.address.barangay = barangay[0].name }
        return a
      }
      return null
    })

    const triggerModal = () => {  
      confirmModal.value = !confirmModal.value
    }

    const sendData = () => {
      const notify = $q.notify({
        spinner: QSpinnerGears,
        message: 'Submitting details',
        position: 'center',
        timeout: 0
      })
      $store.dispatch('patient/sendPatientInfo') //send data to server
      .then((res) => {
        notify()
        $store.dispatch('patient/setButtonDisabled', true) //disable submit button
        $q.notify({
          color: 'green-5',
          textColor: 'white',
          position: 'center',
          type: 'positive',
          message: 'Details successfully submitted.',
          timeout: 3000
        })
        setTimeout(() => {
          $store.dispatch('patient/setButtonDisabled', false)
          // window.location.reload()
        }, 3000)
      })
      .catch((err) => {
        notify()
        $store.dispatch('patient/setButtonDisabled', false)
        $q.notify({
          color: 'red-5',
          textColor: 'white',
          position: 'center',
          type: 'negative',
          message: 'Something went wrong. Message:'+ err,
          timeout: 3000
        })
      })
    }

    return {
     confirmModal,
     triggerModal,
     sendData,
     data
    }
  }
})
</script>

<style>

</style>