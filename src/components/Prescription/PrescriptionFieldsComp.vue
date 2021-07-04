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
          <q-select v-model="prescription.template" :options="templateOptions" label="Template" transition-show="jump-up" transition-hide="jump-up" :rules="[val => !!val || 'Field is required']" />
        </div>

        <!-- Prescription Type -->
        <div class="col-xs-12 col-sm-6 q-px-sm q-py-sm">
          <q-select v-model="prescription.type" :options="typeOptions" label="PDF Type" transition-show="jump-up" transition-hide="jump-up" :rules="[val => !!val || 'Field is required']" />
        </div>
      </q-card-section>

      <q-separator inset />

      <q-card-section>
        <div class="text-h6 text-dark text-center">Medicine</div>
      </q-card-section>

      <!-- Add Medicine -->
      <q-card-section class="q-py-md q-px-sm row items-center">
        <div class="col"></div>
        <q-btn color="positive" @click="addMedicine" label="Add Medicine" :disable="isDisabled" />
        <div class="col"></div>
      </q-card-section>

      <!-- Medicine Repeater -->
      <div class="medicine-container">
        <div v-for="(medicine, index) in medicineRepeater" :key="index">
          <q-card-section class="q-mb-md">
            <div class="row">
              <!-- 
                <q-select 
                use-input 
                hide-selected 
                fill-input 
                class="col-grow q-ma-sm" 
                input-debounce="300" 
                label="Diagnosis"
                label-color="orange" 
                color="orange" 
                transition-show="scale" 
                transition-hide="scale" 
                :options="filterOptionDiag"
                v-model="diag.name"
                @new-value="createDiagValue"
                @filter="diagfilterFn">
                <template v-slot:no-option>
                    <q-item>
                        <q-item-section class="text-grey">
                            No results (Press enter to save)
                        </q-item-section>
                    </q-item>
                </template>
              </q-select> 
              -->
              <div class="col-xs-12 col-sm-4 q-px-sm q-py-sm">
                <q-select v-model="prescription.weightType" :options="weightOptions" label="Weight Type" transition-show="jump-up" transition-hide="jump-up" :rules="[val => !!val || 'Field is required']" />
              </div>
              <div class="col-xs-12 col-sm-4 q-px-sm q-py-sm">
                <q-input v-model="prescription.weight" type="number" label="Weight Amount" stack-label maxlength="11" />
              </div>
            </div>
          </q-card-section>
        </div>
      </div>

      <q-card-section class="q-my-sm column items-center">
        <div class="col"></div>
        <div class="col">
          <q-btn label="Submit" type="submit" color="primary" :disable="isDisabled" :loading="isDisabled"  />
        </div>
        <div class="col"></div>
      </q-card-section>
    </q-card>
  </q-form>
</template>

<script>
import { defineComponent, ref, onMounted, reactive } from 'vue'
export default defineComponent({
    name: 'Prescription',

    setup() {

      const prescription = reactive({
        template: '',
        type: 'Free Form',
        medicine: '',
        weightType: '',
        weight: '',
        description: '',
        frequency: '', // 3 times
        interval: '', // day, weeks, hours
        amount: 0,
        signature: ''
      })

      const isDisabled = ref(false)
      const templateOptions = ['Template 1']
      const typeOptions = ['Free Form', 'Prescription']
      const weightOptions = [
        { label:'Milligrams', code:'mg' },
        { label:'Grams', code:'g' },
        { label:'Ounces', code:'oz' },
        { label:'Liters', code:'l'},
        { label:'Milliliters', code: 'ml'}
      ]
      //medicine repeater
      const medicineRepeater = ref([1])

      //Submit
      const onSubmit = () => {
        
      }

      //OnMounted
      onMounted(() => {
      })
      
      //Repeater
      const addMedicine = () => { 

      }

      return {
        //inputs fields
        prescription,
        isDisabled,
        addMedicine,
        //repeater
        medicineRepeater,
        weightOptions,

        //options
        templateOptions,
        typeOptions,
        onSubmit
      }
    }
})
</script>

<style>

</style>