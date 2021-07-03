import { api } from "src/boot/axios"
import axios from 'axios'
import { convertUriToBlob, searchFilter } from 'src/helper'

/**
 * @param {send..} to API 
 * @param {set..}  to State
 * @param {request..} from API 
 * @param {clear..} the State
 */

export function sendPatientAction ({ commit }, payload) {
    commit('SET_PATIENT', payload)
}
export function sendImageAction ({ commit }, payload) {
    commit('SET_AVATAR', payload)
}
export async function sendPatientInfo ({}, payload) {
    const pdata = this.getters['patient/getPatient']
    const avatar = this.getters['patient/getPatientAvatar']

    await axios.get('http://api.docmaglana.test/sanctum/csrf-cookie')
    const pid = await api.post('/patient', pdata)
    
    if(avatar) {  
        const file = convertUriToBlob(avatar)
        const form = new FormData()
        //generate file name as time
        let d = new Date();
        let n = d.getTime();
        form.append('avatar', file, n.toString())
        form.append('id', JSON.stringify(pid.data.id))

        const config = {
            headers: { 'content-type': undefined }
        }
        
        await api.post('/patient/avatar', form, config)
    }

    return pid
}
export function setButtonDisabled ({ commit }, payload) {
    commit('SET_BUTTON_SUBMIT', payload)
}
export async function requestPatientTable (context, payload) {
    const url = searchFilter(payload)
    return await api.get('/patient?'+url);
}
export async function requestSymptomsDropdown () {
    return await api.get('patient/history/symptoms')
}
export async function requestDiagnosesDropdown () {
    return await api.get('patient/history/diagnoses')
}
export async function sendHistorySymptomDiagnosis (context, payload) {  
    const patient_id = payload.selectedPatient.value.id
    const history = await api.post('/patient/history', { patient_id })
    const historyFiles = payload.historyfiles
    const historyDate = payload.historyDate

    if(historyFiles.value) {
        const form = new FormData()
        //generate file name as time
        var d = new Date();
        var n = d.getTime();
        form.append('history', historyFiles.value[0], n.toString())
        form.append('patient_id', JSON.stringify(patient_id))
        form.append('history_date', historyDate.value)
        form.append('id', JSON.stringify(history.data.id))
        const config = {
            headers: { 'content-type': undefined }
        }
        await api.post('/patient/history/file', form, config)
    }

    let symptomsRepeater = payload.symptomsRepeater
    console.log('symptomsRepeater ', symptomsRepeater)
    if(symptomsRepeater.length) {
        symptomsRepeater.forEach(element => {
            element.history_id = history.data.id
        })
        await api.post('/patient/history/symptoms', symptomsRepeater )
    }
    let diagnosisRepeater = payload.diagnosisRepeater
    if(diagnosisRepeater.length) {
        diagnosisRepeater.forEach(element => {
            element.history_id = history.data.id
        })
        await api.post('/patient/history/diagnoses', diagnosisRepeater )
    }
}

//SymptomsQChip
export async function requestPatientsSymptoms (context, payload) {
    return await api.get('/patient/'+ payload.id +'/history/symptoms')
}
//DiagnosisQChip
export async function requestPatientDiagnoses (context, payload) {
    return await api.get('/patient/'+ payload.id +'/history/diagnoses')
}
//PatientFiles
export async function requestPatientFiles (context, payload) {
    return await api.get('/patient/'+ payload.id +'/history/files')
}