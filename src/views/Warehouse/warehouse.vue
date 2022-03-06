<script setup>
import warehouseNav from '../../components/warehouseNav.vue';
import { RouterView } from 'vue-router'
</script>
<template>
    <div id="warehouse">  
        <warehouseNav/>
        <RouterView name="innerView"/>
    </div>
</template>

<style>
#warehouse {
    min-height: 100vh;
    display: grid;
    grid-template-columns: 10% 1fr;
}
</style>
