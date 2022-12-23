<script setup>
import { RouterLink, RouterView } from "vue-router";
import HelloWorld from "@/components/HelloWorld.vue";
</script>

<template>
  <header>
    <div class="wrapper">
      <!-- <HelloWorld msg="You did it!" /> -->
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/rma">RMA</RouterLink>
        <RouterLink to="/warehouse">Magazyn</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style>
@import "@/assets/base.css";
@import "@/assets/table.css";
@import "@/assets/actions.css";
@import "@/assets/filters.css";
@import "@/assets/form.css";
@import "@/assets/bigModal.css";
@import "@/assets/smallModal.css";

#app {
  margin: 0;
  font-weight: normal;
  padding: 0;
}

header {
  line-height: 1.5;
  height: 5vh;
  display: flex;
  place-items: flex-start;
  background: rgb(20, 66, 109);
}

header .wrapper {
  display: flex;
  place-items: flex-start;
  flex-wrap: wrap;
  padding-left: 5vw;
  width: 100%;
}

nav {
  margin-left: -1rem;
  font-size: 1rem;
  display: flex;
  height: 5vh;
}

nav a.router-link-exact-active {
  color: #fff;
}
/* 
nav a.router-link-exact-active:hover {
  background-color: transparent;
} */

nav a:hover {
  background: rgb(23, 76, 126);
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
  display: flex;
  align-items: center;
}

nav a:first-of-type {
  border: 0;
}

a {
  text-decoration: none;
  color: var(--color-text);
  transition: 0.4s;
}
</style>
