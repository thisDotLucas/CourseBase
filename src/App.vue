<template>
  <div id="app">
    <Period></Period>
    <AllCourses></AllCourses>
  </div>
</template>

<script>

import Period from "@/components/Period";
import AllCourses from "@/components/AllCourses";

export default {
  name: 'App',
  components: {
    AllCourses,
    Period

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
