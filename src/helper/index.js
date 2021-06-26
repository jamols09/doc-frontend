/**
 * Groups arrays of object by property's value
 * @param {*} propertyName 
 * @param {*} object 
 * @returns object
 */
export function groupDataByPropertyValue(propertyName, object) 
{
    const groupBy = (key, arr) => arr
    .reduce(
        (accumulator,currentValue) => {
            const property = currentValue[key]
            // console.log('property |',property);
            // console.log('accumulator |',accumulator)
            // console.log('currentvalue |', currentValue)
            // console.log(accumulator[property])
            
            if(property in accumulator) {
                return { ...accumulator, [property]: accumulator[property].concat(currentValue) }
            }
            return {...accumulator, [property]: [currentValue]}
        },
    {}) //create accumulator as object
    
    return groupBy(propertyName, object)
}

/**
 * Convert Uri to Blob
 * @param {*} uri 
 * @returns blob
 */
export function convertUriToBlob(uri) 
{
    const splitDataURI = uri.split(',')
    const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
    const mimeString = splitDataURI[0].split(':')[1].split(';')[0]

    const ia = new Uint8Array(byteString.length)
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i)
    }

    return new Blob([ia], { type: mimeString })
}

/**
 * Search filter for Tables
 * @param {*} payload 
 */
export function searchFilter(payload) 
{
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

    return url
}

/**
 * Age Calculation
 * Author: naveen
 * Url: https://stackoverflow.com/a/7091965/3362771
 * @param {*} payload
 * @returns int
 */
export function calculateAge(payload)
{
    let date = new Date()
    let birthdate = new Date(payload)
    let age = date.getFullYear() - birthdate.getFullYear()
    let mm = date.getMonth() - birthdate.getMonth()

    if(mm < 0 || (mm === 0 && date.getDate() < birthdate.getDate())) {
        age--
    }
    
    return age
}