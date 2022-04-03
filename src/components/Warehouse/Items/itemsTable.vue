<script>
import itemRow from './itemRow.vue'
import { mapState } from 'vuex'
import LoadingDots from '../../icons/loadingDots.vue'

export default {
    data() {
        return {
            loading: false
        }
    },
    components: {itemRow, LoadingDots},
    computed: {
        ...mapState({
            items: state => state.items.items
        })
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
    <div class="itemsTable">
        <table>
            <div class="loadingWrap" :class="{active: this.loading}">
                <LoadingDots :active="this.loading"/>
            </div>
            <tr>
                <th></th>
                <th>ID zgłoszenia</th>
                <th>kategoria</th>
                <th>model</th>
                <th>lokalizacja</th>
                <th>akcje</th>
            </tr>
            <itemRow v-for="item in items" :key="item.item_id" :data="item"/>
        </table>
        
    </div>
</template>
<style scoped>
    .itemsTable table tr th:nth-child(1), .itemsTable table tr td:nth-child(1) {
        width: 3%;
    }

    .itemsTable table tr th:nth-child(2), .itemsTable table tr td:nth-child(2) {
        width: 7%;
        padding: .3em;
    }

    .itemsTable table tr th:nth-child(5), .itemsTable table tr td:nth-child(5) {
        width: 10%;
    }

    .itemsTable table tr th:last-of-type, .itemsTable table tr td:last-of-type {
        width: 4%;
    }

    .itemsTable table tr td:last-of-type {
        padding-left: 0px;
    }
</style>