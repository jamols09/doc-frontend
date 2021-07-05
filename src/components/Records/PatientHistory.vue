<template>
    <q-form @submit.prevent="">
        <q-card bordered class="col-xs-12 col-sm-12 col-md-12">
            <q-card-section class="bg-white text-white q-pt-lg">
                <div class="text-h6 text-dark text-center"> Patient History </div>
            </q-card-section>
            <q-separator />
            <div class="q-pa-xs row">
                <HistoryDetailsComp :propPatSelected="selectedPatient" />
                <q-card-section class="col-xs-12 col-sm-12 col-md-5 text-center">
                    <div class="q-pt-lg">
                        <q-card-section>
                            <q-btn color="primary" @click="addSymptom" label="Add Symptoms" :disable="isDisabled" />
                        </q-card-section>
                        <div class="symptoms-container" v-if="symptomsRepeater.length">
                            <div v-for="(symp,index) in symptomsRepeater" :key="symp.name">
                                <q-card-section class="q-mb-md">
                                    <!-- Delete button -->
                                    <q-btn @click="removeSymptom(index)" color="white" size="0.8vh" text-color="primary" round icon="close" class="vertical-middle float-right"/> 
                                    <div class="q-my-sm row">
                                        <!-- Symptoms Dropdown -->
                                        <q-select 
                                            use-input 
                                            hide-selected 
                                            fill-input 
                                            class="col-grow q-ma-sm" 
                                            input-debounce="300" 
                                            label="Symptoms"
                                            label-color="blue" 
                                            color="blue" 
                                            transition-show="scale" 
                                            transition-hide="scale" 
                                            :options="filterOptionsSymp"
                                            v-model="symp.name"
                                            @new-value="createSympValue"
                                            @filter="sympfilterFn">
                                            <template v-slot:no-option>
                                                <q-item>
                                                    <q-item-section class="text-grey">
                                                        No results (Press enter to save)
                                                    </q-item-section>
                                                </q-item>
                                            </template>
                                        </q-select>
                                        <!-- DATE -->
                                        <q-input v-model="symp.occured_on" color="blue" mask="date" :rules="['date']" label-color="blue" class="col-grow q-ma-sm" label="YYYY-MM-DD">
                                            <template v-slot:append>
                                                <q-icon name="event" color="blue"  class="cursor-pointer">
                                                    <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                                                        <q-date v-model="symp.occured_on">
                                                            <div class="row items-center justify-end">
                                                                <q-btn v-close-popup label="Close" color="primary" flat />
                                                            </div>
                                                        </q-date>
                                                    </q-popup-proxy>
                                                </q-icon>
                                            </template>
                                        </q-input>
                                    </div>
                                    <!-- Textarea -->
                                    <div style="max-width: auto; max-height: 40px;">
                                        <q-input v-model="symp.description" type="textarea" label="Description" class="q-mx-sm" color="blue" label-color="blue" maxlength="210" autogrow />
                                    </div>
                                </q-card-section>
                            </div>
                        </div>
                    </div>
                    <div class="q-pt-lg">
                        <q-card-section>
                            <q-btn color="orange" @click="addDiagnosis" label="Add Diagnosis" :disable="isDisabled" />
                        </q-card-section>
                        <div class="diagnosis-container" v-if="diagnosisRepeater.length">
                            <div v-for="(diag,index) in diagnosisRepeater" :key="diag.name">
                                <q-card-section class="q-mb-md">
                                    <!-- Delete button -->
                                    <q-btn @click="removeDiagnosis(index)" color="white" size="0.8vh" text-color="orange" round icon="close" class="vertical-middle float-right"/> 
                                    <div class="q-my-sm row">
                                        <!-- Diagnosis Dropdown -->
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
                                        <!-- DATE -->
                                        <q-input v-model="diag.occured_on" mask="date" :rules="['date']" label-color="orange" color="orange" class="col-grow q-ma-sm" label="YYYY-MM-DD">
                                            <template v-slot:append>
                                                <q-icon name="event" color="orange" class="cursor-pointer">
                                                    <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                                                        <q-date v-model="diag.occured_on">
                                                            <div class="row items-center justify-end">
                                                                <q-btn v-close-popup label="Close" color="primary" flat />
                                                            </div>
                                                        </q-date>
                                                    </q-popup-proxy>
                                                </q-icon>
                                            </template>
                                        </q-input>
                                    </div>
                                    <!-- Textarea -->
                                    <div style="max-width: auto; max-height: 40px;">
                                        <q-input v-model="diag.description" autogrow label-color="orange" color="orange" type="textarea" maxlength="210" label="Description" class="q-mx-sm"/>
                                    </div>
                                </q-card-section>
                            </div>
                        </div>
                        <div class="q-my-sm row">
                            <div class="q-py-sm col-md-4 col-xs-12" >
                                <!-- DATE -->
                                <q-input filled v-model="historyDate" mask="date" :rules="['date']" label="History Date" style="max-width: 300px; display: block; margin: 0 auto;" v-if="historyfiles">
                                    <template v-slot:append>
                                        <q-icon name="event" class="cursor-pointer">
                                            <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                                                <q-date v-model="historyDate">
                                                    <div class="row items-center justify-end">
                                                        <q-btn v-close-popup label="Close" color="primary" flat />
                                                    </div>
                                                </q-date>
                                            </q-popup-proxy>
                                        </q-icon>
                                    </template>
                                </q-input>
                            </div>
                            <div class="q-py-sm col-md-4 col-xs-12">
                               <q-btn color="primary" label="Review" v-if="historyfiles" @click="reviewImage = true"  />
                            </div>
                            <div class="q-py-sm col-md-4 col-xs-12">
                                <!-- File upload -->
                                <q-file
                                    v-model="historyfiles"
                                    label="Pick files"
                                    filled
                                    counter
                                    :counter-label="counterLabelFn"
                                    max-files="1"
                                    multiple
                                    style="max-width: 300px; display: block; margin: 0 auto;"
                                    :disable="isDisabled"
                                    @change="onUploadFile"
                                >
                                    <template v-slot:prepend>
                                        <q-icon name="attach_file" />
                                    </template>
                                </q-file>
                            </div>
                        </div>
                        <div class="q-my-lg">
                            <div class="col"></div>
                            <div class="col">
                                <q-btn @click="sendData" label="Submit" type="submit" :disable="isDisabled" color="primary" />
                            </div>
                            <div class="col"></div>
                        </div>
                    </div>
                </q-card-section>
            </div>
        </q-card>
    </q-form>

    <q-dialog v-model="reviewImage">
      <q-card class="">
        <q-card-section>
          <div class="text-h6 text-center">Review</div>
        </q-card-section>
        <!-- Modal Image -->
        <q-card-section class="q-py-md">
            <div v-if="historyImg">
                <img :src="historyImg" style="max-width: 90%; max-height: 70%; margin-left: auto; margin-right: auto; display: block;"/>
            </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

