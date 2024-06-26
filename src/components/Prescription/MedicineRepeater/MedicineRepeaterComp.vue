<template>

<!-- Add Medicine -->
<q-card-section class="q-my-sm q-mx-sm row items-center" v-if="type == 'Prescription'">
    <div class="col"></div>
        <q-btn color="positive" @click="addMedicine" label="Add Medicine" :disable="isDisabled" />
    <div class="col"></div>
</q-card-section>

<!-- Medicine Repeater -->
<q-card-section v-if="type == 'Prescription'">
    <div class="medicine-container" style="max-height: 500px; overflow-y: scroll;">
        <div v-for="(medicine, index) in medicineRepeater" :key="index" class="q-mb-md alternate-meds q-pt-sm">
            <div class="row justify-center">
                <q-btn @click="removeMedicine(index)" color="white" size=".8vh" text-color="primary" round icon="close" /> 
            </div>
            <div class="row">
                
                <div class="col-xs-12 col-sm-4 q-pa-xs">
                    <q-select 
                        dense
                        fill-input 
                        hide-selected 
                        input-debounce="300" 
                        label="Medicine"
                        transition-show="scale"
                        transition-hide="scale" 
                        use-input 
                        v-model="medicine.name"
                        @new-value="createMedicineValue"
                        @filter="medfilterFn"
                        :rules="[val => !!val || 'Field is required']"
                        :options="filterOptionMed"
                        >
                        <template v-slot:no-option>
                            <q-item>
                                <q-item-section class="text-grey">
                                    No results (Press enter to save)
                                </q-item-section>
                            </q-item>
                        </template>
                    </q-select> 
                </div>
            
                <div class="col-xs-6 col-sm-4 q-pa-xs">
                    <q-select v-model="medicine.weight_type" dense :options="weightOptions" label="Weight Type" stack-label transition-show="jump-up" transition-hide="jump-up" :rules="[val => !!val || 'Field is required']" />
                </div>
                <div class="col-xs-6 col-sm-4 q-pa-xs">
                    <q-input v-model="medicine.weight" dense type="number" label="Weight Amount" stack-label maxlength="11" :rules="[val => !!val || 'Field is required']" />
                </div>
            </div>
            <div class="row">
                <div class="col-xs-6 col-sm-4 q-pa-xs">
                    <q-input v-model="medicine.interval" dense type="number" label="Interval" stack-label transition-show="jump-up" transition-hide="jump-up" :rules="[val => !!val || 'Field is required']" />
                </div>
                <div class="col-xs-6 col-sm-4 q-pa-xs">
                    <q-select v-model="medicine.frequency" dense :options="frequencyOptions" label="Frequency" stack-label maxlength="11" :rules="[val => !!val || 'Field is required']" />
                </div>
                <div class="col-xs-6 col-sm-4 q-pa-xs">
                    <q-input v-model="medicine.amount" dense type="number" label="Number of Medicine" stack-label maxlength="11" :rules="[val => !!val || 'Field is required']" />
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12 q-pa-xs">
                    <q-input v-model="medicine.description" dense type="textarea" label="Additional Info" stack-label color="blue" maxlength="220" autogrow />
                </div>
            </div>
        </div>
    </div>
</q-card-section>
</template>

<script>
import { defineComponent, ref, reactive, computed, watchEffect, watch } from 'vue'
import { useStore } from 'vuex'
export default defineComponent({
    name: 'MedicineRepeaterComp',

    setup() {
        const $store = useStore()

        const type = computed(() => $store.getters['prescription/GET_PRESCRIPTION_TYPE'])
        const isDisabled = ref(false)
        const weightOptions = [ { label:'Milligrams (mg)', code:'mg' }, { label:'Grams (g)', code:'g' }, { label:'Ounces (oz)', code:'oz' }, { label:'Liters (l)', code:'l'}, { label:'Milliliters (ml)', code: 'ml'} ]
        const frequencyOptions = [ { label:'Day', code:'day' }, { label:'Hour', code:'hour' }, { label:'Week', code:'week' } ]
        
        //Medicine repeater
        const medicineRepeater = reactive([]) //sample
        //Repeater
        const addMedicine = () => { medicineRepeater.push({ 'name':'','weight_type':'','weight':'','frequency':'','interval':'','amount':'','description':'' }) }
        //Medicine dropdown
        let optionsMed = []
        const filterOptionMed = ref(optionsMed)
        const removeMedicine = (event) => { medicineRepeater.splice(event, 1) }

        // watch(medicineRepeater,(newVal,oldVal) => {
        //     // console.log(newVal)
        //     $store.dispatch('prescription/setMedicineRepeater', newVal)
        // }, {deep: true})

        return { 
            //repeater
            medicineRepeater,
            //options
            frequencyOptions,
            weightOptions,
            //button
            isDisabled,
            addMedicine,
            //vuex
            type,
            removeMedicine,
            //medicine dropdown
            filterOptionMed,
            createMedicineValue(val, done) {
                if(val.length >= 2) {
                    if(!optionsMed.includes(val)) {
                        done(val, 'add-unique')
                    }
                }
            },
            medfilterFn(val, update) {
                update(() => {
                    if(val === '') {
                        filterOptionMed.value = optionsMed
                    } else {
                        const needle = val.toLowerCase()
                        filterOptionMed.value = optionsMed.filter( v => v.toLowerCase().indexOf(needle) > -1)
                    }
                })
            }
        }
    }
})
</script>

<style>
.alternate-meds:nth-child(2n) {
    /* border: 1px solid #caccc8e1; */
    background-color: rgba(235, 231, 231, 0.63);
    border-radius: 5px;
}
</style>