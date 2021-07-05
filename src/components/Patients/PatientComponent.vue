<template>
  <q-form @submit.prevent="onSubmit">
    <q-card bordered class="col-xs-12 col-sm-12 col-md-6">
      <q-card-section class="bg-teal text-white q-pt-lg">
        <div class="text-h6"> New Patient </div>
      </q-card-section>
      <q-card-section class="q-py-md q-px-sm row">
        <div class="col-grow q-px-sm q-py-sm">
          <q-input filled v-model="patient.firstname" class="text-capitalize" label="First Name" stack-label clearable maxlength="50" :rules="[val => !!val || 'Field is required']" />
        </div>
        <div class="col-grow q-px-sm q-py-sm">
          <q-input filled v-model="patient.middlename" class="text-capitalize" label="Middle Name" stack-label clearable maxlength="50" />
        </div>
        <div class="col-grow q-px-sm q-py-sm">
          <q-input filled v-model="patient.lastname" class="text-capitalize" label="Last Name" stack-label clearable maxlength="50" />
        </div>
      </q-card-section>
      <q-card-section class="q-py-md q-px-sm row">
        <div class="col-xs-12 col-sm-6 q-px-sm q-py-sm">
          <q-input v-model="patient.birthdate" filled type="date" mask="##/##/####" hint="Birthdate" clearable :rules="[val => !!val || 'Field is required']" />
        </div>
        <div class="col-xs-12 col-sm-6 q-px-sm q-py-sm">
          <q-select filled v-model="patient.sex" :options="sex" label="Sex" stack-label transition-show="jump-up" transition-hide="jump-up" :rules="[val => !!val || 'Field is required']" />
        </div>
        <div class="col-xs-12 col-sm-6 q-px-sm q-py-sm">
          <q-select filled v-model="patient.status" :options="status" stack-label label="Status" transition-show="jump-up" transition-hide="jump-up" :rules="[val => !!val || 'Field is required']" />
        </div>
        <div class="col-xs-12 col-sm-6 q-px-sm q-py-sm">
          <q-input v-model="patient.occupation" filled stack-label label="Occupation (ie: Student)" clearable />
        </div>
      </q-card-section>
      <q-card-section class="q-py-md q-px-sm row">
        <div class="col-xs-4 col-sm-4 col-md-4 q-px-sm q-py-sm">
          <q-input filled v-model="patient.height"  type="number" :label="'Height ('+ patient.height_unit +')'" stack-label  maxlength="50"  />
        </div>
        <div v-if="patient.height_unit == 'ft' " class="col-xs-4 col-sm-4 col-md-4 q-px-sm q-py-sm">
          <q-input filled v-model="patient.height_inches" type="number" label="Inches" stack-label  maxlength="50"  />
        </div>
        <div class="col-xs-4 col-sm-4 col-md-4 q-px-sm q-py-sm">
          <q-select filled v-model="patient.height_unit" :options="ht_unit" label="Unit" stack-label transition-show="jump-up" transition-hide="jump-up" />
        </div>
        <div class="col-xs-6 col-sm-6 col-md-6 q-px-sm q-py-sm">
          <q-input filled v-model="patient.weight" type="number" :label="'Unit ('+patient.weight_unit+')'" stack-label  maxlength="50"  />
        </div>
        <div class="col-xs-6 col-sm-6 col-md-6 q-px-sm q-py-sm">
          <q-select filled v-model="patient.weight_unit" :options="wt_unit" label="Unit" stack-label transition-show="jump-up" transition-hide="jump-up" />
        </div>
      </q-card-section>
      
      <q-separator inset />

      <q-card-section>
        <div class="text-h6 text-dark text-center">Address</div>
      </q-card-section>
      <q-card-section class="q-py-md q-px-sm row">
        <div class="col-xs-12 col-sm-12 col-md-6 q-px-sm q-py-sm">
          <q-select 
            filled 
            v-model="patient.address.region" 
            :options="region" 
            label="Region" 
            stack-label 
            clearable 
            maxlength="50" 
            option-value="reg_code"
            option-label="name"
            emit-value
            map-options
            :rules="[val => !!val || 'Field is required']"
          />
        </div>
        <div class="col-xs-12 col-sm-12 col-md-6 q-px-sm q-py-sm">
          <q-select 
            filled 
            v-model="patient.address.province" 
            :options="province"
            label="Province" 
            stack-label 
            clearable
            maxlength="50"
            option-value="prov_code"
            option-label="name"
            emit-value
            map-options
            :rules="[val => !!val || 'Field is required']"
          />
        </div>
        <div class="col-xs-12 col-sm-12 col-md-6 q-px-sm q-py-sm">
          <q-select 
            filled 
            v-model="patient.address.city" 
            :options="city"
            label="City" 
            stack-label 
            clearable 
            maxlength="50" 
            option-value="mun_code"
            option-label="name"
            emit-value
            map-options
            :rules="[val => !!val || 'Field is required']"
          />
        </div>
        <div class="col-xs-12 col-sm-12 col-md-6 q-px-sm q-py-sm">
          <q-select 
            filled 
            v-model="patient.address.barangay" 
            :options="barangay"
            label="Barangay" 
            stack-label 
            clearable 
            maxlength="50" 
            option-value="brgy_code"
            option-label="name"
            emit-value
            map-options
            :rules="[val => !!val || 'Field is required']"
          />
        </div>
      </q-card-section>
      <q-card-section class="q-py-md q-px-sm row">
        <div class="col-xs-12 col-sm-12 col-md-6 q-px-sm q-py-sm">
          <q-input filled v-model="patient.address.zip" label="Zip / Postal Code" stack-label clearable maxlength="8"  />
        </div>
        <div class="col-xs-12 col-sm-12 col-md-6 q-px-sm q-py-sm">
          <q-input filled v-model="patient.address.line1" label="Address Line 1" stack-label clearable maxlength="50"  />
        </div>
        <div class="col-xs-12 col-sm-12 col-md-6 q-px-sm q-py-sm">
          <q-input filled v-model="patient.address.line2" label="Address Line 2" stack-label clearable maxlength="50"  />
        </div>
      </q-card-section>

      <q-separator inset />

      <q-card-section>
        <div class="text-h6 text-dark text-center">Contact</div>
      </q-card-section>
      <q-card-section class="q-py-md q-px-sm row">
        <div class="col-grow q-px-sm q-py-sm">
          <q-input 
          filled 
          v-model="patient.referred_by" 
          label="Referred by" 
          stack-label
          clearable 
          maxlength="50" />
        </div>
        <div class="col-grow q-px-sm q-py-sm">
          <q-input 
          filled 
          v-model="patient.mobile" 
          label="Mobile No." 
          stack-label
          clearable 
          mask="+63 ### ### ####"
          hint="+63 123 456 7890"
          maxlength="20" />
        </div>
        <div class="col-grow q-px-sm q-py-sm">
          <q-input 
            filled 
            v-model="patient.telephone" 
            label="Telephone No." 
            stack-label 
            clearable 
            maxlength="20" 
            mask="(###) ### - ####"
            hint="(000) 123 - 4567"
          />
        </div>
      </q-card-section>

      <div class="q-my-lg column items-center">
        <div class="col"></div>
        <div class="col">
          <q-btn label="Submit" type="submit" color="primary" :disable="isDisabled" :loading="isDisabled"  />
        </div>
        <div class="col"></div>
      </div>
    </q-card>
  </q-form>

  <PatientModal ref="modal" />

