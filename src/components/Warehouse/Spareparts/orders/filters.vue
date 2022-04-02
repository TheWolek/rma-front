<script>
import { mapState } from 'vuex'
export default {
    data() {
        return {
            filters: {}
        }
    },
    computed: {
        ...mapState({
            appliedFilters: state => state.sparepartsOrders.appliedFilters
        })
    },
    methods: {
        deleteFilter(filter) {

        }
    }
}
</script>
<template>
    <div>
        <div class="filterWrap" :class="{active: this.appliedFilters.active}">
            <div v-for="(val, key) in appliedFilters.names" :key="key" class="filterChip" @click="()=>{deleteFilter()}">
                {{val}}
                <div class="close"></div>
            </div>
        </div>
    </div>
</template>
<style>

</style>