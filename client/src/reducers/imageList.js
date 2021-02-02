const imageListReducer = (state = [], action) => {
    switch(action.type) {
        case 'UPDATE_IMAGELIST':
            return action.payload
        default:
            return state
    }
}

export default imageListReducer