</template>

<script>
import { useQuasar, QSpinnerGears } from 'quasar'
import { defineComponent, ref, onMounted, onUnmounted, reactive, computed, watch } from 'vue'
import { useStore } from 'vuex'

import HistoryDetailsComp from 'src/components/Records/PatientHistory/HistoryDetailsComp.vue'

export default defineComponent({
    name: 'PatientHistory',
    components: {
        HistoryDetailsComp,
    },
    props: {
        propSelected: Object
    },
    setup(props) {

        const $store = useStore()
        const $q = useQuasar()

        //history
        const historyDate = ref(null)
        const historyfiles = ref(null)
        const reviewImage = ref(null)
        const historyImg = ref(null)
        //symptom
        const symptomsDescription = ref(null)
        const symptomOption = ref(null)
        const symptomDate = ref(null)
        //symptoms dropdown
        //diagnosis
        const diagnosisDescription = ref(null)
        const diagnosisOption = ref(null)
        const diagnosisDate = ref(null)
        //repeater fields
        const symptomsRepeater = reactive([])
        const diagnosisRepeater = reactive([])
        //props
        const selectedPatient = computed(() => props.propSelected)

        const isDisabled = computed(() => {
            if(!selectedPatient.value) {
                return true
            }
            return false
        })
        
        watch(isDisabled, (now, old) => {
            //clear array when no patient selected
            symptomsRepeater.splice(0)
            diagnosisRepeater.splice(0)
            historyDate.value = null
            historyfiles.value = null
        })

        let optionsSymp = []
        let optionsDiag = []
        const filterOptionsSymp = ref(optionsSymp)
        const filterOptionDiag = ref(optionsDiag)

        onMounted(() => {
            const loadSymptoms = async () => {
                const result = await $store.dispatch('patient/requestSymptomsDropdown')
                optionsSymp.length = 0;
                result.data.forEach(result => {
                    optionsSymp.push(result.name)
                });
            }
            const loadDiagnoses = async () => {
                const result = await $store.dispatch('patient/requestDiagnosesDropdown')
                optionsDiag.length = 0;
                result.data.forEach(result => {
                    optionsDiag.push(result.name)
                });
            }
            loadSymptoms()
            loadDiagnoses()
        })

        const onUploadFile = (e) => {
            const file = e.target.files[0]
            historyImg.value = URL.createObjectURL(file)
        }

        //symptom repeater
        const addSymptom = () => { symptomsRepeater.push({'name': symptomOption.value, 'description': symptomsDescription.value, 'occured_on': symptomDate.value}) }
        const addDiagnosis = () => { diagnosisRepeater.push({'name': diagnosisOption.value, 'description' : diagnosisDescription.value, 'occured_on': diagnosisDate.value}) }
        const removeDiagnosis = (event) => { diagnosisRepeater.splice(event, 1) }
        const removeSymptom = (event) => { symptomsRepeater.splice(event, 1) }

        //send data to server
        const sendData = () => {
            const notify = $q.notify({
                spinner: QSpinnerGears,
                message: 'Submitting details',
                position: 'center',
                timeout: 0
            })
            $store.dispatch('patient/sendHistorySymptomDiagnosis', {selectedPatient,symptomsRepeater,diagnosisRepeater,historyfiles,historyDate})
            .then((res) => {
                notify()
                $q.notify({
                    color: 'green-5',
                    textColor: 'white',
                    position: 'center',
                    type: 'positive',
                    message: 'Details submitted.',
                    timeout: 3000
                })
                symptomsRepeater.length = 0
                diagnosisRepeater.length = 0
            })
            .catch((err) => {
                notify()
                    $q.notify({
                    color: 'red-5',
                    textColor: 'white',
                    position: 'center',
                    type: 'negative',
                    message: 'Something went wrong. ' + err,
                    timeout: 3000
                })
            })
        }

        return { 
            //symptom repeater
            addSymptom,
            symptomsRepeater,
            removeSymptom,
            //diagnosis repeater
            addDiagnosis,
            diagnosisRepeater,
            removeDiagnosis,
            //symptom
            symptomsDescription,
            symptomDate,
            symptomOption,
            //history
            historyDate,
            reviewImage,
            onUploadFile,
            historyImg,
            //props
            selectedPatient,
            //submit
            isDisabled,
            sendData,
            
            //symptoms dropdown
            filterOptionsSymp,
            createSympValue(val, done) {
                if(val.length >= 2) {
                    if(!optionsSymp.includes(val)){
                        done(val, 'add-unique')
                    }
                }
            },
            sympfilterFn (val, update) {
                update(() => {
                    if(val === '') {
                        filterOptionsSymp.value = optionsSymp
                    }
                    else {
                        const needle = val.toLowerCase()
                        filterOptionsSymp.value = optionsSymp.filter( v => v.toLowerCase().indexOf(needle) > -1)
                    }
                })
            },
            //Diagnosis Dropdown
            filterOptionDiag,
            createDiagValue(val, done) {
                if(val.length >= 2) {
                    if(!optionsDiag.includes(val)){
                        done(val, 'add-unique')
                    }
                }
            },
            diagfilterFn (val, update) {
                update(() => {
                    if(val === '') {
                        filterOptionDiag.value = optionsDiag
                    }
                    else {
                        const needle = val.toLowerCase()
                        filterOptionDiag.value = optionsDiag.filter( v => v.toLowerCase().indexOf(needle) > -1)
                    }
                })
            },
            //history fileupload
            historyfiles,
            counterLabelFn ({ totalSize, filesNumber, maxFiles }) {
                return `${filesNumber} files of ${maxFiles} | ${totalSize}`
            }
        }
    }
})
</script>

