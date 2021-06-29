<template>
<div v-if="diagnosesChip">
    <div v-for="(arry, index) in diagnosesChip" :key="index" >
        <q-chip removable size="15px" color="orange-9" text-color="white" icon="description"  v-for="chip in arry" :key="chip.id">
            {{ chip.name }}
             <q-tooltip class="bg-orange text-black shadow-4" transition-show="scale" transition-hide="scale">
                <span v-if="chip.description">{{ chip.description }}. Occured on <b>{{ chip.occured_on }}</b></span>
                <span v-else> No description. Occured On <b>{{ chip.occured_on }}</b> </span>
            </q-tooltip>
        </q-chip>
    </div>
</div>
<div v-else>
</div> 
</template>

<script>
import { defineComponent, ref, watchEffect } from "vue";
import { useStore } from 'vuex'
import { groupDataByPropertyValue } from 'src/helper'

export default defineComponent({
    name: 'DiagnosisQChip',
    props: {
        patientQChip: Object
    },
    setup(props) {
        //vuex
        const $store = useStore()
        //props
        const selectedPatient = ref(null)
        //chips
        const diagnosesChip = ref(null)
        
        const getPatientDiagnosis = async (id) => {
            let { data } = await $store.dispatch('patient/requestPatientDiagnoses', { id })
            diagnosesChip.value = groupDataByPropertyValue('history_id', data)
        }

        watchEffect(() => {
            selectedPatient.value = props.patientQChip
            getPatientDiagnosis(selectedPatient.value.id)
        })

        return {
            selectedPatient,
            diagnosesChip
        }
    }
})
</script>

<style>

</style>