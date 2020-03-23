<template>
  <div class="container">
    <div class="selector">
      <ul class="header">
        <h2 class="hide-mobile">Show courses for:</h2>
        <li v-bind:class="{ active: selectedPeriod == 1 }" id="p1">
          <a v-on:click="updatePeriod(1)">Period 1</a>
        </li>
        <li v-bind:class="{ active: selectedPeriod == 2 }" id="p2">
          <a v-on:click="updatePeriod(2)">Period 2</a>
        </li>
        <li v-bind:class="{ active: selectedPeriod == 3 }" id="p3">
          <a v-on:click="updatePeriod(3)">Period 3</a>
        </li>
        <li v-bind:class="{ active: selectedPeriod == 4 }" id="p4">
          <a v-on:click="updatePeriod(4)">Period 4</a>
        </li>
      </ul>
    </div>
    <div class="main-divider">
      <div class="all-courses">
        <ul>
          <li v-for="(course, index) in currentCourses" v-bind:key="index">
            <Course
              v-bind:name="course.name"
              v-bind:url="course.url"
              v-bind:timestamps="course.timestamps"
            ></Course>
          </li>
        </ul>
      </div>
      <div class="calendar">
        <Calendar></Calendar>
      </div>
    </div>
    <p>*Only currently active or available It/CS courses from Turku based universities are shown.</p>
  </div>
</template>

<script>
import database from "./firebaseInit";
import Calendar from "./Calendar";
import Course from "./Course";

export default {
  name: "AllCourse",
  components: {
    Calendar,
    Course
  },
  data() {
    return {
      currentCourses: [],
      cachedCourses: [],
      selectedPeriod: null
    };
  },
  mounted: function() {
    let current_date = new Date();
    let month = current_date.getMonth() + 1;

    if (month < 2) this.updatePeriod(3);
    else if (month < 5) this.updatePeriod(4);
    else if (month < 10) this.updatePeriod(1);
    else this.updatePeriod(2);
  },
  methods: {
    updatePeriod(periodNr) {
      let that = this;

      if (this.cachedCourses[periodNr - 1] == null) {
        let ref = database.ref("period" + periodNr.toString());
        ref.on("value", function(data) {
          let courses = data.val();
          let keys = [];
          try {
            keys = Object.keys(courses);
          } catch (error) {
            console.log("No data available for this period.");
          }

          that.currentCourses = [];
          for (let i = 0; i < keys.length; i++) {
            that.currentCourses.push(courses[keys[i]]);
          }
          that.cachedCourses[periodNr - 1] = that.currentCourses;
        });
      } else {
        that.currentCourses = that.cachedCourses[periodNr - 1];
      }
      this.selectedPeriod = periodNr;
    }
  }
};
</script>

<style scoped>
.selector {
  display: flex;
  width: 100%;
  justify-content: flex-end;
}

ul {
  list-style-type: none;
}

p {
  text-align: center;
  margin-top: 2.1em;
  font-size: 0.9em;
}

.header {
  display: flex;
  align-items: center;
  margin-left: 0;
  flex-basis: 85%;
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
}

li > a {
  display: inline-block;
  padding: 5px;
}

.all-courses {
  text-align: left;
  margin-top: 1%;
  overflow-y: scroll;
  direction: rtl;
  height: 80vh;
  flex-basis: 40%;
}

.main-divider {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
  max-width: 1800px;
  margin: 0 auto;
}

.calendar {
  flex-basis: 50%;
  height: 80vh;
  width: 100%;
}

.active {
  margin-bottom: 13px;
}

@media screen and (max-width: 990px) {
  .selector {
    justify-content: center;
  }

  .header {
    flex-basis: 100%;
    padding: 0 1rem;
  }

  .header li {
    margin-left: 1rem;
  }

  .main-divider {
    flex-direction: column-reverse;
  }
  .all-courses {
    flex-basis: 100%;
    direction: ltr;
  }

  .all-courses ul {
    padding-left: 0;
  }

  .calendar {
    flex-basis: 100%;
    height: 70vh;
  }
}

@media screen and (max-width: 450px) {
  .hide-mobile {
    display: none;
  }

  ul > h2 {
    font-size: 1em;
  }

  li {
    text-align: left;
    margin-left: 0;
  }

  p {
    font-size: 1.7em;
  }

  .header > li {
    font-size: 0.65rem;
    text-align: left;
  }

  .selector {
    margin-left: 0;
  }

  .container {
    font-size: 5px;
  }

  .all-courses {
    margin-left: 0;
    margin-top: 0;
  }

  .all-courses ul {
    padding: 0;
  }

  .calendar {
      height: 55vh;
  }
}
</style>