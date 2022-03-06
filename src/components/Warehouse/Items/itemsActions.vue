<script>
export default {
    methods: {
        toggleNewModal() {
            document.getElementById("itemCreateModalWrap").classList.toggle("active")
        }
    }
}
</script>
<template>
    <div class="actions">
        <div class="actionBtn" id="btn1" v-on:click="toggleNewModal"> + Nowy</div>
        <div class="actionBtn" id="btn2">Kod kreskowy</div>
        <div class="actionBtn" id="btn3">Półka</div>
        <div class="actionBtn" id="btn4">Usuń</div>
    </div>    
</template>
<style>
    .actions {
        padding: .3em 0 .8em 0;
        display: flex;
        gap: 1em;
    }

    .actionBtn {
        background: rgb(205, 206, 207);
        color: var(--vt-c-black-mute);
        font-weight: bold;
        transition: background-color .2s ease-out;
        padding: .2em .5em;
    }

    .actionBtn:hover {
        cursor: pointer;
        background: rgb(195, 196, 197);
    }
</style>