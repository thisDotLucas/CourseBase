<template>
    <div>
        <a class="add-btn" v-if="!this.inCal" v-on:click="addToCal">Add</a>
        <a class="remove-btn" v-else v-on:click="removeFromCal">Remove</a>
        <a target="_blank" rel="noopener noreferrer" v-bind:href="url" class="course">{{name}}</a>
    </div>
</template>

<script>

    import { mapState } from 'vuex'
    import { mapGetters } from 'vuex'
    import { mapMutations } from 'vuex'

    export default {
        name: "Course",
        props: {
            name: String,
            url: String,
            timestamps: Array
        },
        data() {
            return {
                inCal: false
            }
        },
        computed: {
            ...mapState([
                    "calendarCourses"
                ])
        },
        methods: {
            ...mapMutations([
                "ADD_COURSE", "REMOVE_COURSE"
            ]),
            ...mapGetters([
                "getLength"
            ]),
            addToCal() {

                for(let i = 0; i < this.timestamps.length; i++){

                    let temp = this.timestamps[i].split(" ")
                    let dateTemp = temp[0].split(".")
                    let timeTemp = temp[1].split("-")
                    let date = dateTemp[2] + "-" + dateTemp[1] + "-" + dateTemp[0]
                    let start = timeTemp[0]
                    let end = timeTemp[1]

                    this.ADD_COURSE(
                        {
                            start: date + " " + start,
                            end: date + " " + end,
                            title: this.name,
                            class: "blue-event"
                        }
                    )
                }
                this.inCal = true
            },

            removeFromCal(){
                this.REMOVE_COURSE(this.name)
                this.inCal = false
            }
        }
    }
</script>

<style scoped>
    .course {
        font-size: 0.9em;
        /*border: #2c3e50 solid 2px;*/
        margin: 4px;
        display: inline-block;
        padding: 5px;
    }

    a:hover {
        cursor: pointer;
    }

    .remove-btn {
        color: crimson;
    }

    @media screen and (max-width: 450px) {

        div {
            margin-left: 0;
            width: 100px;
        }

        a {
            font-size: 4px;
        }

        .course {
            font-size: 4px;
        }
    }

</style>