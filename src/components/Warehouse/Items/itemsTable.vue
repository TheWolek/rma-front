<script>
import itemRow from './itemRow.vue'

export default {
    components: {itemRow},
    data() {
        return {
            items: []
        }
    },
    mounted() {
        this.emitter.on("addItem", evData => this.addItem(evData))
    },
    methods: {
        addItem(data) {
            console.log("itemsTable", data)
            let item = {
                id: data.resData.id,
                ticket_id: data.resData.ticket_id,
                name: data.data.barcode.split("-")[1],
                category: data.data.barcode.split("-")[2]
            }
            this.items.push(item)
        }
    }
}
</script>
<template>
    <div class="itemsTable">
        <table>
            <tr>
                <th>ID zgłoszenia</th>
                <th>kategoria</th>
                <th>model</th>
                <th>akcje</th>
            </tr>
            <itemRow v-for="item in items" :key="item.id" :data="item"/>
        </table>
        
    </div>
</template>
<style>
    table th, table td {
        padding: .3em 0 .3em .7em;
        border-right: 1px solid rgb(146, 146, 146);
    }

    table th:last-of-type, table td:last-of-type {
        border-right: 0px;
    }

    table {
        border-collapse: collapse;
        margin: 25px 0;
        font-size: .9em;
        min-width: 400px;
        table-layout: fixed;
        width: 80%;
        color: var(--vt-c-black);
    }

    table th {
        text-align: left;
        background: #dadada;
        font-weight: bold;
    }

    table tr {
        border-bottom: 1px solid #ddd;
    }

    table tr:nth-of-type(even) {
        background: #f3f3f3;
    }

    table tr:last-of-type {
        border-bottom: 2px solid rgb(31, 125, 212);
    }

    table tr th:nth-child(1), table tr td:nth-child(1) {
        width: 7%;
    }

    table tr th:nth-child(4), table tr td:nth-child(4) {
        width: 12%;
    }
</style>