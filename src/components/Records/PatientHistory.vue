<template>
    <q-form @submit.prevent="">
        <q-card bordered class="col-xs-12 col-sm-12 col-md-12">
            <q-card-section class="bg-white text-white q-pt-lg">
                <div class="text-h6 text-dark text-center"> Patient History </div>
            </q-card-section>
            <q-separator />

            <div class="q-pa-xs row">
                <q-card-section class="col-xs-12 col-sm-12 col-md-6 text-center">
                    <q-avatar size="223px">
                        <img src="https://cdn.quasar.dev/img/mountains.jpg">
                    </q-avatar>
                    <q-card-section v-if="selectedPatient">
                        <div class="text-h6"> &nbsp;&nbsp; {{ selectedPatient.firstname }} {{ selectedPatient.middlename }} {{ selectedPatient.lastname }}  &nbsp;&nbsp; </div>
                        <div class="text-subtitle2" v-if="selectedPatient">Age: {{ selectedPatientAge }} | windowSize: {{ windowSize }} </div>
                    </q-card-section>
                    <q-card-section class="row justify-center">
                        <div class="col-sm-6" v-if="selectedPatient">
                            <div class="">
                                <q-chip removable size="12px" v-model="gingerbread" @remove="log('Icecream')" color="blue" text-color="white" icon="sick">
                                    Smoker
                                    <q-tooltip>
                                        Some text as content of Tooltip
                                    </q-tooltip>
                                </q-chip>
                                <q-chip removable size="12px" v-model="gingerbread" @remove="log('Icecream')" color="blue" text-color="white" icon="sick">
                                    Fever
                                    <q-tooltip>
                                        Some text as content of Tooltip. [DATE 05/21/1996]
                                    </q-tooltip>
                                </q-chip>
                            </div>
                            <div>
                                <q-chip removable size="12px" v-model="gingerbread" @remove="log('Icecream')" color="blue" text-color="white" icon="sick">
                                    Fever
                                    <q-tooltip>
                                        Some text as content of Tooltip. [DATE 05/21/1996]
                                    </q-tooltip>
                                </q-chip>
                            </div>
                        </div>
                        <div class="col-sm-6" v-if="selectedPatient">
                            <div class="">
                                <q-chip removable size="12px" v-model="gingerbread" @remove="log('Icecream')" color="orange-9" text-color="white" icon="description">
                                    Alchoholic
                                    <q-tooltip>
                                        Some text as content of Tooltip
                                    </q-tooltip>
                                </q-chip>
                                <q-chip removable size="12px" v-model="gingerbread" @remove="log('Icecream')" color="orange-9" text-color="white" icon="description">
                                    Arthritis
                                    <q-tooltip>
                                        Some text as content of Tooltip
                                    </q-tooltip>
                                </q-chip>
                                <q-chip removable size="12px" v-model="gingerbread" @remove="log('Icecream')" color="orange-9" text-color="white" icon="description">
                                    Parkinsons
                                    <q-tooltip>
                                        Some text as content of Tooltip
                                    </q-tooltip>
                                </q-chip>
                            </div>
                        </div>
                    </q-card-section>
                </q-card-section>

                <q-card-section class="div-separator" :style="'display:' +display+ ';'" ></q-card-section>
                <q-separator :vertical="true" class="div-separator" :style="'display:' +display+ ';'" />
                <q-card-section class="div-separator" :style="'display:' +display+ ';'" ></q-card-section>

                <q-card-section class="col-xs-12 col-sm-12 col-md-5 text-center">
                    <!-- <img src="https://cdn.quasar.dev/img/mountains.jpg"> -->
                    <div class="q-pt-lg">
                        <q-card-section>
                            <q-btn outline color="primary" @click="addSymptom" label="Add Symptoms" :disable="isDisabled" />
                        </q-card-section>
                        <div class="symptoms-container" v-if="symptomsRepeater.length">
                            <div v-for="(symp,index) in symptomsRepeater" :key="symp.name">
                                <q-card-section class="q-mb-md">
                                    <!-- Delete button -->
                                    <q-btn @click="removeSymptom(index)" color="white" size="0.8vh" text-color="primary" round icon="close" class="vertical-middle float-right"/> 
                                    <div class="row">
                                        <q-select use-input hide-selected fill-input class="col-grow q-ma-sm" input-debounce="500" label="Symptoms" label-color="blue" color="blue" :options="options" @filter-abort="abortFilterFn" v-model="symp.name">
                                            <template v-slot:no-option>
                                                <q-item>
                                                    <q-item-section class="text-grey">
                                                        No results
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
                                        <q-input v-model="symp.description" type="textarea" label="Description" class="q-mx-sm" color="blue" label-color="blue"  autogrow outlined />
                                    </div>
                                </q-card-section>
                            </div>
                        </div>
                    </div>
                    <div class="q-pt-lg">
                        <q-card-section>
                            <q-btn outline color="orange" @click="addDiagnosis" label="Add Diagnosis" :disable="isDisabled" />
                        </q-card-section>
                        <div class="diagnosis-container" v-if="diagnosisRepeater.length">
                            <div v-for="(diag,index) in diagnosisRepeater" :key="diag.name">
                                <q-card-section class="q-mb-md">
                                    <!-- Delete button -->
                                    <q-btn @click="removeDiagnosis(index)" color="white" size="0.8vh" text-color="orange" round icon="close" class="vertical-middle float-right"/> 
                                    <div class="row">
                                        <q-select v-model="diag.name" use-input hide-selected fill-input input-debounce="500" label-color="orange" label="Diagnosis" color="orange" :options="options" @filter-abort="abortFilterFn" class="col-grow q-ma-sm">
                                            <template v-slot:no-option>
                                                <q-item>
                                                    <q-item-section class="text-grey">
                                                        No results
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
                                        <q-input v-model="diag.description" autogrow outlined label-color="orange" color="orange" type="textarea" label="Description" class="q-mx-sm"/>
                                    </div>
                                </q-card-section>
                            </div>
                        </div>
                        <div class="q-my-lg row">
                            <div class="col">
                            </div>
                            <div class="col-auto q-mr-lg review-button" v-if="true">
                                Review
                            </div>
                            <div class="col-auto">
                                <input type="file" @change="onFileChange" :disabled="isDisabled">
                            </div>
                        </div>
                        <div class="q-my-lg">
                            <div class="col"></div>
                            <div class="col">
                                <q-btn outline @click="sendData" label="Submit" type="submit" :disable="isDisabled" color="primary" />
                            </div>
                            <div class="col"></div>
                        </div>
                    </div>
                </q-card-section>
            </div>
        </q-card>
    </q-form>
