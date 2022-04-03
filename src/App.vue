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

.filterWrap {
  display: flex;
  gap: .4em;
  opacity: 0;
}

.filterWrap.active {
  opacity: 1;
}

.filterChip {
  padding: .05em .6em 0 .6em;
  border: 1px solid rgb(85, 85, 85);
  color: var(--vt-c-black-mute);
  border-radius: 5px;
  font-size: .9em;
  transition: .1s all ease-out;
  display: flex;
  gap: .1em;
}

.filterChip:hover {
  cursor: pointer;
  background: rgba(235, 235, 235, 0.8);
}

.filterChip .close {
  width: 20px;
  height: 20px;
}

.filterChip .close:before, .close:after {
  position: absolute;
  left: 9px;
  top: 4px;
  content: ' ';
  height: 13px;
  width: 2px;
  background-color: #444444;
}
.filterChip .close:before {
  transform: rotate(45deg);
}
.filterChip .close:after {
  transform: rotate(-45deg);
}
form {
    padding: 1em 2em;
    display: flex;
    flex-direction: column;
    width: 50%;
    gap: .5em;
}

form input {
    width: 70%;
    padding: .35em 0;
}
    
form label {
    color: var(--vt-c-black-mute)
}

form input[type="submit"] {
    margin-top: .3em;
    width: 40%;
}

form .topBar {
    display: flex;
    gap: 2em;
}

form .form-group {
    display: flex;
    flex-direction: column;
    gap: .3em;
    width: 12%;
}

form .form-group label {
    margin-left: .3em;
    color: var(--vt-c-black-mute)
}

form input {
    padding: .35em 0;
}

form input[type="text"] {
    width: 90%;
    padding-left: .5em;
}

form input:disabled, form select:disabled, form select:disabled option {
    background: rgb(209 209 209);
    border: 1px solid #000;
    color: var(--vt-c-black-mute);
}

form input:disabled:hover, form select:disabled:hover {
    cursor: not-allowed;
}

.error_modal_form {
    opacity: 0;
    padding: 0;
    margin: 0;
    color: red;
    font-size: .9em;
}

.bigModal {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 10;
    background: rgba(184, 184, 184, 0.8);
    display: none;
    justify-content: flex-end;
}
    
.bigModal.active {
    display: flex;
}

.bigModal .header {
    width: 100%;
    display: flex;
    align-items: center;
    padding: .5em 0 0 .5em;
    gap: 1em;
}

.bigModal .header h4 {
    font-size: 18px;
    color: var(--vt-c-black-mute)
}

.bigModal .formWrap {
    background: #fff;
    width: 40%;
}

.bigModal .formWrap #close {
    margin: 0;
    color: #000;
    font-size: 18px;
    width: 30px;
    height: 30px;
}

.bigModal .formWrap #close:hover {
    cursor: pointer;
}

.bigModal .formWrap #close::after {
    display: inline-block;
    content: "\00d7";
    font-size: 35px;
    transform: translateY(-28%) translateX(10%);
}
</style>
