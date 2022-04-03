<script>
import ChangeShelveTable from "./Table.vue"
import { mapState } from 'vuex'

export default {
    components: {ChangeShelveTable},
    data() {
        return {
            activeShelve: '',
            newShelve: '',
        }
    },
    mounted() {
        if (this.form_active.status) {
            this.activeShelve = this.form_active.active
            this.newShelve = this.form_active.new
        }
    },
    computed: {
        ...mapState({
            form_active: state => state.changeShelve.form_active
        }),
    },
    watch: {
        form_active(status) {
            if (status.status) {
                this.activeShelve = status.active
                this.newShelve = status.new
            } else {
                this.activeShelve = ''
                this.newShelve = ''
            }
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
                <input type="text" id="newShelve" v-model="newShelve" disabled/>
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

form input:disabled, form select:disabled, form select:disabled option {
    background: rgb(209 209 209);
    border: 1px solid #000;
    color: var(--vt-c-black-mute);
}

form input:disabled:hover, form select:disabled:hover {
    cursor: not-allowed;
}
</style>