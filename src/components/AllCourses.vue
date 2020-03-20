<template>
    <div class="container">
        <ul>
            <li v-for="course in courses" v-bind:key="course"> {{course.name}}

            </li>
        </ul>
    </div>
</template>

<script>

    export default {
        name: "AllCourses",
        data() {
            return {
                courses: []
            }
        },
        methods: {


        }
    }
</script>

<style scoped>

    ul {
        list-style-type: none;
    }

</style>