<script>
import ChangeShelveNew from "./ChangeShelveNew.vue"
export default {
    components: {ChangeShelveNew},
    data() {
        return {
            itemsToAdd: []
        }
    },
    mounted() {
        this.emitter.on("itemAdded", evData => {
            this.itemsToAdd.push(evData)
            console.log(this.itemsToAdd)
        })
    }
}
</script>
<template>
    <table id="changeShelve">
        <tr>
            <th>kod kreskowy</th>
            <th>ID zgłoszenia</th>
            <th>kategoria</th>
            <th>model</th>
        </tr>
        <ChangeShelveNew/>
    </table>
</template>
<style>
    table#changeShelve tr th:nth-child(1), table#changeShelve tr td:nth-child(1),
    table#changeShelve tr th:nth-child(4), table#changeShelve tr td:nth-child(4) {
        width: 35%;
    }
    table#changeShelve tr th:nth-child(2), table#changeShelve tr td:nth-child(2) {
        width: 10%;
    }
    table#changeShelve tr th:nth-child(3), table#changeShelve tr td:nth-child(3) {
        width: 20%;
    }
</style>