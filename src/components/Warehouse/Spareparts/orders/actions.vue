<script>
import { mapState } from 'vuex'
import store from '../../../../store'
export default {
    methods: {
        toggleNewModal() {
            store.commit("sparepartsOrders/toggleCreateModal")
        },
        toggleFindModal() {
            store.commit("sparepartsOrders/toggleFindModal")
        },
        onRefresh() {
            store.dispatch("sparepartsOrders/fetchOrdersByFilters")
        }
    },
    computed: {
        ...mapState({
            loading: state => state.sparepartsOrders.refreshingTable
        })
    }
}
</script>
<template>
    <div class="actions">
        <div class="actionBtn" id="btn1" @click="toggleNewModal"> + Nowy</div>
        <div class="actionBtn" id="btn2" @click="toggleFindModal">Szukaj</div>
        <div class="actionBtn refreshBtn" id="btn5" @click="onRefresh"><img src="@/assets/refresh.svg" :class="{active: this.loading}"/></div>
    </div>
</template>