<template>
  <div class="course-wrapper">
    <a target="_blank" rel="noopener noreferrer" v-bind:href="url" class="course">{{name}}</a>
    <a class="add-btn" v-if="!this.inCal" v-on:click="addToCal">Add</a>
    <a class="remove-btn" v-else v-on:click="removeFromCal">Remove</a>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";

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
    };
  },
  computed: {
    ...mapState(["calendarCourses"])
  },
  methods: {
    ...mapMutations(["ADD_COURSE", "REMOVE_COURSE"]),
    ...mapGetters(["getLength"]),
    addToCal() {
      for (let i = 0; i < this.timestamps.length; i++) {
        let temp = this.timestamps[i].split(" ");
        let dateTemp = temp[0].split(".");
        let timeTemp = temp[1].split("-");
        let date = dateTemp[2] + "-" + dateTemp[1] + "-" + dateTemp[0];
        let start = timeTemp[0];
        let end = timeTemp[1];

        this.ADD_COURSE({
          start: date + " " + start,
          end: date + " " + end,
          title: this.name,
          class: "blue-event"
        });
      }
      this.inCal = true;
    },

    removeFromCal() {
      this.REMOVE_COURSE(this.name);
      this.inCal = false;
    }
  }
};
</script>

<style scoped>
.course-wrapper {
  margin-bottom: 0.7rem;
  padding-left: 1rem;
  display: flex;
  align-items: flex-start;
  flex-direction: row-reverse;
}

.course {
  font-size: 0.9em;
  /*border: #2c3e50 solid 2px;*/
  margin: 4px;
  padding: 5px;
  display: inline-block;
  flex-basis: 75%;
}

a:hover {
  cursor: pointer;
}

.remove-btn {
  color: crimson;
}

.add-btn,
.remove-btn {
  display: inline-block;
  margin: 4px;
  padding: 5px;
  padding-right: 5.5rem;
  flex-basis: 25%;
  text-align: right;
}

@media screen and (max-width: 990px) {
  .course-wrapper {
    margin-left: 0;
    display: flex;
    align-items: flex-start;
    direction: ltr;
  }
  .add-btn,
  .remove-btn {
    text-align: left;
    padding-left: 1.5rem;
    padding-right: 0;
    flex-basis: 10%;
  }
}

@media screen and (max-width: 450px) {
  a {
    font-size: 1rem;
  }

  .course {
    font-size: 1rem;
  }
}
</style>