<script>
export default {
    data() {
        return {
            codeToAdd: ''
        }
    },
    methods: {
        onAdd() {
            this.emitter.emit("itemAdded", this.codeToAdd)
            this.codeToAdd = ''
        }
    }
}
</script>
<template>
    <tr>
        <td>
            <input class="addInput" type="text" v-model="codeToAdd" v-on:keyup.enter="onAdd"/>
        </td>
        <td></td>
        <td></td>
        <td></td>
    </tr>    
</template>
<style>
    input.addInput {
        width: 99% !important;
    }
</style>