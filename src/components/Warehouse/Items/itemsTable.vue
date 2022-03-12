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
            console.log(data)
        }
    }
}
</script>
<template>
    <div class="itemsTable">
        <itemRow v-if="this.items.lenght > 0"/>
    </div>
</template>
<style></style>