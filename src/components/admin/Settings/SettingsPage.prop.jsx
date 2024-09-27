import countries from '../../countries.json'
import {showSuccessToast} from '@utils/util_toastify';

export const timeZone = countries
    .filter(c => c.timezones && c.timezones.length > 0)  // Ignore countries without timezones
    .map(c => ({
        gmtOffset: parseFloat(c.timezones[0].gmtOffsetName.replace('UTC', '').replace(':', '')),  // Extract numerical UTC offset
        gmtOffsetName: c.timezones[0].gmtOffsetName
    }))
    .filter((tz, index, self) => self.findIndex(t => t.gmtOffsetName === tz.gmtOffsetName) === index)  // Remove duplicates
    .sort((a, b) => a.gmtOffset - b.gmtOffset)  // Sort by the numerical UTC offset
    .map((tz, i) => ({ prop: i, value: tz.gmtOffsetName }));  

const languages = countries.map(c => {
    return {
        prop: c.id,
        value: c.nationality
    };
}).sort((a, b) => a.value.localeCompare(b.value));

export const getTimeZones = (id) => {
    return timeZone
}

export const getTimeZoneById = (id) => {
    return timeZone.filter(t => t.prop == id)[0]
}

export const getCountryLanguages = () => {
    return languages
}

export const getCountryLanguageById = (id) => {
    return languages.filter(l => l.prop == id)[0]
}

export const callSaveAPI = (data) => {
    showSuccessToast("Save successfully!")
}