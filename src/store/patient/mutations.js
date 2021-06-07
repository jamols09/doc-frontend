export function SET_PATIENT (state, payload) {

    state.patient.firstname = payload.firstname
    state.patient.lastname = payload.lastname
    state.patient.middlename = payload.middlename
    state.patient.birthdate = payload.birthdate
    state.patient.sex = payload.sex
    state.patient.height = payload.height
    state.patient.height_inches = payload.height_inches
    state.patient.height_unit = payload.height_unit
    state.patient.weight = payload.weight
    state.patient.weight_unit = payload.weight_unit
    state.patient.bloodType = payload.bloodType
    state.patient.occupation = payload.occupation
    state.patient.nationality = payload.nationality
    state.patient.status = payload.status
    state.patient.referred_by = payload.referred_by
    state.patient.address.region = payload.address.region
    state.patient.address.province = payload.address.province
    state.patient.address.city = payload.address.city
    state.patient.address.barangay = payload.address.barangay
    state.patient.address.zip = payload.address.zip
    state.patient.address.line1 = payload.address.line1
    state.patient.address.line2 = payload.address.line2
    state.patient.telephone = payload.telephone
    state.patient.mobile = payload.mobile.replace(/\s+/g, '')
    
}

export function SET_AVATAR (state, payload) {
    state.patient.avatar = payload
}

export function SET_BUTTON_SUBMIT (state, payload) {
    state.submitButtonState = payload
}