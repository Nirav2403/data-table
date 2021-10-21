export const ImageReducer = (state=[],action) =>{
    console.log(action);
    switch(action.type){
        case 'FETCH_IMAGE':
            return action.payload;
        case 'DELETE_IMAGE':
            const data = JSON.parse(localStorage.getItem("JsonApi"))
            const newState = data.filter((item)=>item.Id!==action.payload)
            const correctId = newState.map((item)=> {
                if(item.Id > action.payload){
                    return {...item,Id:item.Id-1}
                }else{
                    return item
                }
            })
            localStorage.setItem("JsonApi",JSON.stringify(correctId))
            return newState;
        case 'UPDATE_IMAGE':
            return action.payload
        default:
            return state;
    }
}

// export const ImageReducer = (state=[],action)=>{
//     switch (actio.type) {
//         case "FETCH_IMAGE":
//             return action.payload;
//         case "DELETE_IMAGE":
//             const newImages = state.filter((item)=> item.Id)
//         default:
//             break;
//     }
// }