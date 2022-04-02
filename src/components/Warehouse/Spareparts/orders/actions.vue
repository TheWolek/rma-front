<script>
import store from '../../../../store'
export default {
    data() {
        return {
            loading: false
        }
    },
    methods: {
        toggleNewModal() {
            store.commit("sparepartsOrders/toggleCreateModal")
        },
        toggleFindModal() {
            store.commit("sparepartsOrders/toggleFindModal")
        },
        onRefresh() {
            
        }
    },
    mounted() {
        this.emitter.on("refreshing", state => {
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
        <div class="actionBtn" id="btn2" @click="toggleFindModal">Szukaj</div>
        <div class="actionBtn" id="btn5" @click="onRefresh"><img src="@/assets/refresh.svg" :class="{active: this.loading}"/></div>
    </div>
</template>
<style>

</style>