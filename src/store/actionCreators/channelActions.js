
// export const deleteChannel = (i) => {
//     const tempArr = [...channels];
//     tempArr.splice(+i, 1);   
//     dispatch({type: 'CHANGE_CHANNEL_ARRAY', tempArr: tempArr })
// }
export const changeMinChannel = (e, id) => ({
    type: 'CHANGE_CHANNEL_ARRAY', 
})
// const changeMaxChannel = (e, i) => {
//     const tempArr = [...channels];
//     tempArr[i].max = +e.value

//     dispatch({type: CHANGE_CHANNEL_ARRAY, tempArr: tempArr })

//     if(e.value < channels[i].min){
//         changeMinChannel(e, i);
//     }
// }
// export const changeMinChannel = (e, i) => {         
//     const tempArr = [...channels];
//     tempArr[i].min = +e.value

//     dispatch({type: CHANGE_CHANNEL_ARRAY, tempArr: tempArr })

//     if(e.value > channels[i].max){
//         changeMaxChannel(e, i);
//     }
// }
// const changeSampleColor = (color, i) => {
//     const tempArr = [...channels];
//     tempArr[i].color = color
//     dispatch({type: 'CHANGE_CHANNEL_ARRAY', tempArr: tempArr })
// }
// const assembleChange = (e, i) => {
//     const tempArr = [...channels];
//     tempArr[i].assemble = e.value
//     dispatch({type: 'CHANGE_CHANNEL_ARRAY', tempArr: tempArr })        
// }
// const rearChange = (e, i) => {
//     const tempArr = [...channels];
//     tempArr[i].rear = +e.value
//     dispatch({type: 'CHANGE_CHANNEL_ARRAY', tempArr: tempArr })
// }
// const frontChange = (e, i) => {
//     const tempArr = [...channels];
//     tempArr[i].front = +e.value
//     dispatch({type: 'CHANGE_CHANNEL_ARRAY', tempArr: tempArr })
// }
// const reactionChange = (e, i) => {
//     const tempArr = [...channels];
//     tempArr[i].reaction = +e.value
//     dispatch({type: 'CHANGE_CHANNEL_ARRAY', tempArr: tempArr })
// }
// const xposChange = (e, i) => {
//     const tempArr = [...channels];
//     tempArr[i].xpos = +e.value
//     dispatch({type: 'CHANGE_CHANNEL_ARRAY', tempArr: tempArr })
// }
// const stypeChange = (e, i) => {
//     const tempArr = [...channels];
//     tempArr[i].stype = e.value
//     dispatch({type: 'CHANGE_CHANNEL_ARRAY', tempArr: tempArr })
// }
// const suppressChange = (e, i) => {
//     const tempArr = [...channels];
//     tempArr[i].suppress = +e
//     dispatch({type: 'CHANGE_CHANNEL_ARRAY', tempArr: tempArr })
// }