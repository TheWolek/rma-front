<script>
import ChangeShelveActions from "../../../components/Warehouse/Items/ChangeShelve/Actions.vue"
import ChangeShelveModal from "../../../components/Warehouse/Items/ChangeShelve/Modal.vue"
import ChangeShelveForm from "../../../components/Warehouse/Items/ChangeShelve/Form.vue"

export default {
  components: {ChangeShelveActions, ChangeShelveModal, ChangeShelveForm}
}
</script>
<template>
  <div id="warehouseItemsChangeShelve">
    <ChangeShelveModal/>
    <ChangeShelveActions/>
    <div class="warehouseItemsChangeShelve_wrap">
      <h1>Zmiana lokalizacji produktu</h1>
      <ChangeShelveForm/>
    </div>
  </div>
</template>

<style>
#warehouseItemsChangeShelve {
    min-height: 94vh;
    display: flex;
    flex-direction: column;
    position: relative;
}

.warehouseItemsChangeShelve_wrap {
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
        width: 100%;
        height: 100%;
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
