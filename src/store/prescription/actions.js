import axios from 'axios'
import { api } from "src/boot/axios"

/**
 * @param {send..} to API 
 * @param {set..}  to State
 * @param {request..} from API 
 * @param {clear..} the State
 */

export function setSelectedPatient ({commit}, payload) {
    commit('SET_SELECTED_PATIENT', payload)
}

export function setMedicineRepeater ({commit}, payload) {
    commit('SET_MEDICINE_REPEATER', payload)
}