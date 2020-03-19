<template>
    <header>
        <ul>
            <h2>Show courses by:</h2>
            <li id="p1"><a v-on:click="updatePeriod(1)">Period 1</a></li>
            <li id="p2"><a v-on:click="updatePeriod(2)">Period 2</a></li>
            <li id="p3"><a v-on:click="updatePeriod(3)">Period 3</a></li>
            <li id="p4"><a v-on:click="updatePeriod(4)">Period 4</a></li>
        </ul>
    </header>
</template>

<script>
    import database from "./firebaseInit"
    export default {
        name: "Period",
        methods: {
            updatePeriod(periodNr) {

                let ref = database.ref("period" + periodNr.toString())
                let currentCourses = []
                ref.on("value", function(data) {
                    let courses = data.val()
                    let keys = Object.keys(courses)
                    for(let i = 0; i < keys.length; i++){
                        currentCourses.push(courses[keys[i]])
                    }

                })
                return currentCourses
            }
        }
    }


</script>

<style scoped>


    header {
        margin-left: 20%;
    }

    ul {
        list-style-type: none;
        display: flex;
        align-items: center;
    }

    ul > h2 {
        margin-right: 1em;
    }

    li {
        margin-left: 2.4em;
        display: inline-block;
    }

    li:hover {
        cursor: pointer;
        transform: translateY(-3px);
        /* this will raise the element */
    }

    li > a {
        display: inline-block;
        padding: 5px;
        transition: 0.4s all ease;
        will-change: transform;
        transform: translateY(0px);
    }


</style>