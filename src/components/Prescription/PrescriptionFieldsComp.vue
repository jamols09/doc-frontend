<template>
  <q-form @submit.prevent="onSubmit">
    <q-card bordered class="col-xs-12 col-sm-12 col-md-6">
      <q-card-section class="bg-teal text-white q-pt-lg">
        <div class="text-h6"> 
          Prescription
        </div>
      </q-card-section>
      <q-card-section class="q-py-md q-px-sm row">

        <!-- Templates -->
        <div class="col-xs-12 col-sm-6 q-px-sm q-py-sm">
          <q-select v-model="template" :options="templateOptions" stack-label label="Template" transition-show="jump-up" transition-hide="jump-up" :rules="[val => !!val || 'Field is required']" />
        </div>

        <!-- Prescription Type -->
        <div class="col-xs-12 col-sm-6 q-px-sm q-py-sm">
          <q-select v-model="type" :options="typeOptions" stack-label label="PDF Type" transition-show="jump-up" transition-hide="jump-up" :rules="[val => !!val || 'Field is required']" />
        </div>
      </q-card-section>

      <q-card-section v-if="type == 'Prescription' ">
        <div class="text-h6 text-dark text-center">Patient</div>
      </q-card-section>
      
      <PatientTableComp v-if="type == 'Prescription' " />

      <q-card-section>
        <div class="text-h6 text-dark text-center" v-if="type == 'Prescription' ">Medicine</div>
        <div class="text-h6 text-dark text-center" v-else>Free Form</div>
      </q-card-section>

      <MedicineRepeaterComp />

      <q-card-section class="q-my-sm column items-center">
        <div class="col"></div>
        <div class="col">
          <q-btn label="Generate" type="submit" color="primary" :disable="isDisabled" :loading="isDisabled"  />
        </div>
        <div class="col"></div>
      </q-card-section>
      
    </q-card>
  </q-form>
</template>

<script>
import { defineComponent, ref, onMounted, reactive, computed } from 'vue'
import { useStore } from 'vuex'
import MedicineRepeaterComp from 'src/components/Prescription/MedicineRepeater/MedicineRepeaterComp.vue'
import PatientTableComp from 'src/components/Prescription/Patient/PatientTableComp.vue'

export default defineComponent({
    name: 'Prescription',
    components: {
      MedicineRepeaterComp,
      PatientTableComp,
    },
    
    setup() {
      const $store = useStore()
      
      const isDisabled = ref(false)
      const templateOptions = ['Template 1']
      const typeOptions = ['Free Form', 'Prescription']

      const template = computed({
        get () { return $store.getters['prescription/GET_PRESCRIPTION_TEMPLATE_TYPE'] },
        set (data) { return $store.commit('prescription/SET_PRESCRIPTION_TEMPLATE_TYPE', data) }
      })
      const type = computed({
        get () { return $store.getters['prescription/GET_PRESCRIPTION_TYPE'] },
        set (data) { return $store.commit('prescription/SET_PRESCRIPTION_TYPE', data) }
      })

      //Submit
      const onSubmit = () => {
        console.log('asd')
      }

      //OnMounted
      onMounted(() => {
      })
      
      
      return {
        //options
        templateOptions,
        typeOptions,
        //button
        isDisabled,
        onSubmit,
        //vuex
        template,
        type
      }
    }
})
</script>

<style>

</style>