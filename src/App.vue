<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from '@/components/HelloWorld.vue'
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
@import '@/assets/base.css';

#app {
    margin: 0;
    font-weight: normal;
    padding: 0;
}

header {
    line-height: 1.5;
    max-height: 8vh;
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
    padding: 1rem 0;
    display: flex;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
}

table th, table td {
  padding: .3em 0 .3em .7em;
  border-right: 1px solid rgb(146, 146, 146);
}

table th:last-of-type, table td:last-of-type {
  border-right: 0px;
}

table {
  position: relative;
  border-collapse: collapse;
  margin: 12px 0;
  font-size: .9em;
  min-width: 400px;
  table-layout: fixed;
  color: var(--vt-c-black);
}

table .loadingWrap {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: none;
}

table .loadingWrap.active {
  display: block;
  background: rgba(85, 85, 85, 0.322);
  z-index: 2;
}

table th {
  text-align: left;
  background: #dadada;
  font-weight: bold;
}

table tr {
  border-bottom: 1px solid #ddd;
}
table tr:nth-of-type(even) {
  background: #f3f3f3;
}

table tr:last-of-type {
  border-bottom: 2px solid rgb(31, 125, 212);
}

.tableLoadingWrap {
  position: absolute;
  top: 0;
  left: 0;
  width: 70%;
  height: 100%;
  display: none
}

.tableLoadingWrap.active {
  display: block;
  background: rgba(85, 85, 85, 0.322);
  z-index: 2;
}

.actions {
  padding: .5em;
  display: flex;
  gap: 1em;
  border-bottom: 2px solid rgb(25, 103, 175);
}

.actionBtn {
  background: rgb(205, 206, 207);
  color: var(--vt-c-black-mute);
  font-weight: bold;
  transition: background-color .2s ease-out;
  padding: .2em .5em;
  position: relative;
  display: flex;
}

.actionBtn:hover {
  cursor: pointer;
  background: rgb(195, 196, 197);
}

.actionBtn.disabled {
  color: #939393;
}

.actionBtn.disabled:hover {
  cursor: not-allowed;
}

.actionBtn img {
  width: 20px;
}
</style>
