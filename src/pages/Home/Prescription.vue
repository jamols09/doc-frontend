<template>
    <q-page class="wrap gutter row">
        <div class="q-pa-sm col-xs-12 col-md-6">
            <PrescriptionFieldsComp />
        </div>
    </q-page>
</template>

<script>
import PrescriptionFieldsComp from 'src/components/Prescription/PrescriptionFieldsComp.vue'
import { defineComponent } from 'vue'
export default defineComponent({
    components: {
        PrescriptionFieldsComp,
    },
    setup() {
        return {}
    }
})
</script>

<style>

</style>