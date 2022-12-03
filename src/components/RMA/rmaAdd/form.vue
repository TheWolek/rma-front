<script>
export default {
  data() {
    return {
      email: "",
      name: "",
      phone: "",
      deviceSn: "",
      deviceName: "",
      deviceProducer: "",
      type: "",
      deviceAccessories: "",
      issue: "",
    };
  },
  methods: {
    onSubmit() {
      console.log("yes");
    },
  },
};
</script>
<template>
  <div class="formWrap">
    <form action="" @submit.prevent="onSubmit">
      <div class="device">
        <h3>Dane urządzenia</h3>
        <div class="form-group">
          <label for="deviceProducer">Producent</label>
          <input type="text" id="deviceProducer" v-model="deviceProducer" />
        </div>
        <div class="form-group">
          <label for="deviceName">Model</label>
          <input type="text" id="deviceName" v-model="deviceName" />
        </div>
        <div class="form-group">
          <label for="deviceSn">Numer seryjny</label>
          <input type="text" id="deviceSn" v-model="deviceSn" />
        </div>
        <div class="form-group">
          <label for="deviceAccessories">Dołączone akcesoria</label>
          <input
            type="text"
            id="deviceAccessories"
            v-model="deviceAccessories"
          />
        </div>
      </div>
      <div class="owner">
        <h3>Dane zgłaszającego</h3>
        <div class="form-group">
          <label for="name">Imię i nazwisko</label>
          <input type="text" id="name" v-model="name" />
        </div>
        <div class="form-group">
          <label for="phone">Telefon</label>
          <input type="text" id="phone" v-model="phone" />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="text" id="email" v-model="email" />
        </div>
      </div>
      <div class="ticket">
        <h3>Dane zgłoszenia</h3>
        <div class="form-group">
          <label>Typ zgłoszenia</label>
          <label for="gw" class="radioLabel"
            ><input
              type="radio"
              name="type"
              id="gw"
              value="1"
              v-model="type"
              checked
            />Naprawa gwarancyjna</label
          >
          <label for="np" class="radioLabel"
            ><input
              type="radio"
              name="type"
              id="np"
              value="2"
              v-model="type"
            />Naprawa płatna</label
          >
        </div>
        <div class="form-group">
          <label for="issue">Opis problemu</label>
          <textarea
            name="issue"
            id="issue"
            v-model="issue"
            cols="30"
            rows="10"
          ></textarea>
        </div>
      </div>
      <input type="submit" value="Dodaj" />
    </form>
  </div>
</template>
<style scoped>
form {
  display: grid;
  width: 60%;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
}

.owner,
.device {
  width: 100%;
}

.ticket {
  width: 80%;
  grid-column: 1/3;
}

h3 {
  color: var(--vt-c-black-mute);
  margin-bottom: 10px;
}

.form-group {
  width: 100%;
}

.form-group + .form-group {
  padding-top: 0.5em;
}

input[type="radio"] {
  width: auto;
  margin-right: 0.5em;
}

.radioLabel {
  cursor: pointer;
  width: fit-content;
}

input[type="submit"] {
  background: rgb(21, 129, 230);
  color: #fff;
  border: 0px;
  padding: 0.5em;
}
</style>
