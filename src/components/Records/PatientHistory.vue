<template>
    <q-form @submit.prevent="">
        <q-card bordered class="col-xs-12 col-sm-12 col-md-12">
            <q-card-section class="bg-white text-white q-pt-lg">
                <div class="text-h6 text-dark"> Patient History </div>
            </q-card-section>
            <q-separator />
            <q-card-section class="q-py-md q-px-sm row">
                
                <img src="https://cdn.quasar.dev/img/mountains.jpg">

                <q-card-section>
                    <div class="text-h6">Our Changing Planet</div>
                    <div class="text-subtitle2">by John Doe</div>
                </q-card-section>
                <q-card-section class="">
                    asdasdasdasd
                </q-card-section>
               
    
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