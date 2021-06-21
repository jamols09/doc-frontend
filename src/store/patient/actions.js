import { api } from "src/boot/axios"
import axios from 'axios'

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
    let pid = await api.post('/patient', pdata)
    
    console.log(avatar)
    if(avatar) {  
        const file = DataURIToBlob(avatar)
        const form = new FormData()
        //generate file name as time
        var d = new Date();
        var n = d.getTime();
        form.append('avatar', file, n.toString())
        console.log(pid.data.id)
        form.append('id', JSON.stringify(pid.data.id))

        const config = {
            headers: {
                'content-type': undefined
            }
        }
        
        console.log("asd")
        await api.post('/patient/avatar', form, config)
    }

    return pid
}
export function setButtonDisabled({ commit }, payload) {
    commit('SET_BUTTON_SUBMIT', payload)
}
export async function requestPatientTable (context, payload) {
    const params = Object.entries(payload) //convert object to arrays
    const size = params.length
    let i = 1
    let url = ''
    for (const [filter, type] of params) { //destructure arrays 
        // console.log(` filter:${filter} | type:${type}`)
        if(i < size) {
            url += filter+'='+ type +'&'
        } else {
            url += filter+'='+ type
        }
        i++
    }
    return await api.get('/patient?'+url);
}
export async function requestSymptomsDropdown () {
    return await api.get('/patient/history/symptoms/dropdown')
}
export async function requestDiagnosesDropdown () {
    return await api.get('/patient/history/diagnoses/dropdown')
}
export async function sendHistorySymptomDiagnosis(context, payload) {
    const patient_id = payload.selectedPatient.value.id
    let symptomsRepeater = payload.symptomsRepeater
    let diagnosisRepeater = payload.diagnosisRepeater
    let history  = await api.post('/patient/history', { patient_id })   

    if(symptomsRepeater.length) {
        symptomsRepeater.forEach(element => {
            element.history_id = history.data.id
        })
        const symptoms = await api.post('/patient/history/symptoms', symptomsRepeater )
    }

    if(diagnosisRepeater.length) {
        diagnosisRepeater.forEach(element => {
            element.history_id = history.data.id
        })
        const diagnoses = await api.post('/patient/history/diagnoses', diagnosisRepeater )
    }
}

// Convert Base64 img to Form data
function DataURIToBlob(dataUri) {
    const splitDataURI = dataUri.split(',')
    const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
    const mimeString = splitDataURI[0].split(':')[1].split(';')[0]

    const ia = new Uint8Array(byteString.length)
    for (let i = 0; i < byteString.length; i++)
        ia[i] = byteString.charCodeAt(i)
    return new Blob([ia], { type: mimeString })
}