<template>

<!-- Add Medicine -->
<q-card-section class="q-py-sm q-px-sm row items-center" v-if="prescription.type == 'Prescription'">
    <div class="col"></div>
    <q-btn color="positive" @click="addMedicine" label="Add Medicine" :disable="isDisabled" />
    <div class="col"></div>
</q-card-section>

<!-- Medicine Repeater -->
<q-card-section v-if="prescription.type == 'Prescription'">
    <div class="medicine-container">
        <div v-for="(medicine, index) in medicineRepeater" :key="index">
            <div class="row">
                
                <!-- <div class="col-xs-12 col-sm-4 q-pa-xs">
                <q-select 
                    use-input 
                    hide-selected 
                    fill-input 
                    class="col-grow q-ma-sm" 
                    input-debounce="300" 
                    label="Diagnosis"
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
                </div> -->
            
                <div class="col-xs-12 col-sm-4 q-pa-xs">
                    <q-select v-model="prescription.weightType" :options="weightOptions" label="Weight Type" stack-label transition-show="jump-up" transition-hide="jump-up" :rules="[val => !!val || 'Field is required']" />
                </div>
                <div class="col-xs-12 col-sm-4 q-pa-xs">
                    <q-input v-model="prescription.weight" type="number" label="Weight Amount" stack-label maxlength="11" :rules="[val => !!val || 'Field is required']" />
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12 col-sm-4 q-pa-xs">
                    <q-input v-model="prescription.interval" type="number" label="Interval" stack-label transition-show="jump-up" transition-hide="jump-up" :rules="[val => !!val || 'Field is required']" />
                </div>
                <div class="col-xs-12 col-sm-4 q-pa-xs">
                    <q-select v-model="prescription.frequency" :options="frequencyOptions" label="Frequency" stack-label maxlength="11" :rules="[val => !!val || 'Field is required']" />
                </div>
                <div class="col-xs-12 col-sm-4 q-pa-xs">
                    <q-input v-model="prescription.amount" type="number" label="Number of Medicine" stack-label maxlength="11" :rules="[val => !!val || 'Field is required']" />
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12 q-pa-xs">
                    <q-input v-model="prescription.description" type="textarea" label="Addition Info" stack-label color="blue" maxlength="220" autogrow />
                </div>
            </div>
        </div>
    </div>
</q-card-section>
</template>

<script>
import { defineComponent, ref, reactive } from 'vue'
import { useStore } from 'vuex'
export default defineComponent({
    name: 'MedicineRepeaterComp',

    setup() {
        const $store = useStore()

        const prescription = reactive({
            template: '',
            type: 'Free Form',
            medicine: '',
            weightType: '',
            weight: '',
            description: '',
            frequency: '', // 3 times
            interval: 1, // day, weeks, hours
            amount: 1,
            signature: ''
        })

        const isDisabled = ref(false)
        const weightOptions = [ { label:'Milligrams', code:'mg' }, { label:'Grams', code:'g' }, { label:'Ounces', code:'oz' }, { label:'Liters', code:'l'}, { label:'Milliliters', code: 'ml'} ]
        const frequencyOptions = [ { label:'Day', code:'day' }, { label:'Hour', code:'hour' }, { label:'Week', code:'week' } ]
        //Medicine repeater
        const medicineRepeater = ref([1]) //sample
        //Repeater
        const addMedicine = () => { 
            
        }

        return { 
            //repeater
            medicineRepeater,
            prescription,
            //options
            frequencyOptions,
            weightOptions,
            //button
            isDisabled,
            addMedicine,
        }
    }
})
</script>

<style>

</style>