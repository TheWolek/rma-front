<script>
export default {
    methods: {
        toggleNewModal() {
            document.getElementById("itemCreateModalWrap").classList.toggle("active")
        },
        toggleFindModal() {
            document.getElementById("itemFindModalWrap").classList.toggle("active")
        },
        onRefresh() {
            this.emitter.emit("itemsRefresh")
        },

    },
    mounted() {
        this.emitter.on("refreshing", () => {
            document.querySelector("#btn5 img").classList.toggle("active");
        })
    }
}
</script>
<template>
    <div class="actions">
        <div class="actionBtn" id="btn1" @click="toggleNewModal"> + Nowy</div>
        <div class="actionBtn" id="btn2" @click="toggleFindModal">Kod kreskowy</div>
        <div class="actionBtn" id="btn3">Półka</div>
        <div class="actionBtn" id="btn4">Usuń</div>
        <div class="actionBtn" id="btn5" @click="onRefresh"><img src="@/assets/refresh.svg"/></div>
    </div>    
</template>
<style>
    .actions {
        padding: .3em 0 .8em 0;
        display: flex;
        gap: 1em;
    }

    .actionBtn {
        background: rgb(205, 206, 207);
        color: var(--vt-c-black-mute);
        font-weight: bold;
        transition: background-color .2s ease-out;
        padding: .2em .5em;
        position: relative;
        display: flex;
    }

    .actionBtn:hover {
        cursor: pointer;
        background: rgb(195, 196, 197);
    }

    .actionBtn img {
        width: 20px;
    }

    #btn5 img {
        transition: transform .2s ease-out;
    }

    #btn5:hover img {
        transform: rotate(90deg);
    }

    #btn5 img.active {
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        100% {
            transform: rotate(360deg);
        }
    }
</style>