<template>
  <q-card-section>
  <!-- Number of Records -->

    <q-table
      style="height: 420px"
      class="patient-table-sticky-header"
      :rows="rows"
      :columns="columns"
      :loading="loading"
      :filter="filter"
      v-model:selected="selected"
      v-model:pagination="pagination"
      row-key="id"
      selection="single"
      binary-state-sort
      @request="onRequest"
      :visible-columns="columnDisplay"
      :hide-selected-banner="true"
    >
      <!-- Search Filter -->
      <template v-slot:top-left>
        <q-input outlined dense debounce="1000" v-model="filter" placeholder="F M S" hint="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
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

  </q-card-section>
</template>

<script>

const columns = [
  { name: 'id', align: 'center', label: 'ID', field: 'id', sortable: true },
  { name: 'avatar', align: 'center', label: '', field: 'avatar', sortable: true },
  { name: 'firstname', align: 'center', label: 'First name', field: 'firstname', sortable: true },
  { name: 'middlename', required: true, label: 'Middle name', align: 'center', field: row => row.middlename, format: val => `${val}`, sortable: true },
  { name: 'lastname', align: 'center', label: 'Last name', field: 'lastname', sortable: true },
  { name: 'birthdate', align: 'center', label: 'Birthdate (y-m-d)', field: 'birthdate', sortable: true },
  { name: 'mobile', align: 'center', label: 'Mobile', field: 'mobile', sortable: true } ]

const columnDisplay = [
  'avatar',
  'firstname',
  'middlename',
  'lastname',
  'birthdate',
  'mobile'
]

import { defineComponent, ref, onMounted, watchEffect } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'PatientTableComp',

  setup() {

    const $store = useStore()

    const selected = ref([])
    const filter = ref('')
    const loading = ref(false)
    const rows = ref([])
    const pagination = ref({
      sortBy: 'id',
      descending: false,
      page: 1,
      rowsPerPage: 10,
      rowsNumber: 10
    })

    function onRequest (props) {
      const { page, rowsPerPage, sortBy, descending } = props.pagination
      const filter = props.filter === undefined ? '' : props.filter
      const fetchCount = rowsPerPage === 0 ? pagination.value.rowsNumber : rowsPerPage
      const type = ''
      loading.value = true
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

    watchEffect(() => {
      $store.dispatch('prescription/setSelectedPatient', selected.value[0])
    })

    onMounted(() => {
      // get initial data from server (1st page)
      onRequest({
        pagination: pagination.value,
        filter: undefined,
      })
    })

    return {

      //Table
      onRequest,
      columnDisplay,
      columns,
      filter,
      loading,
      selected,
      rows,
      pagination
    }
  }
})
</script>

<style>

</style>