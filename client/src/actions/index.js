//view
export const updateIsLoggedIn = data => {
    return {
        type: 'UPDATE_ISLOGGEDIN',
        payload: data
    }
}

//userdata
export const updateUserData = data => {
    return {
        type: 'UPDATE_USERDATA',
        payload: data
    }
}

//albumData
export const updateAlbumData = data => {
    return {
        type: 'UPDATE_ALBUMDATA',
        payload: data
    }
}

//albumList
export const updateAlbumList = data => {
    return {
        type: 'UPDATE_ALBUMLIST',
        payload: data
    }
}

//imageList
export const updateImageList = data => {
    return {
        type: 'UPDATE_IMAGELIST',
        payload: data
    }
}

