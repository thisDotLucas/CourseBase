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
                <li v-for="(course, index) in currentCourses" v-bind:key="index">
                    <a target="_blank" rel="noopener noreferrer" v-bind:href="course.url" class="course">{{course.name}}</a>
                </li>
            </ul>
        </div>
        <p>*Only currently active or available It/CS courses from Turku based universities are shown.</p>
    </div>
</template>

<script>
    import database from "./firebaseInit"
    //import firebase from "./firebase"

    export default {
        name: "Period",
        data(){
            return{
                currentCourses: [],
                cachedCourses: [],
                selectedPeriod: null
            }
        },
        mounted: function(){
            let current_date = new Date()
            let month = current_date.getMonth() + 1

            if (month < 2)
                this.updatePeriod(3)
            else if (month < 5)
                this.updatePeriod(4)
            else if (month < 10)
                this.updatePeriod(1)
            else
                this.updatePeriod(2)

        },
        methods: {
            updatePeriod: function(periodNr) {

                let that = this;

                if(this.cachedCourses[periodNr - 1] == null){

                    let ref = database.ref("period" + periodNr.toString())
                    ref.on("value", function(data) {
                        let courses = data.val()
                        let keys = []
                        try {
                            keys = Object.keys(courses)
                        } catch(error) {
                            console.log("No data available for this period.")
                        }

                        that.currentCourses = []
                        for(let i = 0; i < keys.length; i++){
                            that.currentCourses.push(courses[keys[i]])
                        }
                        that.cachedCourses[periodNr - 1] = that.currentCourses
                    })
                } else {
                    that.currentCourses = that.cachedCourses[periodNr - 1]
                }
                this.updateSelectors(periodNr)
            },

            updateSelectors(selectorNr) {

                let previousSelectedPeriod = this.selectedPeriod

                switch(selectorNr) {
                    case 1:
                        this.selectedPeriod = document.getElementById("p1")
                        break;
                    case 2:
                        this.selectedPeriod = document.getElementById("p2")
                        break;
                    case 3:
                        this.selectedPeriod = document.getElementById("p3")
                        break
                    case 4:
                        this.selectedPeriod = document.getElementById("p4")
                        break
                }
                this.selectedPeriod.style.marginBottom = "13px"
                if(previousSelectedPeriod != null && previousSelectedPeriod !== this.selectedPeriod)
                    previousSelectedPeriod.style.marginBottom = "0px"
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

    p {
        text-align: center;
        margin-top: 2.5em;
        font-size: 0.9em;
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
        /*transform: translateY(-3px);
        this will raise the element */
    }

    li > a {
        display: inline-block;
        padding: 5px;
        /*transition: 0.4s all ease;
        will-change: transform;
        transform: translateY(0px);*/
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