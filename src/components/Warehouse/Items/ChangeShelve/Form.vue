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
</style>