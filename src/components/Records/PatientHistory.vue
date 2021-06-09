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
                </q-card-section>

                <q-card-section class="div-separator" :style="'display:' +display+ ';'" ></q-card-section>
                <q-separator :vertical="true" class="div-separator" :style="'display:' +display+ ';'" />
                <q-card-section class="div-separator" :style="'display:' +display+ ';'" ></q-card-section>

                <q-card-section class="col-xs-12 col-sm-12 col-md-5 text-center">
                    <!-- <img src="https://cdn.quasar.dev/img/mountains.jpg"> -->
                    <q-card-section>
                        <div class="text-h6">Symptoms</div>
                        <!-- <div class="text-subtitle2">by John Doe</div> -->
                    </q-card-section>
                    <q-card-section>
                        <q-select
                            filled
                            v-model="model"
                            use-input
                            hide-selected
                            fill-input
                            input-debounce="500"
                            :options="options"
                            label="Symptoms"
                            @filter-abort="abortFilterFn"
                            style="width: auto"
                        >
                            <template v-slot:no-option>
                                <q-item>
                                    <q-item-section class="text-grey">
                                        No results
                                    </q-item-section>
                                </q-item>
                            </template>
                        </q-select>
                        <br/>
                        <q-input
                            v-model="symptomsDescription"
                            filled
                            type="textarea"
                            label="Description"
                        />
                    </q-card-section>
                    <q-card-section>
                        <q-select
                            filled
                            v-model="model"
                            use-input
                            hide-selected
                            fill-input
                            input-debounce="500"
                            :options="options"
                            label="Diagnosis"
                            @filter-abort="abortFilterFn"
                            style="width: auto"
                        >
                            <template v-slot:no-option>
                                <q-item>
                                    <q-item-section class="text-grey">
                                        No results
                                    </q-item-section>
                                </q-item>
                            </template>
                        </q-select>
                        <br/>
                        <q-input
                            v-model="symptomsDescription"
                            filled
                            type="textarea"
                            label="Description"
                        />
                    </q-card-section>

                    <div class="q-my-lg column items-center">
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
            display
        }
    }
})
</script>

<style scoped>
.div-separator {
    display: block;
}
</style>