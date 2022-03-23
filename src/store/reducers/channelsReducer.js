
const getItem = (item) => {
    return localStorage.getItem(item)
}

const defaultState = {
    channels: JSON.parse(getItem("channels")) === null ? [ 
    {mark: 'A', min: 0, max: 4, color: '#FF0000', assemble: 'maximum', rear: 15, front: 12, reaction: 2, xpos: 0, stype: 'avto', suppress: 0}, 
    {mark: 'B', min: 20, max: 171, color: '#0000FF', assemble: 'maximum', rear: 12, front: 10, reaction: 2, xpos: 0, stype: 'avto', suppress: 0}, 
    {mark: 'C', min: 180, max: 220, color: '#008000', assemble: 'maximum', rear: 28, front: 10, reaction: 2, xpos: 0, stype: 'avto', suppress: 0} ] :
    JSON.parse(getItem("channels"))}

    const CHANGE_CHANNEL_ITEM = 'CHANGE_CHANNEL_ITEM'

export const channelsReducer = (state = defaultState, action) => {
    switch (action.type) {
        case CHANGE_CHANNEL_ITEM:
            return { ...state, 
                channels: state.channels.map(item => item.mark == action.item.mark ? action.item : item) }                     
        default: return state
    }
}
