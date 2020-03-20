<template>
  <div id="app">
    <Courses></Courses>
  </div>
</template>

<script>

import Courses from "@/components/Courses";


export default {
  name: 'App',
  components: {
    Courses
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
