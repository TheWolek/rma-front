<script>
import ChangeShelveTable from "./Table.vue"
import { mapState } from 'vuex'

export default {
    components: {ChangeShelveTable},
    data() {
        return {
            activeShelve: '',
            activeShelve_id: '',
            items: [],
            newShelve: '',
            newShelve_id: ''
        }
    },
    mounted() {
        // this.emitter.on("active_shelve", evData => {})
        // this.emitter.on("clear_shelves", () => {})
        if (this.form_active.status) {
            this.activeShelve = this.form_active.active
            this.newShelve = this.form_active.new
            this.activeShelve_id = this.shelves.find(o => o.code == this.activeShelve).shelve_id
            this.newShelve_id = this.shelves.find(o => o.code == this.newShelve).shelve_id
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
                this.activeShelve_id = this.shelves.find(o => o.code == this.activeShelve).shelve_id
                this.newShelve_id = this.shelves.find(o => o.code == this.newShelve).shelve_id
            } else {
                this.activeShelve = ''
                this.newShelve = ''
                this.activeShelve_id = ''
                this.newShelve_id = ''
                this.Items = []
            }
        }
    },
    methods: {
        handleSubmit() {
            const requestOptions = {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    barcodes: this.items,
                    new_shelve: this.newShelve_id,
                    shelve: this.activeShelve_id
                })
            };

            fetch("http://localhost:3000/warehouse/items/changeshelve", requestOptions)
            .then(async res => {
                const resData = await res.json()
                
                if (!res.ok) {
                    const error = (resData && resData.message) || res.status
                    return Promise.reject(error)
                }

                this.activeShelve = ''
                this.newShelve = ''
                this.items = []
                this.emitter.emit("changeShelve_success")
            })
            .catch(error => {
                return this.displayError(error)
            })
        },
        displayError(error) {
            console.log(error)
            this.emitter.emit("changeShelve_fail", error)
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

form input:disabled {
    background: rgb(209 209 209);
    border: 1px solid #000;
    color: var(--vt-c-black-mute)
}

form input:disabled:hover {
    cursor: not-allowed;
}
</style>