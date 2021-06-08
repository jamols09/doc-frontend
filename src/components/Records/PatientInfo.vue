<template>
    <q-card flat bordered class="my-card col-sm-12 col-md-6">
        <q-card class="my-card">
            <q-card-section horizontal>
                <q-img
                class="col-5"
                src="https://cdn.quasar.dev/img/parallax1.jpg"
                />
                <q-card-section>
                    Hello World
                </q-card-section>
            </q-card-section>

            <q-separator />

            <q-card-actions>
                <q-btn flat round icon="event" />
                    <q-btn flat>
                        5:30PM
                    </q-btn>
                    <q-btn flat>
                        7:00PM
                    </q-btn>
                    <q-btn flat color="primary">
                        Reserve
                    </q-btn>
            </q-card-actions>
        </q-card>
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