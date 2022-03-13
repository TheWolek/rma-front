<script>
import ItemsActions from "../../../components/Warehouse/Items/itemsActions.vue";
import ItemCreateModal from "../../../components/Warehouse/Items/itemCreateModal.vue";
import itemsTable from "../../../components/Warehouse/Items/itemsTable.vue";
import ItemsTable from "../../../components/Warehouse/Items/itemsTable.vue";
import ItemFindModal from '../../../components/Warehouse/Items/itemFindModal.vue'
import itemShelveFindModal from "../../../components/Warehouse/Items/itemShelveFindModal.vue";

export default {
    components: { ItemsActions, ItemCreateModal, itemsTable, ItemsTable, ItemFindModal, itemShelveFindModal },
}
</script>

<template>
  <div id="warehouseItems">
    <ItemCreateModal/>
    <ItemFindModal/>
    <itemShelveFindModal/>
    <ItemsActions/>
    <div class="warehouseItems_wrap">
      <h1>Wszystkie zarejestrowane produkty</h1>
      <ItemsTable/>
    </div>
  </div>
</template>

<style>
#warehouseItems {
    min-height: 94vh;
    display: flex;
    flex-direction: column;
    position: relative;
}

.warehouseItems_wrap {
  padding: .5em;
}

    .error_modal_form {
        opacity: 0;
        padding: 0;
        margin: 0;
        color: red;
        font-size: .9em;
    }

    .bigModal {
        position: absolute;
        width: 99%;
        height: 99%;
        z-index: 10;
        background: rgba(184, 184, 184, 0.8);
        display: none;
        justify-content: flex-end;
    }
    
    .bigModal.active {
        display: flex;
    }

    .header {
        width: 100%;
        display: flex;
        align-items: center;
        padding: .5em 0 0 .5em;
        gap: 1em;
    }

    h4 {
        font-size: 18px;
        color: var(--vt-c-black-mute)
    }

    .formWrap {
        background: #fff;
        width: 40%;
    }

    .formWrap #close {
        margin: 0;
        color: #000;
        font-size: 18px;
        width: 30px;
        height: 30px;
    }

    .formWrap #close:hover {
        cursor: pointer;
    }

    .formWrap #close::after {
        display: inline-block;
        content: "\00d7";
        font-size: 35px;
        transform: translateY(-28%) translateX(10%);
    }

    form {
        padding: 1em 2em;
        display: flex;
        flex-direction: column;
        width: 50%;
        gap: .5em;
    }

    form input {
        width: 70%;
        padding: .35em 0;
    }
    
    form label {
        color: var(--vt-c-black-mute)
    }

    form input[type="submit"] {
        margin-top: .3em;
        width: 40%;
    }
</style>
