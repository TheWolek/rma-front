<script>
import { mapState } from 'vuex'
export default {
    props: ["data"],
    data() {
        return {
            activeMenu: false,
            expDate: new Date(this.data.expected_date).toLocaleDateString(),
            modelData: {}
        }
    },
    computed: {
        ...mapState({
            categories: state => state.sparepartsOrders.categories,
            statuses: state => state.sparepartsOrders.statuses,
            activeContextMenu: state => state.sparepartsOrders.activeContextMenu
        }),
        check() {
            if (this.activeContextMenu == this.data.part_order_id) {
                return this.activeMenu = true
            } else {
                return this.activeMenu = false
            }
        }
    },
    mounted() {
        this.modelData = this.categories.find( o => o.part_cat_id === this.data.part_cat_id)
    }
}
</script>
<template>
    <tr :id="this.data.part_order_id">
        <td><input type="checkbox" :id="this.data.part_order_id"></td>
        <td>{{this.modelData.category}}</td>
        <td>{{this.modelData.producer}}</td>
        <td>{{this.modelData.name}}</td>
        <td>{{this.data.amount}}</td>
        <td>{{this.expDate}}</td>
        <td>{{this.statuses[this.data.status].name}}</td>
        <td class="actionCell">
            <div class="burger" @click="toggleMenu">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div class="menu" :class="{active: this.check}">
                <ul>
                    <li @click="changeLocalization">Zmień lokalizacje</li>
                    <li>Usuń</li>
                </ul>
            </div>
        </td>
    </tr>
</template>
<style>

</style>