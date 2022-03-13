<script>
import ChangeShelveNew from "./AddNewRow.vue"
import ChangeShelveItemRow from "./ItemRow.vue"
export default {
    components: {ChangeShelveNew, ChangeShelveItemRow},
    data() {
        return {
            itemsToAdd: []
        }
    },
    mounted() {
        this.emitter.on("itemAdded", evData => {
            if (this.itemsToAdd.includes(evData)) return this.addingFail()
            if (this.IfCodeExistsInList(evData)) return this.addingFail()

            fetch(`http://localhost:3000/warehouse/items/exists?barcode=${evData}`)
            .then(async res => {
                const resData = await res.json()
                if (res.status == 404) {
                    return this.addingFail()
                }
                if (!res.ok) {
                    const error = (resData && resData.message) || res.status
                    return Promise.reject(error)
                }

                let dataToPush = {
                    barcode: evData,
                    ticket_id: evData.split("-")[0],
                    model: evData.split("-")[1],
                    category: evData.split("-")[2]
                }
                if (this.itemsToAdd.length == 0) {
                    this.emitter.emit("changeShelve_ableToSubmit", true)
                }
                this.itemsToAdd.push(dataToPush)
                this.emitter.emit("addingSuccess")
            })
            .catch(error => {
                return console.log(error)
            })
        })

        this.emitter.on("clear_shelves", () => {
            this.itemsToAdd = []
        })
        this.emitter.on("changeShelve_process", () => {
            this.emitter.emit("changeShelve_submit", this.itemsToAdd)
        })
        this.emitter.on("changeShelve_success", () => {
            this.itemsToAdd = []
        })
        this.emitter.on("changeShelve_deleteItem", (code) => {
            let idToDelete
            this.itemsToAdd.forEach(el=> {
                if (el.barcode == code) {
                    idToDelete = this.itemsToAdd.indexOf(el)
                    return
                }
            })
            this.itemsToAdd.splice(idToDelete, 1)
            if (this.itemsToAdd.length == 0) this.emitter.emit("changeShelve_ableToSubmit", false)
        })
    },
    methods: {
        addingFail() {
            return this.emitter.emit("addingFail")
        },
        IfCodeExistsInList(code) {
            let fail = false

            if (this.itemsToAdd.length > 0) {
                this.itemsToAdd.forEach(el => {
                    if (el.barcode == code) {
                        fail = true
                        return
                    }
                })
                return fail
            }
            return fail
        }
    }
}
</script>
<template>
    <table id="changeShelve">
        <tr>
            <th></th>
            <th>kod kreskowy</th>
            <th>ID zgłoszenia</th>
            <th>kategoria</th>
            <th>model</th>
        </tr>
        <ChangeShelveItemRow v-for="item in itemsToAdd" :key="item.ticket_id" :item="item"/>
        <ChangeShelveNew/>
    </table>
</template>
<style>
    table#changeShelve tr th:nth-child(1), table#changeShelve tr td:nth-child(1) {
        width: 2%;
    }

    table#changeShelve tr th:nth-child(3), table#changeShelve tr td:nth-child(3) {
        width: 8%;
    }

    /* table#changeShelve tr th:nth-child(2), table#changeShelve tr td:nth-child(2),
    table#changeShelve tr th:nth-child(4), table#changeShelve tr td:nth-child(4) {
        width: 30%;
    }
    
    table#changeShelve tr th:nth-child(5), table#changeShelve tr td:nth-child(5) {
        width: 30%;
    } */
</style>