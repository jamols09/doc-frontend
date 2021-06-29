<template>
<div v-if="symptomsChip">
    <div v-for="(arry, index) in symptomsChip" :key="index">
        <q-chip removable size="14px" color="blue" text-color="white" icon="sick"  v-for="chip in arry" :key="chip.id">
            {{ chip.name }}
             <q-tooltip class="bg-info text-black shadow-4" transition-show="scale" transition-hide="scale" >
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
    name: 'SymptomsQChip',
    props: {
        patientQChip: Object
    },
    setup(props) {
        //vuex
        const $store = useStore()
        //props
        const selectedPatient = ref(null)
        //chips
        const symptomsChip = ref(null)

        const getPatientSymptoms = async (id) => {
            let { data } = await $store.dispatch('patient/requestPatientsSymptoms', { id })
            symptomsChip.value = groupDataByPropertyValue('history_id', data)
        }

        watchEffect(() => {
            selectedPatient.value = props.patientQChip
            getPatientSymptoms(selectedPatient.value.id)
        })

        return {
            selectedPatient,
            symptomsChip,
        }
    }
})
</script>

<style>

</style>