<template>
    <q-card flat bordered class="my-card col-sm-12 col-md-6">
        <q-card-section class="bg-teal text-white q-pt-lg">
            <div class="text-h6">Patient Info</div>
        </q-card-section>
        <q-card-section class="q-py-md q-px-sm row">
            <div class="q-px-sm q-py-sm">
                <q-input filled v-model="data" class="text-capitalize" label="Last Name" stack-label clearable maxlength="50" />
            </div>
        </q-card-section>
    </q-card>
</template>

<script>

import { defineComponent, ref } from 'vue'
export default defineComponent({

    setup() {
        const data = ref(null)

        return { data }
    }
})
</script>

<style>

</style>