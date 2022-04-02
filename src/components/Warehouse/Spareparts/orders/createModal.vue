<script>
import { mapState } from 'vuex'
import store from '../../../../store'
export default {
    data() {
        return {
            model: '',
            amount: '',
            error_amount: '',
            date: '',
            error_date: ''
        }
    },
    computed:{
        ...mapState({
            createModalActive: state => state.sparepartsOrders.createModal_active,
            categories: state => state.sparepartsOrders.categories
        })
    },
    methods: {
        clearData() {
            this.model = ''
            this.amount = ''
            this.error_amount = ''
            this.date = ''
            this.error_date = ''
        },
        toggleModal() {
            store.commit("sparepartsOrders/toggleCreateModal")
            this.clearData()
        },
        onChangeAmount() {

        },
        onChangeDate() {

        }
    }
}
</script>
<template>
    <div id="sparepartsOrderCreateModalWrap" class="bigModal" :class="{active: this.createModalActive}">
        <div class="formWrap">
            <div class="header">
                <div id="close" v-on:click="toggleModal"></div>
                <h4>Dodawanie nowej dostawy części</h4>
            </div>
            <form v-on:submit.prevent="handleSubmit">
                <div class="form-group">
                   <label for="model">Model</label>
                    <div>
                        <select id="model" v-model="model">
                            <option disabled value="">Model</option>
                            <option v-for="el in categories" :key="el.part_cat_id">{{el.producer + " " + el.name}}</option>
                        </select>
                    </div> 
                </div>
                <div class="form-group">
                   <label for="amount">ilość</label>
                    <div>
                        <input type="number" id="amount" v-model.lazy="amount" @change="onChangeAmount"/>
                        <p id="error_amount" class="error_modal_form">{{this.error_amount}}</p>
                    </div> 
                </div>
                <div class="form-group">
                   <label for="date">data dostawy</label>
                    <div>
                        <input type="date" id="date" v-model.lazy="date" @change="onChangeDate"/>
                        <p id="error_date" class="error_modal_form">{{this.error_date}}</p>
                    </div> 
                </div>
                <input type="submit" value="Dodaj">
            </form>
        </div>
    </div>
</template>
<style>
    #sparepartsOrderCreateModalWrap .form-group {
        width: 100%;
    }

    form select, form input[type="date"], form input[type="number"] {
        width: 90%;
        padding: 0.35em;
    }

    form input[type="number"]::-webkit-outer-spin-button, 
    form input[type="number"]::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
</style>