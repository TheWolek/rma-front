<script>
import itemRow from './itemRow.vue'
import { mapState } from 'vuex'
import store from '../../../store'

export default {
    components: {itemRow},
    computed: {
        ...mapState({
            items: state => state.items.items
        })
    }
}
</script>
<template>
    <div class="itemsTable">
        <table>
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

    .itemsTable table tr th:nth-child(1), table tr td:nth-child(1) {
        width: 3%;
    }

    .itemsTable table tr th:nth-child(2), table tr td:nth-child(2) {
        width: 7%;
        padding: .3em;
    }

    .itemsTable table tr th:nth-child(5), table tr td:nth-child(5) {
        width: 10%;
    }

    .itemsTable table tr th:last-of-type, table tr td:last-of-type {
        width: 4%;
    }

    .itemsTable table tr td:last-of-type {
        padding-left: 0px;
    }
</style>