</template>

<script>
import PatientModal from 'src/components/Patients/PatientModal.vue';

import { defineComponent, reactive, onMounted, ref, watchEffect, watch, computed } from 'vue'
import phil from 'philippine-location-json-for-geer'
import _ from 'lodash' 
import { useStore } from 'vuex'

export default defineComponent({

  name: 'PatientComponent',

  components: { PatientModal },
  
  setup() {
    
    const patient = reactive({
      firstname: '',
      lastname: '',
      middlename: '',
      birthdate: '',
      sex: '',
      height: 0,
      height_inches: 0,
      height_unit: 'ft',
      weight: 0,
      weight_unit: 'kg',
      bloodType: '',
      allergies: [],
      occupation: '',
      nationality: '',
      status:'',
      referred_by: '',
      address: {
        region: null,
        province: null,
        city: null,
        barangay: null,       
        zip: '',
        line1: '',
        line2: '',
      },
      telephone: '',
      mobile: '',
    });

    const $store = useStore()
    const modal = ref(null)
    const status = ['Single','Married','Divorced','Separated','Widowed','Complicated']
    const sex = ['Male','Female']
    const wt_unit = ['kg','lb','g','oz']
    const ht_unit = ['cm', 'ft', 'inches','meter']
    const region = ref(null)
    const province = ref(null)
    const city = ref(null)
    const barangay = ref(null)
    
    const isDisabled = computed(() => $store.getters['patient/getsubmitButton'])

    onMounted(() => {
      region.value = phil.regions
      $store.dispatch('patient/setButtonDisabled', false) //enable submit button
    })
    watchEffect(() => {
      province.value = phil.getProvincesByRegion(patient.address.region)
      city.value = phil.getCityMunByProvince(patient.address.province)
      barangay.value = phil.getBarangayByMun(patient.address.city)
    })
    watch(() => _.cloneDeep(
      [patient.address.region, patient.address.province, patient.address.city]), 
      ([curRegion, curProvince, curCity], [prevRegion, prevProvince, prevCity]) => {
        if(curRegion !== prevRegion) {
          patient.address.province = null
          patient.address.city = null
          patient.address.barangay = null
        }
        if(curProvince !== prevProvince){
          patient.address.city = null
          patient.address.barangay = null
        }
        if(curCity !== prevCity){
          patient.address.barangay = null
        }
      }
    )

    const onSubmit = async () => {
      await $store.dispatch('patient/sendPatientAction', patient)
      modal.value.triggerModal()     
    }

    return {
      patient,
      sex,
      wt_unit,
      ht_unit,
      region, //json
      province, //json
      city, //json
      barangay, //json
      status,
      onSubmit,
      modal,
      isDisabled, //button state
    }
  }
})
</script>
