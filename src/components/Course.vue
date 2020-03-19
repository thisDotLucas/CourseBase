<template>
    <a :href="url">{{courseName}}</a>
</template>

<script>


    export default {
        name: "Course",
        data () {
            return {
                courseName: this.name,
                url: this.url
            }
        },
        methods: {
            createCourse(name, url) {
                this.courseName = name
                this.url = url
            }
        }
    }
</script>

<style scoped>

</style>