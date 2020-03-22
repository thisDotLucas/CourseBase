<template>
  <div id="app">
    <AllCourses></AllCourses>
  </div>
</template>

<script>

import AllCourses from "@/components/AllCourses"


export default {
  name: 'App',
  components: {
    AllCourses
  }
}
</script>

<style>
#app {
  font-family: roboto mono, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
