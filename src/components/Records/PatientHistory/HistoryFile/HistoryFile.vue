<template>
    <div class="col-sm-6 col-xs-12">
        <q-list dense bordered padding class="rounded-borders" v-if="!isEmpty" style="max-height: 200px; overflow-y: scroll;">
            <q-item clickable v-ripple v-for="file in itemFiles" :key="file.id" @click="getFile(file.file)" >
                <q-item-section avatar>
                    <q-icon color="primary" name="file_download" />
                </q-item-section>
                <q-item-section>
                    <span v-if="file.created_at_formatted">History File - ({{ file.created_at_formatted }})</span>
                </q-item-section>
            </q-item>
        </q-list>
        <q-list v-else>
        </q-list>
    </div>
</template>

<script>

import { defineComponent, ref, watchEffect } from 'vue'
import { useStore } from 'vuex'
import S3 from 'aws-sdk/clients/s3'
import _ from 'lodash'

export default defineComponent({
    name: 'HistoryFile',
    props: {
        historyFile: Object
    },
    
    setup(props) {
        //vuex
        const $store = useStore()
        //props
        const selectedPatient = ref(null)
        //q-item
        const itemFiles = ref(null)
        const isEmpty = ref(null)

        const s3config = {
            apiVersion: '2006-03-01',
            accessKeyId: process.env.AMAZON_ACCESS_KEY_1,
            secretAccessKey: process.env.AMAZON_SECRET_KEY_1,  
            region: "ap-southeast-1"
        }

        const getPatientFiles = async (id) => {
            let { data } = await $store.dispatch('patient/requestPatientFiles', { id })
            itemFiles.value = data
            isEmpty.value = Object.keys(data).length === 0
        }

        watchEffect(() => {
            selectedPatient.value = props.historyFile
            getPatientFiles(selectedPatient.value.id)
        })

        const getFile = (item) => {

            const s3 = new S3(s3config)
            const key = item.split('/');
            const url = s3.getSignedUrl('getObject', {
                Bucket: 'oliver-clinic',
                Key: key[3]+'/'+key[4],
                Expires: 60,
                ResponseContentDisposition :  'attachment; filename="'+item+'"'
            })
            console.log(url)
            window.location.href = url;
        }

        return {
            isEmpty,
            itemFiles,
            getFile
        }
    }
})
</script>

<style>

</style>