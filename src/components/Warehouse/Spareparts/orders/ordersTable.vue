<script>
import { mapState } from 'vuex'
import LoadingDots from "../../../icons/loadingDots.vue"
import row from './row.vue'

export default {
    components: {LoadingDots, row},
    computed: {
        ...mapState({
            orders: state => state.sparepartsOrders.orders,
            loading: state => state.sparepartsOrders.refreshingTable
        })
    }
}
</script>
<template>
    <div class="sparepartsOrdersTable">
        <div class="tableLoadingWrap" :class="{active: this.loading}">
            <LoadingDots :active="this.loading"/>
        </div>
        <table>
            <tr>
                <th></th>
                <th>ID dostawy</th>
                <th>planowana data dostawy</th>
                <th>status</th>
                <th>akcje</th>
            </tr>
            <row v-for="order in orders" :key="order.part_order_id" :data="order"/>
        </table>
    </div>
</template>
<style scoped>
    .sparepartsOrdersTable table, .tableLoadingWrap {
        width: 40%;
    }

    .sparepartsOrdersTable table tr th:nth-child(1), .sparepartsOrdersTable table tr td:nth-child(1) {
        width: 5%;
    }

    .sparepartsOrdersTable table tr th:nth-child(2), .sparepartsOrdersTable table tr td:nth-child(2) {
        width: 15%;
    }

    .sparepartsOrdersTable table tr th:nth-child(3), .sparepartsOrdersTable table tr td:nth-child(3) {
        width: 40%;
    }

    .sparepartsOrdersTable table tr th:nth-child(4), .sparepartsOrdersTable table tr td:nth-child(4) {
        width: 20%;
    }

    .sparepartsOrdersTable table tr th:last-of-type, .sparepartsOrdersTable table tr td:last-of-type {
        width: 7%;
    }
</style>