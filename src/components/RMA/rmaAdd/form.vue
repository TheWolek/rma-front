<script>
import store from "../../../store";
import textInput from "../../../parts/inputs/textInput.vue";
import submitButton from "../../../parts/buttons/submitButton.vue";
import selectInput from "../../../parts/inputs/selectInput.vue";
import checkboxGroup from "../../../parts/inputs/checkboxGroup.vue";
import {
  rmaDictionaryDamageTypes,
  rmaDictionaryAccesoriesTypes,
  getUrl,
} from "../../../helpers/endpoints";

export default {
  data() {
    return {
      email: "",
      name: "",
      phone: "",
      lines: "",
      postCode: "",
      city: "",
      deviceSn: "",
      deviceName: "",
      deviceCat: "",
      deviceProducer: "",
      type: 1,
      issue: "",
      err_deviceProducer: "",
      err_deviceName: "",
      err_deviceCat: "",
      err_deviceSn: "",
      err_deviceAccessories: "",
      err_name: "",
      err_phone: "",
      err_email: "",
      err_lines: "",
      err_postCode: "",
      err_city: "",
      err_issue: "",
      damageDescription: "",
      damageType: "",
      damageTypes: [],
      err_damageType: "",
      accesoriesTypes: [],
      deviceAccessories: [],
    };
  },
  methods: {
    clearErrors() {
      this.err_deviceProduce = "";
      this.err_deviceName = "";
      this.err_deviceSn = "";
      this.err_deviceAccessories = "";
      this.err_name = "";
      this.err_phone = "";
      this.err_email = "";
      this.err_issue = "";
      this.err_lines = "";
      this.err_postCode = "";
      this.err_city = "";
      this.err_deviceCat = "";
      this.err_damageType = "";
    },
    displayError(context, error = "", state = true) {
      switch (context) {
        case "deviceProducer":
          state
            ? (this.err_deviceProducer = error)
            : (this.err_deviceProducer = "");
          break;
        case "deviceName":
          state ? (this.err_deviceName = error) : (this.err_deviceName = "");
          break;
        case "deviceCat":
          state ? (this.err_deviceCat = error) : (this.err_deviceCat = "");
          break;
        case "deviceSn":
          state ? (this.err_deviceSn = error) : (this.err_deviceSn = "");
          break;
        case "deviceAccessories":
          state
            ? (this.err_deviceAccessories = error)
            : (this.err_deviceAccessories = "");
          break;
        case "name":
          state ? (this.err_name = error) : (this.err_name = "");
          break;
        case "phone":
          state ? (this.err_phone = error) : (this.err_phone = "");
          break;
        case "email":
          state ? (this.err_email = error) : (this.err_email = "");
          break;
        case "issue":
          state ? (this.err_issue = error) : (this.err_issue = "");
          break;
        case "lines":
          state ? (this.err_lines = error) : (this.err_lines = "");
          break;
        case "postCode":
          state ? (this.err_postCode = error) : (this.err_postCode = "");
          break;
        case "city":
          state ? (this.err_city = error) : (this.err_city = "");
          break;
        case "damage":
          state ? (this.err_damageType = error) : (this.err_damageType = "");
          break;
      }
    },
    validate() {
      const regString = /^([a-żA-Ż0-9 ]){2,}$/;
      const regEmail = /^(.){1,}@(.){1,}\.([A-z]){1,}$/;
      const regNumber = /^([0-9]{9})$/;
      const regLines = /^([a-żA-Ż0-9/. ]){2,}([1-9]){0,}([0-9]){1,}$/;
      const regPostCode = /^([0-9]){2}-([0-9]){3}$/;
      let good = true;

      //producent
      if (this.deviceProducer === "") {
        this.displayError("deviceProducer", "Wpisz nazwę producenta");
        good = false;
      } else this.displayError("deviceProducer", "", false);
      //model
      if (this.deviceName === "") {
        this.displayError("deviceName", "Wpisz nazwę modelu");
        good = false;
      } else this.displayError("deviceName", "", false);
      //kategoria
      if (this.deviceCat === "") {
        this.displayError("deviceCat", "Wpisz kategorię sprzętu");
        good = false;
      } else this.displayError("deviceCat", "", false);
      //SN
      if (this.deviceSn === "") {
        this.displayError("deviceSn", "Wpisz numer seryjny");
        good = false;
      } else this.displayError("deviceSn", "", false);

      //imie i nazwisko lub nazwa frimy
      if (!regString.test(this.name)) {
        this.displayError("name", "Wpisz imię i nazwisko");
        good = false;
      } else this.displayError("name", "", false);
      //telefon
      if (this.phone === "") {
        this.displayError("phone", "Wpisz numer telefonu");
        good = false;
      } else {
        if (!regNumber.test(this.phone)) {
          this.displayError("phone", "Niepoprawny numer telefonu");
          good = false;
        } else this.displayError("phone", "", false);
      }
      //email
      if (this.email === "") {
        this.displayError("email", "Wpisz adres email");
        good = false;
      } else {
        if (!regEmail.test(this.email)) {
          this.displayError("email", "Niepoprawny adres email");
          good = false;
        } else this.displayError("email", "", false);
      }

      //ulica i numer
      if (this.lines == "") {
        this.displayError("lines", "Wpisz ulice i numer budynku");
        good = false;
      } else {
        if (!regLines.test(this.lines)) {
          this.displayError("lines", "Niepoprawny adres");
          good = false;
        } else this.displayError("lines", "", false);
      }
      //kod pocztowy
      if (this.postCode == "") {
        this.displayError("postCode", "Wpisz kod pocztowy");
        good = false;
      } else {
        if (!regPostCode.test(this.postCode)) {
          this.displayError("postCode", "Niepoprawny kod pocztowy");
          good = false;
        } else this.displayError("postCode", "", false);
      }
      //miejscowość
      if (!regString.test(this.city)) {
        this.displayError("city", "Wpisz nazwę miejscowości");
        good = false;
      } else this.displayError("city", "", false);

      //stan techniczny
      if (this.damageType === "") {
        this.displayError("damage", "Wybierz stan urządzenia");
        good = false;
      } else this.displayError("damage", "", false);

      //akcesoria
      if (this.deviceAccessories.length === 0) {
        this.displayError("deviceAccessories", "Wybierz akcesoria");
        good = false;
      } else this.displayError("deviceAccessories", "", false);

      //opis problemu
      if (this.issue === "") {
        this.displayError("issue", "Wpisz opis problemu");
        good = false;
      } else this.displayError("issue", "", false);

      if (good) this.clearErrors();
      return good;
    },
    onSubmit() {
      if (!this.validate()) {
        return console.log("error");
      }

      store.dispatch("rma/submitNewTicket", {
        email: this.email,
        name: this.name,
        phone: this.phone,
        deviceSn: this.deviceSn,
        deviceProducer: this.deviceProducer,
        deviceName: this.deviceName,
        deviceCat: this.deviceCat,
        type: parseInt(this.type),
        deviceAccessories: this.deviceAccessories,
        issue: this.issue,
        lines: this.lines,
        postCode: this.postCode,
        city: this.city,
        damageType: this.damageType,
        damageDescription: this.damageDescription,
      });
    },
  },
  mounted() {
    fetch(getUrl(rmaDictionaryDamageTypes))
      .then((res) => res.json())
      .then((rows) => {
        this.damageTypes = rows;
      });

    fetch(getUrl(rmaDictionaryAccesoriesTypes))
      .then((res) => res.json())
      .then((rows) => {
        this.accesoriesTypes = rows;
      });
  },
  components: { textInput, submitButton, selectInput, checkboxGroup },
};
</script>
<template>
  <div class="formWrap">
    <form action="" @submit.prevent="onSubmit">
      <div class="device">
        <h3>Dane urządzenia</h3>
        <textInput
          id="deviceCat"
          label="Kategoria"
          v-model="deviceCat"
          :error="err_deviceCat"
        />
        <textInput
          id="deviceProducer"
          label="Producent"
          v-model="deviceProducer"
          :error="err_deviceProducer"
        />
        <textInput
          id="deviceName"
          label="Model"
          v-model="deviceName"
          :error="err_deviceName"
        />
        <textInput
          id="deviceSn"
          label="Numer seryjny"
          v-model="deviceSn"
          :error="err_deviceSn"
        />
      </div>
      <div class="owner">
        <h3>Dane zgłaszającego</h3>
        <textInput
          id="name"
          label="Imię i nazwisko lub nazwa firmy"
          v-model="name"
          :error="err_name"
        />
        <textInput
          id="phone"
          label="Telefon"
          v-model="phone"
          :error="err_phone"
        />
        <textInput
          id="email"
          label="Email"
          v-model="email"
          :error="err_email"
        />
      </div>
      <div class="address">
        <h3>Adres odsyłki</h3>
        <textInput
          id="name"
          label="Ulica i numer"
          v-model="lines"
          :error="err_lines"
        />
        <textInput
          id="postCode"
          label="Kod pocztowy"
          v-model="postCode"
          :error="err_postCode"
        />
        <textInput
          id="city"
          label="Miejscowość"
          v-model="city"
          :error="err_city"
        />
      </div>
      <div class="damage">
        <h3>Stan techniczny</h3>
        <div class="form-group">
          <selectInput
            id="damageType"
            label="Wybierz stan urządzenia"
            v-model="damageType"
            :options="damageTypes"
            :error="err_damageType"
          ></selectInput>
        </div>
        <div class="form-group">
          <label for="damageDescription">Opis stanu technicznego</label>
          <textarea
            name="damageDescription"
            id="damageDescription"
            v-model="damageDescription"
            cols="30"
            rows="5"
          ></textarea>
        </div>
      </div>
      <div class="accesories">
        <h3>Akcesoria</h3>
        <checkboxGroup
          v-model="deviceAccessories"
          :error="err_deviceAccessories"
          :options="accesoriesTypes"
          name="deviceAccessories"
        />
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
            :class="{ error_input: err_issue }"
          ></textarea>
          <p class="error err_issue" :class="{ active: this.err_issue }">
            {{ err_issue }}
          </p>
        </div>
        <submitButton label="Dodaj" />
      </div>
    </form>
  </div>
</template>
<style scoped>
form {
  display: grid;
  width: 90%;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 0.95fr 1fr;
  padding: 1em 2em 0 2em;
}

.owner,
.device {
  width: 100%;
}

.ticket {
  grid-column: 3;
}

h3 {
  color: var(--vt-c-black-mute);
  margin-bottom: 10px;
  font-weight: 600;
  font-size: 17px;
}

.form-group {
  width: 100%;
}

input[type="radio"] {
  width: auto;
  margin-right: 0.5em;
}

input {
  position: relative;
}

.radioLabel {
  cursor: pointer;
  width: fit-content;
}

p.error.err_issue {
  bottom: -22px;
}

input[type="submit"] {
  background: rgb(21, 129, 230);
  color: #fff;
  border: 0px;
  padding: 0.5em;
  margin-top: 2.3em;
  grid-row: 3;
  width: 25%;
}

textarea {
  width: 90%;
}

input.error_input,
textarea.error_input {
  border: 2px solid #e90202;
}
</style>
