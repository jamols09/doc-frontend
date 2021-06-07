<template>
    <q-form @submit.prevent="">
        <q-card bordered class="col-xs-12 col-sm-12 col-md-6">
            <q-card-section class="bg-teal text-white q-pt-lg">
                <div class="text-h6"> Patient History </div>
            </q-card-section>
            <q-card-section class="q-py-md q-px-sm row">
                <div class="q-px-sm q-py-sm">
                    <q-input filled v-model="data" class="text-capitalize" label="Last Name" stack-label clearable maxlength="50" />
                </div>
            </q-card-section>
        </q-card>
    </q-form>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'PatientHistory',
    setup() {
        
        const data = ref(null)
   
        return { data }
    }
})
</script>

<style scoped>

</style>