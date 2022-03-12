<script>
export default {
    data() {
        return {}
    },
    mounted() {
        
    },
    methods: {
        toggleChangeModal() {
            document.getElementById("changeShelveModalWrap").classList.toggle("active")
        },
        clearForm() {
            this.emitter.emit("clear_shelves")
        }
    }
}
</script>
<template>
    <div class="actions">
        <div class="actionBtn" id="btn1" @click="toggleChangeModal"> + Nowy</div>
        <div class="actionBtn" id="btn2" @click="clearForm">Anuluj</div>
        <div class="actionBtn" id="btn3" @click="submit">Przetwarzaj</div>
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
        position: relative;
        display: flex;
    }

    .actionBtn:hover {
        cursor: pointer;
        background: rgb(195, 196, 197);
    }
</style>