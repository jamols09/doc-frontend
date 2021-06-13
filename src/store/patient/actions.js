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
export async function sendPatientInfo () {
    const data = this.getters['patient/get']
    await axios.get('http://api.docmaglana.test/sanctum/csrf-cookie')
    return api.post('/patient', data )
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
    // console.log('/patient?'+url)
    return await api.get('/patient?'+url);
}
export async function requestSymptomsList (context, payload) {
    // return await api.get('/')
}

export async function sendHistorySymptomDiagnosis(context, payload) {
    console.log(payload)
    let patient_id = payload.selectedPatient.value.id
    let symptomsRepeater = payload.symptomsRepeater
    let history = await api.post('/patient/history', { patient_id })    

    // symptomsRepeater.forEach(function (data) {
    //     console.log(data)
    // })
    let symptoms = ''
    if(symptomsRepeater.length) {
        console.log(symptomsRepeater)
        symptoms = await api.post('/patient/history/symptoms', symptomsRepeater)
    }

    
    let diagnosis = await api.post('/patient/history/diagnosis')
}