<script>
import { mapState } from 'vuex'
import LoadingDots from "../../../icons/loadingDots.vue"
import row from './row.vue'

export default {
    data() {
        return {
            loading: false
        }
    },
    components: {LoadingDots, row},
    computed: {
        ...mapState({
            orders: state => state.sparepartsOrders.orders
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
    <div class="sparepartsOrdersTable">
        
        <table> 
            <div class="loadingWrap" :class="{active: this.loading}">
                <LoadingDots :active="this.loading"/>
            </div>
            <tr>
                <th></th>
                <th>kategoria</th>
                <th>producent</th>
                <th>model</th>
                <th>ilość</th>
                <th>planowana data dostawy</th>
                <th>status</th>
                <th>akcje</th>
            </tr>
            <row v-for="order in orders" :key="order.part_order_id" :data="order"/>
        </table>
    </div>
</template>
<style>
    .sparepartsOrdersTable table {
        width: 70%;
    }

    .sparepartsOrdersTable table tr th:nth-child(1), .sparepartsOrdersTable table tr td:nth-child(1) {
        width: 3%;
    }

    .sparepartsOrdersTable table tr th:nth-child(5), .sparepartsOrdersTable table tr td:nth-child(5) {
        width: 8%;
    }

    .sparepartsOrdersTable table tr th:last-of-type, .sparepartsOrdersTable table tr td:last-of-type {
        width: 5%;
    }

    table .loadingWrap {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: none
    }

    table .loadingWrap.active {
        display: block;
        background: rgba(85, 85, 85, 0.322);
        z-index: 2;
    }
</style>