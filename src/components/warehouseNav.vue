<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>
<template>
    <div class="moduleNav">
        <ul>
            <li>
                <RouterLink to="/warehouse/items">items</RouterLink>
            </li>
            <li>
                <RouterLink to="/warehouse/shelves">shelves</RouterLink>
                
            </li>
            <li>
                <RouterLink to="/warehouse/spareparts">spare parts</RouterLink>
            </li>
        </ul>
    </div>
</template>
<style>
.moduleNav {
    width: 100%;
    padding: 1em 2em;
    background: rgb(40, 86, 129);
}

ul {
    list-style: none;
    width: 100%;
    padding: 0
}

li {
    font-size: 1rem;
    line-height: 2.5em;
}

li a {
    color: #fff;
}
</style>