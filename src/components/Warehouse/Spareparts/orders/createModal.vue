<script>
import { mapState } from 'vuex'
import store from '../../../../store'
export default {
    data() {
        return {
            model: '',
            error_model: '',
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
            this.error_model = ''
            this.amount = ''
            this.error_amount = ''
            this.date = ''
            this.error_date = ''
        },
        toggleModal() {
            store.commit("sparepartsOrders/toggleCreateModal")
            this.clearData()
        },
        showError(context, error) {
            if (context == "error_amount") return this.error_amount = error
            if (context == "error_model") return this.error_model = error
            if (context == "error_date") return this.error_date = error
        },
        clearError(context) {
            if (context == "error_amount") return this.error_amount = ''
            if (context == "error_model") return this.error_model = ''
            if (context == "error_date") return this.error_date = ''
        },
        onChangeAmount() {
            const reg = /^([1-9]{1,})([0-9]{0,})$/
            if (!reg.test(this.amount)) {
                this.showError("error_amount", "podaj poprawną ilość")
            } else {
                this.clearError("error_amount")
            }
        },
        onChangeModel() {
            if (this.model !== '') this.clearError("error_model")
        },
        onChangeDate() {
            if (this.date !== '') this.clearError("error_date")
        },
        handleSubmitCreate() {
            if (this.model === '') return this.showError("error_model", "wybierz model")
            if (this.amount === '') return this.showError("error_amount", "wpisz ilość")
            if (this.date === '') return this.showError("error_date", "wybierz datę")
            
            let date = new Date(this.date).toISOString()
            let data = {
                category_id: this.model,
                amount: this.amount,
                exp_date: date
            }
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            };

            fetch("http://localhost:3000/warehouse/spareparts/orders", requestOptions)
            .then(async res => {
                const resData = await res.json()
                
                if (!res.ok) {
                    const error = (resData && resData.message) || res.status
                    return Promise.reject(error)
                }

                let item = {
                    part_order_id: resData.order_id,
                    amount: this.amount,
                    expected_date: date,
                    part_cat_id: this.model,
                    status: 0
                }

                store.dispatch("sparepartsOrders/submitModal_Create", item)
                this.toggleModal()
            })
            .catch(error => {
                return this.displayError(error)
            })
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
            <form v-on:submit.prevent="handleSubmitCreate">
                <div class="form-group">
                   <label for="model">Model</label>
                    <div>
                        <select id="model" v-model="model" @change="onChangeModel">
                            <option disabled value="">Model</option>
                            <option v-for="el in categories" :key="el.part_cat_id" :value="el.part_cat_id">{{el.producer + " " + el.name}}</option>
                        </select>
                        <p id="error_model" class="error_modal_form" :class="{active:this.error_model !== ''}">{{this.error_model}}</p>
                    </div> 
                </div>
                <div class="form-group">
                   <label for="amount">ilość</label>
                    <div>
                        <input type="number" id="amount" v-model.lazy="amount" @change="onChangeAmount"/>
                        <p id="error_amount" class="error_modal_form" :class="{active:this.error_amount !== ''}">{{this.error_amount}}</p>
                    </div> 
                </div>
                <div class="form-group">
                   <label for="date">data dostawy</label>
                    <div>
                        <input type="date" id="date" v-model="date" :min="new Date().toISOString().split('T')[0]" @change="onChangeDate"/>
                        <p id="error_date" class="error_modal_form" :class="{active:this.error_date !== ''}">{{this.error_date}}</p>
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