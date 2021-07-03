<template>
<q-page class="q-pa-sm">
    <div class="q-pa-sm">
        <PrescriptionComp />
    </div>
  </q-page>
</template>

<script>
import PrescriptionComp from 'src/components/Prescription/PrescriptionComp.vue'
import { defineComponent } from 'vue'
export default defineComponent({
    components: {
        PrescriptionComp,
    },
    setup() {



        return {

        }
    }
})
</script>

<style>

</style>