</template>

<script>
import { useQuasar, QSpinnerGears } from 'quasar'
import { defineComponent, ref, onMounted, onUnmounted, reactive, computed, watch } from 'vue';
import { useStore } from 'vuex'

export default defineComponent({
    name: 'PatientHistory',
    props: {
        propSelected: Object
    },
    setup(props) {

        const $store = useStore()
        const $q = useQuasar()

        const windowSize = ref(null)
        const avatarSize = ref(null)
        const display = ref(null)
        const onFileChange = ref(null)
        //image
        const imageDisplay = ref(null)
        //chip
        const gingerbread = ref(true)
        //symptom
        const symptomsDescription = ref(null)
        const symptomOption = ref(null)
        const symptomDate = ref(null)
        //diagnosis
        const diagnosisDescription = ref(null)
        const diagnosisOption = ref(null)
        const diagnosisDate = ref(null)
        //repeater fields
        const symptomsRepeater = reactive([])
        const diagnosisRepeater = reactive([])
        //props
        const selectedPatient = computed(() => props.propSelected)
        const selectedPatientAge = computed(() => {
            if(selectedPatient.value) {
                /**
                 * Age Calculation
                 * Author: naveen
                 * Url: https://stackoverflow.com/a/7091965/3362771
                 */

                let date = new Date()
                let birthdate = new Date(selectedPatient.value.birthdate)
                let age = date.getFullYear() - birthdate.getFullYear()
                let mm = date.getMonth() - birthdate.getMonth()
                if(mm < 0 || (mm === 0 && date.getDate() < birthdate.getDate())) {
                    age--
                }
                return age
            }
            return ''
        })
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
        })

        const getSize = () => {
            windowSize.value = window.innerWidth
            if(window.innerWidth <= 500) {
                avatarSize.value = (500 * 0.60)
            } else if(window.innerWidth >= 500) {
                avatarSize.value = (window.innerWidth * 0.40)
            }
            
            //hide div
            if(window.innerWidth < 1025) {
                display.value = "none"
            } else {
                display.value = "block"
            }
        }
        
        onMounted(() => { getSize(),window.addEventListener('resize', getSize) })
        onUnmounted(() => { window.removeEventListener('resize', getSize) })

        const options = ref(['Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'])
        const abortFilterFn = () => { console.log('delayed filter aborted') }

        //symptom repeater
        const addSymptom = () => { symptomsRepeater.push({'name': symptomOption.value, 'description': symptomsDescription.value, 'occured_on': symptomDate.value}); }
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
            $store.dispatch('patient/sendHistorySymptomDiagnosis', {selectedPatient,symptomsRepeater,diagnosisRepeater})
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
                message: 'Something went wrong.',
                timeout: 3000
                })
            })
        }
        
        return { 
            //window Size
            avatarSize,
            windowSize,
            //chip
            gingerbread,
            //fileupload
            onFileChange,
            //image
            imageDisplay,
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
            //diagnosis


            //props
            selectedPatient,
            selectedPatientAge,

            //submit
            isDisabled,
            sendData,

            model: ref(null),
            options,
            abortFilterFn,
            display,
            
        }
    }
})
</script>

<style scoped>
.div-separator {
    display: block;
}

.review-button:hover {
    cursor: pointer;
    text-decoration: underline;
}
</style>