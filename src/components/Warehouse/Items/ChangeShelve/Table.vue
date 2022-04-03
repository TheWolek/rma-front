<script>
import ChangeShelveNew from "./AddNewRow.vue"
import ChangeShelveItemRow from "./ItemRow.vue"
import { mapState } from 'vuex'
export default {
    components: {ChangeShelveNew, ChangeShelveItemRow},
    computed: {
        ...mapState({
            form_active: state => state.changeShelve.form_active,
            items: state => state.changeShelve.items
        }),
    }
}
</script>
<template>
    <table id="changeShelve">
        <tr>
            <th></th>
            <th>kod kreskowy</th>
            <th>ID zgłoszenia</th>
            <th>kategoria</th>
            <th>model</th>
        </tr>
        <ChangeShelveItemRow v-for="item in items" :key="item.ticket_id" :data="item"/>
        <ChangeShelveNew/>
    </table>
</template>
<style scoped>
    table#changeShelve tr th:nth-child(1), table#changeShelve tr td:nth-child(1) {
        width: 2%;
    }

    table#changeShelve tr th:nth-child(3), table#changeShelve tr td:nth-child(3) {
        width: 9%;
    }

    table#changeShelve tr th:nth-child(4), table#changeShelve tr td:nth-child(4) {
        width: 25%;
    }

    table#changeShelve tr th:nth-child(5), table#changeShelve tr td:nth-child(5) {
        width: 30%;
    }

    table#changeShelve {
        width: 80%;
    }
</style>