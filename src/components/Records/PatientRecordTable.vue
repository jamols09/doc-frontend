<template>
    <!-- Number of Records -->
    <q-card flat bordered class="my-card">
        <div>
            <q-table
                title="Treats"
                style="height: 470px"
                class="patient-table-sticky-header"
                :rows="rows"
                :columns="columns"
                :loading="loading"
                :filter="filter"
                :separator="separator"
                v-model:selected="selected"
                v-model:pagination="pagination"
                row-key="id"
                binary-state-sort
                selection="single"
                @request="onRequest"
            >
                <!-- Search Filter -->
                <template v-slot:top-left>
                    <q-input outlined  dense debounce="1000" v-model="filter" placeholder="Search">
                        <template v-slot:append>
                            <q-icon name="search" />
                        </template>
                    </q-input>
                </template>

                <!-- Filter type -->
                <template v-slot:top-right>
                    <q-select outlined  dense v-model="filterType" emit-value :options="options" hint="Filter Type" />
                </template>

                <!-- Avatar -->
                <template v-slot:body-cell-avatar="props"> <!-- body-cell-[field-name-of-column] -->
                    <q-td :props="props">
                        <q-avatar v-if="props.col.name == 'avatar'" class="shadow-10">
                            <img :src="props.row.avatar">
                        </q-avatar>
                    </q-td>
                </template>

            </q-table>
        </div>
    </q-card>
</template>

<script>

const columns = [
  { name: 'id', align: 'center', label: 'ID', field: 'id', sortable: true },
  { name: 'firstname', align: 'center', label: 'First name', field: 'firstname', sortable: true },
  // (optional) if we use visible-columns, this col will always be visible
  // row Object property to determine value for this column // OR field: row => row.some.nested.prop,
  { name: 'middlename', required: true, label: 'Middle name', align: 'center', field: row => row.middlename, format: val => `${val}`, sortable: true },
  { name: 'lastname', align: 'center', label: 'Last name', field: 'lastname', sortable: true },
  { name: 'birthdate', align: 'center', label: 'Birthdate (y-m-d)', field: 'birthdate', sortable: true },
  { name: 'occupation', align: 'center', label: 'Occupation', field: 'occupation', sortable: true },
  { name: 'referred_by', align: 'center', label: 'Referred by', field: 'referred_by', sortable: true },
  { name: 'telephone', align: 'center', label: 'Telephone', field: 'telephone', sortable: true },
  { name: 'mobile', align: 'center', label: 'Mobile', field: 'mobile', sortable: true },
]

import { defineComponent, ref, onMounted } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
name: 'PatientRecordTable',
    setup() 
    {
        const $store = useStore()

        //declare empty dropdown
        const options = [
            {label:'None', code: ''},
            {label:'First name', code: 'firstname'},
            {label:'Middle name', code: 'middlename'},
            {label:'Last name', code: 'lastname'},
            {label:'Birthdate', code: 'birthdate'},
            {label:'Occupation', code: 'occupation'},
            {label:'Referred by', code: 'referred_by'},
            {label:'Telephone', code: 'telephone'}
            
        ]

        const selected = ref([])
        const rows = ref([])
        const filter = ref('')
        const filterType = ref('')
        const loading = ref(false)
        const pagination = ref({
            sortBy: 'id',
            descending: false,
            page: 1,
            rowsPerPage: 10,
            rowsNumber: 10
        })
        const separator = ref('horizontal')

        function onRequest (props) {
            
            const { page, rowsPerPage, sortBy, descending } = props.pagination
            const filter = props.filter === undefined ? '' : props.filter
            const fetchCount = rowsPerPage === 0 ? pagination.value.rowsNumber : rowsPerPage
            loading.value = true
            const type = filterType.value.code === undefined ? '' : filterType.value.code
            $store.dispatch('patient/requestPatientTable', { page, fetchCount, filter, sortBy, descending, type }).then( data => {
                rows.value.splice(0, rows.value.length, ...data.data.data)
                pagination.value.rowsNumber = data.data.total
                pagination.value.page = data.data.current_page
                pagination.value.rowsPerPage = data.data.per_page
                pagination.value.sortBy = sortBy
                pagination.value.descending = descending
                loading.value = false
            })
        }

        onMounted(() => {
            // get initial data from server (1st page)
            onRequest({
                pagination: pagination.value,
                filter: undefined,
                filterType: undefined
            })
            //Set default value of dropdown
            filterType.value = {label:'None', code: ''}
        })

        return {
            filter,
            filterType,
            loading,
            pagination,
            columns,
            rows,
            selected: selected,
            onRequest,
            separator,
            options, //dropdown options
            
        }
    }

})
</script>

<style lang="sass">
.patient-table-sticky-header
  /* height or max-height is important */
  height: 310px
    
  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: #c9f1e6

  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 0

  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
</style>