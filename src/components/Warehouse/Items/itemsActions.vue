<script>
import { mapState } from 'vuex'
import store from '../../../store'
import fetchItemsData from './fetchItemsData'

export default {
    data() {
        return {
            loading: false
        }
    },
    computed: {
        ...mapState({
            appliedFilter: state => state.items.appliedFilter
        })
    },
    methods: {
        toggleNewModal() {
            store.commit("items/toggleCreateModal")
        },
        toggleFindModal() {
            store.commit("items/toggleFindModal")
        },
        toggleShelveFindModal() {
            store.commit("items/toggleShelveFindModal")
        },
        onRefresh() {
            if (this.appliedFilter.active) {
                if (this.appliedFilter.barcode != null) {
                    fetchItemsData(`http://localhost:3000/warehouse/items?barcode=${this.appliedFilter.barcode}`)
                    return
                }

                if (this.appliedFilter.shelve != null) {
                    let shelveId = this.shelves.find(o => o.code == this.appliedFilter.shelve).shelve_id
                    console.log(shelveId)
                    fetchItemsData(`http://localhost:3000/warehouse/items/shelve?shelve=${shelveId}`)
                    return
                }
            }
        }
    },
    mounted() {
        this.emitter.on("refreshing", (state) => {
            if (state) {
                this.loading = true
            } else {
                this.loading = false
            }
        })
    }
}
</script>
<template>
    <div class="actions">
        <div class="actionBtn" id="btn1" @click="toggleNewModal"> + Nowy</div>
        <div class="actionBtn" id="btn2" @click="toggleFindModal">Kod kreskowy</div>
        <div class="actionBtn" id="btn3" @click="toggleShelveFindModal">Lokalizacja</div>
        <div class="actionBtn" id="btn4">Usuń</div>
        <div class="actionBtn" id="btn5" @click="onRefresh" :class="{active: this.loading}"><img src="@/assets/refresh.svg"/></div>
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

    .actionBtn img {
        width: 20px;
    }

    #btn5 img {
        transition: transform .2s ease-out;
    }

    #btn5:hover img {
        transform: rotate(90deg);
    }

    #btn5 img.active {
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        100% {
            transform: rotate(360deg);
        }
    }
</style>