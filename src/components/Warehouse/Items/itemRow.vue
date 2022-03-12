<script>
export default {
    props: ["data"]
}
</script>
<template>
    <tr>
        <td>{{this.data.ticket_id}}</td>
        <td>{{this.data.category}}</td>
        <td>{{this.data.name}}</td>
        <td>Akcje</td>
    </tr>
</template>
<style></style>