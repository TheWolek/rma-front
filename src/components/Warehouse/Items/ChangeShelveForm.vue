<script>
import ChangeShelveTable from "./ChangeShelveTable.vue"

export default {
    components: {ChangeShelveTable},
    data() {
        return {
            activeShelve: '',
            Items: [],
            newShelve: ''
        }
    },
    mounted() {
        this.emitter.on("active_shelve", evData => {
            console.log(evData)
            this.activeShelve = evData
        })
    },
    methods: {
        handleSubmit() {

        }
    }
}
</script>
<template>
    <form id="changeShelveForm" v-on:submit.prevent="handleSubmit">
        <div class="topBar">
            <div class="form-group">
                <label for="activeShelve">Bierząca lokalizacja</label>
                <input type="text" id="activeShelve" v-model="activeShelve" disabled/>
            </div>
            <div class="form-group">
                <label for="newShelve">Nowa lokalizacja</label>
                <input type="text" id="newShelve" v-model="newShelve"/>
            </div>
        </div>
        <div class="tableWrap">
            <ChangeShelveTable/>
        </div>
    </form>
</template>
<style>
form#changeShelveForm {
    padding: 0;
    width: 90%;
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

form input:disabled {
    background: rgb(145, 145, 145);
    border: 1px solid #000;
    color: #fff;
}

form input:disabled:hover {
    cursor: not-allowed;
}
</style>