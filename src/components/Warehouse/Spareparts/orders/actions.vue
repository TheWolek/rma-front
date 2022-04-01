<script>
export default {
    data() {
        return {
            loading: false
        }
    },
    methods: {
        toggleNewModal() {

        },
        toggleFindModal() {

        },
        onRefresh() {
            
        }
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