<template>
  <q-card-section class="col-xs-12 col-sm-12 col-md-6 text-center">
        <q-avatar size="203px">
            <img src="https://cdn.quasar.dev/img/mountains.jpg">
        </q-avatar>
        <q-card-section v-if="propPatSelected">
            <div class="text-h6"> &nbsp;&nbsp; {{ propPatSelected.firstname }} {{ propPatSelected.middlename }} {{ propPatSelected.lastname }}  &nbsp;&nbsp; </div>
            <div class="text-subtitle2">Age: {{ selectedPatientAge }} | windowSize: {{ windowSize }} </div>
            <div class="text-subtitle2">Address: </div>
        </q-card-section>
        <q-card-section class="row justify-center" v-if="propPatSelected">
            <div class="col-sm-6">
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
            <div class="col-sm-6" >
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

</template>

<script>
import { defineComponent, computed, onMounted, onUnmounted, ref } from 'vue';

export default defineComponent({
    name: 'HistoryDetailsComp',
    props: {
        propPatSelected: Object
    },
    setup(props) {
        
        //props
        const selectedPatient = computed(() => props.propPatSelected)
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
        //Avatar size
        const windowSize = ref(null)
        const avatarSize = ref(null)
        const display = ref(null)
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

        //chip
        const gingerbread = ref(true)
        
        onMounted(() => { getSize(),window.addEventListener('resize', getSize) })
        onUnmounted(() => { window.removeEventListener('resize', getSize) })

        return {
            selectedPatientAge,
            windowSize,
            gingerbread,
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