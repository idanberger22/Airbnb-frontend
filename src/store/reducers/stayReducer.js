const INITIAL_STATE = {
    filterBy: {}
}

export function stayReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'SET_FILTER':
            state.filterBy = action.filterBy
            return { filterBy:state.filterBy }
        default:
            return state;
    }
}