<template>
  <q-card-section class="col-xs-12 col-sm-12 col-md-6 text-center">
        <q-avatar size="203px" v-if="avatarFilePath">
            <img :src="avatarFilePath">
        </q-avatar>
        <q-avatar size="203px" v-else>
            <img :src="require('src/assets/images/avatar-icon.svg')">
        </q-avatar>
        <q-card-section>
            <div class="text-h6" v-if="propPatSelected"> &nbsp;&nbsp; {{ propPatSelected.firstname }} {{ propPatSelected.middlename }} {{ propPatSelected.lastname }}  &nbsp;&nbsp; </div>
            <div class="text-subtitle2">Age: {{ selectedPatientAge }} </div>
            <div class="text-subtitle2">Address: </div>
        </q-card-section>
        <q-card-section class="row justify-center" v-if="avatarFilePath">
            <div class="col-sm-6">
                <SymptomsQChip :patientQChip="propPatSelected" />
            </div>
            <div class="col-sm-6" >
                <DiagnosisQChip :patientQChip="propPatSelected" />
            </div>
        </q-card-section>
    </q-card-section>

    <q-card-section class="div-separator" :style="'display:' +display+ ';'" ></q-card-section>
    <q-separator :vertical="true" class="div-separator" :style="'display:' +display+ ';'" />
    <q-card-section class="div-separator" :style="'display:' +display+ ';'" ></q-card-section>

</template>

<script>
import { defineComponent, computed, onMounted, onUnmounted, ref } from 'vue'
import SymptomsQChip from 'src/components/Records/PatientHistory/SymptomsQChip/SymptomsQChip.vue'
import DiagnosisQChip from 'src/components/Records/PatientHistory/DiagnosisQChip/DiagnosisQChip.vue'
import { calculateAge } from 'src/helper'

export default defineComponent({
    name: 'HistoryDetailsComp',
    props: {
        propPatSelected: Object
    },
    components: {
        SymptomsQChip,
        DiagnosisQChip,
    },
    setup(props) {
        
        //props
        const selectedPatient = computed(() => props.propPatSelected)
        const selectedPatientAge = computed(() => {
            if(selectedPatient.value) {
                return calculateAge(selectedPatient.value.birthdate)
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
        const avatarFilePath = computed(() => {
            if(props.propPatSelected) {
                if(props.propPatSelected.avatar)
                    return props.propPatSelected.avatar
            }
            return ''
        }) 
        
        onMounted(() => { getSize(),window.addEventListener('resize', getSize) })
        onUnmounted(() => { window.removeEventListener('resize', getSize) })

        return {
            selectedPatientAge,
            windowSize,
            display,
            avatarFilePath,
            selectedPatient,
        }
    }
})
</script>

<style scoped>
.div-separator {
    display: block;
}


</style>