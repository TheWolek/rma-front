<script>
export default {
    props: ["data"]
}
</script>
<template>
    <tr :id="this.data.item_id">
        <td><input type="checkbox" :id="this.data.item_id"></td>
        <td>{{this.data.ticket_id}}</td>
        <td>{{this.data.category}}</td>
        <td>{{this.data.name}}</td>
        <td :id="this.data.shelve">{{this.data.shelve_code}}</td>
        <td>Akcje</td>
    </tr>
</template>
<style></style>