<template>
        <vue-cal class="calendar"
                hide-view-selector
                 :time-from="5 * 60"
                default-view="week"
                :disable-views="['years', 'year', 'month', 'day']"
                :events="events"
                hide-weekends
        >
            <template v-slot:no-event>-</template>
        </vue-cal>
</template>

<script>
    import VueCal from 'vue-cal'
    import 'vue-cal/dist/vuecal.css'
    import { mapState } from 'vuex'

    export default {
        name: "Calendar",
        components: {
            VueCal
        },

        computed: mapState({
            events: 'calendarCourses'
        })
    }
</script>

<style scoped>

    .calendar{
        font-size: 0.8em;
    }

</style>
