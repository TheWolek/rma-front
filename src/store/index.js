import { createStore } from "vuex";
import changeShelve from './modules/changeShelve'
import items from './modules/items'

export default createStore({
    modules: {
        changeShelve,
        items
    }
})  