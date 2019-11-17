<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    created() {
        // init
        this.actionInit();
    },
    beforeDestroy() {
        // in case of memory leak
        this.actionBreakTimeInterval();
    },
    methods: {
        ...mapActions(['actionInit', 'actionBreakTimeInterval']),
    },
}
</script>

<style>
html,
body {
    padding: 0;
    margin: 0;
}
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

div {
    box-sizing: border-box
}

p,
h1,
h2 {
    padding: 0;
    margin: 0;
}
</style>
