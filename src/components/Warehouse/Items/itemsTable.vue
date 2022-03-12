<script>
import itemRow from './itemRow.vue'

export default {
    components: {itemRow},
    data() {
        return {
            items: [],
            loading: false
        }
    },
    mounted() {
        this.emitter.on("addItem", evData => this.addItem(evData))
        this.emitter.on("itemsRefresh", () => this.refreshTable())
        this.emitter.on("findItem", evData => {
            this.items = []
            if (evData.data) {
                evData.data.shelve_code = this.shelves[evData.data.shelve].code;
                this.items.push(evData.data)
            }
        })
        this.emitter.on("findMulipleItems", evData => {
            this.items = evData.data
            this.items.forEach(el => {
                el.shelve_code = this.shelves[el.shelve].code
            });
        })
    },
    methods: {
        addItem(data) {
            console.log("itemsTable", data)
            let item = {
                id: data.resData.id,
                ticket_id: data.resData.ticket_id,
                name: data.data.barcode.split("-")[1],
                category: data.data.barcode.split("-")[2],
                shelve_code: this.shelves[data.resData.shelve].code,
                shelve: data.resData.shelve
            }
            this.items.push(item)
        },
        refreshTable() {
            this.loading = true;
            this.emitter.emit("refreshing")
            fetch("http://localhost:3000/warehouse/items")
            .then(async res => {
                const resData = await res.json()
                
                if (!res.ok) {
                    const error = (resData && resData.message) || res.status
                    return Promise.reject(error)
                }

                setTimeout(()=>{
                    resData.forEach(el => {
                        el.shelve_code = this.shelves[el.shelve].code
                    });

                    this.items = resData
                    this.loading = false
                    this.emitter.emit("refreshing")
                }, 500) 
            })
            .catch(error => {
                return console.log(error)
            })
        }
    }
}
</script>
<template>
    <div class="itemsTable">
        <table>
            <tr>
                <th></th>
                <th>ID zgłoszenia</th>
                <th>kategoria</th>
                <th>model</th>
                <th>lokalizacja</th>
                <th>akcje</th>
            </tr>
            <itemRow v-for="item in items" :key="item.id" :data="item"/>
        </table>
        
    </div>
</template>
<style>
    table th, table td {
        padding: .3em 0 .3em .7em;
        border-right: 1px solid rgb(146, 146, 146);
    }

    table th:last-of-type, table td:last-of-type {
        border-right: 0px;
    }

    table {
        border-collapse: collapse;
        margin: 25px 0;
        font-size: .9em;
        min-width: 400px;
        table-layout: fixed;
        width: 80%;
        color: var(--vt-c-black);
    }

    table th {
        text-align: left;
        background: #dadada;
        font-weight: bold;
    }

    table tr {
        border-bottom: 1px solid #ddd;
    }

    table tr:nth-of-type(even) {
        background: #f3f3f3;
    }

    table tr:last-of-type {
        border-bottom: 2px solid rgb(31, 125, 212);
    }

    table tr th:nth-child(1), table tr td:nth-child(1) {
        width: 3%;
    }

    table tr th:nth-child(2), table tr td:nth-child(2) {
        width: 7%;
        padding: .3em;
    }

    table tr th:nth-child(5), table tr td:nth-child(5) {
        width: 10%;
    }

    table tr th:last-of-type, table tr td:last-of-type {
        width: 12%;
    }
</style>