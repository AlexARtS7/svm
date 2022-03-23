const getItem = (item) => {
    return localStorage.getItem(item)
}

const defaultState = {
    opacityUp: getItem('opacityUp') === null ? 0.09 : +getItem('opacityUp'),
    opacityDown: getItem('opacityDown') === null ? 0.03 : +getItem('opacityDown'),
    opacityMax: getItem('opacityMax') === null ? 1 : +getItem('opacityMax'),
    visSet: getItem('visSet') === null ? 'radialfromcenter' : getItem('visSet'),
    visBor: localStorage.getItem('visBor')  === 'false' ? false : true,
    visLab: localStorage.getItem('visLab')  === 'false' ? false : true,
    fullScreen: 0
}

export const elementsReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'CHANGE_COLOR': return { ...state, renderColor: action.color }
        case 'CHANGE_FULLSCREEN_MODE': return { ...state, fullScreen: action.value }
        case 'CHANGE_LABELS_STATUS': return { ...state, visLab: action.value }
        case 'CHANGE_BORDER_STATUS': return { ...state, visBor: action.value }
        case 'CHANGE_VISUAL_SETTINGS': return { ...state, visSet: action.value }
        case 'CHANGE_LIGHT_UP': return { ...state, opacityUp: action.value/1000 }
        case 'CHANGE_LIGHT_DOWN': return { ...state, opacityDown: action.value/1000 }
        case 'CHANGE_LIGHT_MAX': return { ...state, opacityMax: action.value/100 }
        case 'CHANGE_PEAKS_STATUS': return { ...state, peaksStatus: +action.peaks }
        case 'CHANGE_FILL_STATUS': return { ...state, fillStatus: +action.fill }
        case 'CHANGE_VISMODE': return { ...state, rate: +action.rate }  
        case 'CHANGE_SUPPRESSION': return { ...state, suppression: +action.suppression }        
        default: return state
    }
}