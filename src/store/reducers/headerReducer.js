const INITIAL_STATE = {
    isLargeFilterShown: false,
    isSmallFilterShown: true,
    isLogoWhite: false
}

export function headerReducer(state = INITIAL_STATE, action) {

    switch (action.type) {
        case 'showLargeFilter':
            state.isLargeFilterShown = true
            state.isSmallFilterShown = false
            // state.isSmallFilterShown = false
            return { ...state }
        case 'showSmallFilter':
            state.isLargeFilterShown = false
            state.isSmallFilterShown = true
            return { ...state }
        case 'changeLogoColor':
            state.isLogoWhite = action.isWhite
            return { ...state }
        default:
            return state;
    }
}

