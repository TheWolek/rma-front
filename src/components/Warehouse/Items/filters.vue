<script>
import { mapState } from 'vuex'
import store from '../../../store'
export default {
    computed: {
        ...mapState({
            appliedFilter: state => state.items.appliedFilter
        })
    },
    methods: {
        deleteAllFilters() {

        },
        deleteFilter(filter) {
            store.commit("items/clearFilter")
            store.commit("items/clearItems")
        }
    }
}
</script>
<template>
    <div>
        <div class="filterWrap" :class="{active: this.appliedFilter.active}">
            <div class="filterChip" @click="()=>{deleteFilter()}">
                {{appliedFilter.barcode || appliedFilter.shelve}}
                <div class="close"></div>
            </div>
        </div>
    </div>
</template>