<script>
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
    }
}
</script>
<template>
    <tr>
        <td>{{barcode}}</td>    
        <td>{{ticket_id}}</td>
        <td>{{category}}</td>
        <td>{{model}}</td>
    </tr>    
</template>
<style>

</style>