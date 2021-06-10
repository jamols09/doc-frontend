<template>
    <q-form @submit.prevent="">
        <q-card bordered class="col-xs-12 col-sm-12 col-md-12">
            <q-card-section class="bg-white text-white q-pt-lg">
                <div class="text-h6 text-dark text-center"> Patient History </div>
            </q-card-section>
            <q-separator />

            <div class="q-pa-xs row">
                <q-card-section class="col-xs-12 col-sm-12 col-md-6 text-center">
                    <q-avatar size="233px">
                        <!-- <q-img src="https://cdn.quasar.dev/img/mountains.jpg" sizes="(max-width: 400px) 400w"></q-img> -->
                        <img src="https://cdn.quasar.dev/img/mountains.jpg">
                    </q-avatar>
                    <q-card-section>
                        <div class="text-h6"> &nbsp;&nbsp; Oliver Veloso Maglana  &nbsp;&nbsp; </div>
                        <div class="text-subtitle2">Age {{ windowSize }} </div>
                    </q-card-section>
                    <q-card-section class="row justify-center">
                        <div class="col-sm-6">
                            <div class="">
                                <q-chip removable size="12px" v-model="gingerbread" @remove="log('Icecream')" color="red" text-color="white" icon="sick">
                                    Smoker
                                    <q-tooltip>
                                        Some text as content of Tooltip
                                    </q-tooltip>
                                </q-chip>
                                <q-chip removable size="12px" v-model="gingerbread" @remove="log('Icecream')" color="red" text-color="white" icon="sick">
                                    Fever
                                    <q-tooltip>
                                        Some text as content of Tooltip. [DATE 05/21/1996]
                                    </q-tooltip>
                                </q-chip>
                            </div>
                            <div>
                                <q-chip removable size="12px" v-model="gingerbread" @remove="log('Icecream')" color="red" text-color="white" icon="sick">
                                    Fever
                                    <q-tooltip>
                                        Some text as content of Tooltip. [DATE 05/21/1996]
                                    </q-tooltip>
                                </q-chip>
                            </div>
                        </div>
                        <div class="col-sm-6">
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
                    <q-card-section>
                        <div class="text-h6">Symptoms</div>
                    </q-card-section>
                    <q-card-section>
                        <div class="row">
                            <q-select
                                outlined 
                                v-model="model"
                                use-input
                                hide-selected
                                fill-input
                                input-debounce="500"
                                :options="options"
                                label="Symptoms"
                                @filter-abort="abortFilterFn"
                                class="col-grow q-ma-sm"
                            >
                                <template v-slot:no-option>
                                    <q-item>
                                        <q-item-section class="text-grey">
                                            No results
                                        </q-item-section>
                                    </q-item>
                                </template>
                            </q-select>
                            <!-- DATE -->
                            <q-input 
                                outlined  
                                v-model="symptomDate" 
                                mask="date" 
                                :rules="['date']" 
                                class="col-grow q-ma-sm"
                            >
                                <template v-slot:append>
                                    <q-icon name="event" class="cursor-pointer">
                                    <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                                        <q-date v-model="symptomDate">
                                        <div class="row items-center justify-end">
                                            <q-btn v-close-popup label="Close" color="primary" flat />
                                        </div>
                                        </q-date>
                                    </q-popup-proxy>
                                    </q-icon>
                                </template>
                            </q-input>
                         </div>
                        <br/>
                        <!-- Textarea -->
                        <q-input
                            v-model="symptomsDescription"
                            outlined 
                            type="textarea"
                            label="Description"
                            class="q-mx-sm"
                        />
                    </q-card-section>
                    <q-card-section>
                        <div class="text-h6">Diagnosis</div>
                    </q-card-section>
                    <q-card-section>
                        <div class="row">
                            <q-select
                                outlined 
                                v-model="model"
                                use-input
                                hide-selected
                                fill-input
                                input-debounce="500"
                                :options="options"
                                label="Diagnosis"
                                @filter-abort="abortFilterFn"
                                class="col-grow q-ma-sm"
                            >
                                <template v-slot:no-option>
                                    <q-item>
                                        <q-item-section class="text-grey">
                                            No results
                                        </q-item-section>
                                    </q-item>
                                </template>
                            </q-select>
                            <!-- DATE -->
                            <q-input 
                                outlined  
                                v-model="symptomDate" 
                                mask="date" 
                                :rules="['date']" 
                                class="col-grow q-ma-sm"
                            >
                                <template v-slot:append>
                                    <q-icon name="event" class="cursor-pointer">
                                    <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                                        <q-date v-model="symptomDate">
                                        <div class="row items-center justify-end">
                                            <q-btn v-close-popup label="Close" color="primary" flat />
                                        </div>
                                        </q-date>
                                    </q-popup-proxy>
                                    </q-icon>
                                </template>
                            </q-input>
                        </div>
                        <br/>
                        <!-- Textarea -->
                        <q-input
                            v-model="symptomsDescription"
                            outlined 
                            type="textarea"
                            label="Description"
                            class="q-mx-sm"
                        />
                    </q-card-section>
                    <div class="q-my-lg row">
                        <div class="col"></div>
                        <div class="col-auto q-mr-lg review-button" v-if="true">
                            Review
                        </div>
                        <div class="col-auto">
                            <input type="file" @change="onFileChange">
                        </div>
                    </div>
                    <div class="q-my-lg">
                        <div class="col"></div>
                        <div class="col">
                            <q-btn label="Submit" type="submit" color="primary" />
                        </div>
                        <div class="col"></div>
                    </div>
                </q-card-section>
            </div>
        </q-card>
    </q-form>
</template>

<script>
import { defineComponent, ref, onMounted, onUnmounted, computed } from 'vue';

export default defineComponent({
    name: 'PatientHistory',
    setup() {
        
        const data = ref(null)
        const windowSize = ref(null)
        const avatarSize = ref(null)
        const display = ref(null)
        const onFileChange = ref(null)
        //image
        const imageDisplay = ref(null)
        //Chip
        const gingerbread = ref(true)
        const symptomDate = ref(true)

        const getSize = () => {
            windowSize.value = window.innerWidth
            if(window.innerWidth <= 500) {
                avatarSize.value = (500 * 0.60)
            }
            else if(window.innerWidth >= 500) {
                avatarSize.value = (window.innerWidth * 0.40)
            }
            //Hide Div
            if(window.innerWidth < 1025) {
                display.value = "none"
            } else {
                display.value = "block"
            }
        }
        
        onMounted(() => { getSize(),window.addEventListener('resize', getSize) })
        onUnmounted(() => { window.removeEventListener('resize', getSize) })

        const stringOptions = ['Google', 'Facebook', 'Twitter', 'Apple', 'Oracle']
        const options = ref(stringOptions)
        const symptomsDescription = ref(null)
        const abortFilterFn = () => {
            console.log('delayed filter aborted')
        }
   
        return { 
            //window Size
            data,
            avatarSize,
            windowSize,
            //Symptoms
            model: ref(null),
            options,
            abortFilterFn,
            symptomsDescription,
            display,
            symptomDate,
            //Chip
            gingerbread,
            //Fileupload
            onFileChange,
            //Image
            imageDisplay,
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