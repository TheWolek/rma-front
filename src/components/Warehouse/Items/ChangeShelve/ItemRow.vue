<script>
import store from "../../../../store"

export default {
    props: ["item"],
    data() {
        return {
            barcode: '',
            ticket_id: '',
            category: '',
            model: ''
        }
    },
    mounted() {
        this.barcode = this.item.barcode
        this.ticket_id = this.item.ticket_id
        this.model = this.item.model
        this.category = this.item.category
    },
    methods: {
        deleteItem() {
            // this.emitter.emit("changeShelve_deleteItem", {barcode: this.barcode})
            store.commit("removeItem", this.barcode)
        }
    }
}
</script>
<template>
    <tr>
        <td><div class="deleteIcon" @click="deleteItem"></div></td>
        <td>{{barcode}}</td>    
        <td>{{ticket_id}}</td>
        <td>{{category}}</td>
        <td>{{model}}</td>
    </tr>    
</template>
<style>
    td .deleteIcon {
        display: block;
        width: 100%;
        height: 100%;
        position: relative;
    }

    td .deleteIcon:hover {
        cursor: pointer;
    }

    td .deleteIcon::after {
        position: absolute;
        display: inline;
        content: "\00d7";
        font-size: 25px;
        transform: translateY(-55%) translateX(-30%);
    }
</style>