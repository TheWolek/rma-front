<script>
import { mapState } from 'vuex'
import store from '../../../../store'
    export default {
        data() {
            return {
                model: '',
                error_model: '',
                date: '',
                error_date: '',
                status: '',
                error_status: '',
                error_form: ''
            }
        },
        computed: {
            ...mapState({
                findModalActive: state => state.sparepartsOrders.findModal_active,
                categories: state => state.sparepartsOrders.categories,
                statuses: state => state.sparepartsOrders.statuses
            }),
            error_formActive() {
                if (this.error_form != '' && (this.model != '' || this.date != '' || this.status != '')) {
                    this.error_form = ''
                    return false
                }
                if (this.error_form == '') return false
                return true
            }
        },
        methods: {
            clearData() {
                this.model = '',
                this.date = '',
                this.status = '',
                this.error_model = ''
                this.error_date = ''
                this.error_status = ''
                this.error_form = ''
            },
            toggleModal() {
                store.commit("sparepartsOrders/toggleFindModal")
                this.clearData()
            },
            showError(context, error) {
                if (context == 'error_form') return this.error_form = error
            },
            handleSubmit() {
                if (this.model === '' && this.status === '' && this.date === '') {
                    return this.showError("error_form", "uzupełnij przynajmniej jedną opcję")
                }
                
                let url = `http://localhost:3000/warehouse/spareparts/orders/?`

                if (this.model !== '') url += `partCatId=${this.model}`
                if (this.status !== '') {
                    if (this.model !== '') url += `&`
                    url += `status=${this.status}`
                }
                if (this.date !== '') {
                    if (this.model !== '' || this.status !== '') url += `&`
                    url += `expDate=${this.date}`
                }
                
                fetch(url)
                .then(async res => {
                    this.emitter.emit("refreshing", true)
                    const resData = await res.json()
                    let filters = {
                        active: true, 
                        names: {}
                    }

                    let model = this.categories.find(o => o.part_cat_id === this.model)

                    if (this.model !== '') filters.names.partCatId = [model.producer + " " + model.name, this.model]
                    if (this.status !== '') filters.names.status = [this.statuses[this.status].name, this.status]
                    if (this.date !== '') filters.names.expDate = [this.date, this.date] //[this.date, new Date(this.date).toISOString()]

                    if (!res.ok) {
                        this.emitter.emit("refreshing", false)
                        if (res.status == 404) {
                            store.dispatch("sparepartsOrders/submitModal_Find", {
                                data: [],
                                filters, filters
                            })
                            this.toggleModal()
                            return
                        }
                        const error = (resData && resData.message) || res.status
                        return Promise.reject(error)
                    }
                    this.toggleModal()
                    setTimeout(() => {
                        store.dispatch("sparepartsOrders/submitModal_Find", {
                            data: resData, 
                            filters: filters
                        })
                        this.emitter.emit("refreshing", false)
                    }, 500)
                })
                .catch(error => {
                    return this.showError("form_error",error)
                })
            }
        }
    }
</script>
<template>
    <div id="sparepartsOrderFindModalWrap" class="bigModal" :class="{active: this.findModalActive}">
        <div class="formWrap">
            <div class="header">
                <div id="close" v-on:click="toggleModal"></div>
                <h4>Wyszukiwanie dostawy części</h4>
            </div>
            <form v-on:submit.prevent="handleSubmit">
                <div class="form-group">
                   <label for="model">Model</label>
                    <div>
                        <select id="model" v-model="model">
                            <option disabled value="">Model</option>
                            <option v-for="el in categories" :key="el.part_cat_id" :value="el.part_cat_id">{{el.producer + " " + el.name}}</option>
                        </select>
                        <p id="error_model" class="error_modal_form">{{this.error_model}}</p>
                    </div> 
                </div>
                <div class="form-group">
                   <label for="status">status</label>
                    <div>
                        <select id="status" v-model="status">
                            <option disabled value="">Status</option>
                            <option v-for="el in statuses" :key="el.id" :value="el.id">{{el.name}}</option>
                        </select>
                        <p id="error_status" class="error_modal_form">{{this.error_status}}</p>
                    </div> 
                </div>
                <div class="form-group">
                   <label for="date">data dostawy</label>
                    <div>
                        <input type="date" id="date" v-model="date"/>
                        <p id="error_date" class="error_modal_form">{{this.error_date}}</p>
                    </div> 
                </div>
                <input type="submit" value="Szukaj">
                <p id="error_form" class="error_modal_form" :class="{active: this.error_formActive}">{{this.error_form}}</p>
            </form>
        </div>
    </div>
</template>
<style>
    #sparepartsOrderFindModalWrap .form-group {
        width: 100%;
    }
</style>