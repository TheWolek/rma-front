<script>
export default {

}
</script>
<template>
    <div id="itemShelveFindModalWrap" class="bigModal">
        <div class="formWrap">
            <div class="header">
                <div id="close" v-on:click="toggleModal_shelveFind"></div>
                <h4>Wyszukiwanie produktu po kodzie kreskowym</h4>
            </div>
            <form v-on:submit.prevent="handleSubmit_shelveFind">
                <label for="shelveCode">Kod kreskowy</label>
                <div>
                    <input type="text" id="shelveCode" v-model.lazy="shelveCode" @change="onChange_shelveCode"/>
                    <p id="error_shelveCode">{{this.error_shelveCode}}</p>
                </div>
                <input type="submit" value="Szukaj">
            </form>
        </div>
    </div>    
</template>
<style>
    
</style>