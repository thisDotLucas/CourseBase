<template>
    <div class="container">
        <div class="selector">
            <ul class="header">
                <h2>Show courses for:</h2>
                <li id="p1"><a v-on:click="updatePeriod(1)">Period 1</a></li>
                <li id="p2"><a v-on:click="updatePeriod(2)">Period 2</a></li>
                <li id="p3"><a v-on:click="updatePeriod(3)">Period 3</a></li>
                <li id="p4"><a v-on:click="updatePeriod(4)">Period 4</a></li>
            </ul>
        </div>

        <div class="all-courses">
            <ul>
                <li v-for="course in currentCourses" v-bind:key="course">
                    <a target="_blank" rel="noopener noreferrer" v-bind:href="course.url" class="course">{{course.name}}</a>
                </li>
            </ul>

        </div>
    </div>
</template>

<script>
    import database from "./firebaseInit"
    //import firebase from "./firebase"

    export default {
        name: "Period",
        data(){
            return{
                currentCourses: []
            }
        },
        methods: {
            updatePeriod: function(periodNr) {

                let that = this;
                let ref = database.ref("period" + periodNr.toString())
                ref.on("value", function(data) {
                    let courses = data.val()
                    let keys = Object.keys(courses)
                    that.currentCourses = []
                    for(let i = 0; i < keys.length; i++){
                        that.currentCourses.push(courses[keys[i]])
                    }
                //firebase.updateCurrentCourses(currentCourses)
                })

            }
        }
    }


</script>

<style scoped>


    .selector {
        margin-left: 20%;
    }

    ul {
        list-style-type: none;
    }

    .header {
        display: flex;
        align-items: center;
    }

    ul > h2 {
        margin-right: 1em;
    }

    .header > li {
        margin-left: 2.4em;
        display: inline-block;
    }

    .header > li:hover {
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

    .all-courses {
        text-align: left;
        margin-top: 1%;
        margin-left: 5%;
        overflow-y: scroll;
        direction:rtl;
        height:80vh;
    }

    .course {
        font-size: 0.9em;
        border: #2c3e50 solid 2px;
        margin: 4px;
    }

</style>