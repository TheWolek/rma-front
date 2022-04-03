<script>
import { mapState } from 'vuex'
import store from '../../../store'
export default {
    props: ["data"],
    data() {
        return {
            activeMenu: false
        }
    },
    mounted() {
    },
    computed: {
        ...mapState({
            activeContextMenu: state => state.items.activeContextMenu
        }),
        check() {
            if (this.activeContextMenu == this.data.item_id) {
                return this.activeMenu = true
            } else {
                return this.activeMenu = false
            }
        }
    },
    methods: {
        toggleMenu() {
            if (!this.activeMenu) {
                store.dispatch("items/setContextMenu", this.data.item_id)
            } else {
                store.dispatch("items/closeContextMenu")
            }
        },
        changeLocalization() {
            store.dispatch("items/closeContextMenu")
            this.$router.push({ 
                name: 'itemsChangeShelve', 
                params: { 
                    barcode: (this.data.ticket_id + "-" + this.data.name + "-" + this.data.category),
                    activeShelve: this.data.shelve
                }
            })
        }
    }
}
</script>
<template>
    <tr :id="this.data.item_id">
        <td><input type="checkbox" :id="this.data.item_id"></td>
        <td>{{this.data.ticket_id}}</td>
        <td>{{this.data.category}}</td>
        <td>{{this.data.name}}</td>
        <td :id="this.data.shelve">{{this.data.shelve_code || this.shelves[this.data.shelve].code}}</td>
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