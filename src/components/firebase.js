

let currentCourses = []

let courses = {

    updateCurrentCourses(data) {
        currentCourses = data
    },

    getCurrentCourses(){
        return currentCourses
    }
}



export default courses