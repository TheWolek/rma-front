<script>
export default {
    props: ["data"],
    data() {
        return {
            activeMenu: false
        }
    },
    mounted() {
        this.emitter.on("items_closeAllBurgerMenus", () => {
            this.activeMenu = false
        })
        this.emitter.on("items_openBurgerMenu", (id) => {
            if (this.data.item_id == id) {
                this.activeMenu = true
            }
        })
    },
    methods: {
        toggleMenu() {
            if (!this.activeMenu) {
                this.emitter.emit("items_burgerMenuRequest", {id: this.data.item_id})
            } else {
                this.emitter.emit("items_burgerMenuClosed", {id: this.data.item_id})
                this.activeMenu = false;
            }
        },
        changeLocalization() {
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
        <td :id="this.data.shelve">{{this.data.shelve_code}}</td>
        <td class="actionCell">
            <div class="burger" @click="toggleMenu">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div class="menu" :class="{active: this.activeMenu}">
                <ul>
                    <li @click="changeLocalization">Zmień lokalizacje</li>
                    <li>Usuń</li>
                </ul>
            </div>
        </td>
    </tr>
</template>
<style>
    .actionCell {
        position: relative;
    }

    .actionCell .burger {
        width: 25px;
        height: 30px;
        display: flex;
        flex-direction: column;
        gap: 4px;
        justify-content: center;
        cursor: pointer;
        margin: 0 auto;
    }

    .actionCell .burger span {
        background: #000;
        display: block;
        width:100%;
        height: 4px;
        border-radius: 5px;
    }

    .actionCell .menu {
        position: absolute;
        top: 20%;
        right: -140px;
        width: 150px;
        border:1px solid rgb(9, 40, 68);
        border-radius: 4px;
        display: none;
        z-index: 10;
    }

    .actionCell .menu.active {
        display: block;
    }

    .actionCell .menu ul li {
        padding: .3em .5em;
        background: rgb(25, 103, 175);
        color: #fff;
        transition: .2s ease-out;
    }

    .actionCell .menu ul li+li {
        border-top: 1px solid var(--vt-c-black-mute);
    }

    .actionCell .menu ul li:hover {
        cursor: pointer;
        background: rgb(19, 82, 141);
    }
</style>