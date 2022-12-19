<script>
import store from "../../../store";

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
      deviceAccessories: "",
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
      });
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
          <label for="deviceCat">Kategoria</label>
          <input
            type="text"
            id="deviceCat"
            v-model="deviceCat"
            :class="{ error_input: err_deviceCat }"
          />
          <p class="error" v-if="err_deviceCat">
            {{ err_deviceCat }}
          </p>
        </div>
        <div class="form-group">
          <label for="deviceProducer">Producent</label>
          <input
            type="text"
            id="deviceProducer"
            v-model="deviceProducer"
            :class="{ error_input: err_deviceProducer }"
          />
          <p class="error" v-if="err_deviceProducer">
            {{ err_deviceProducer }}
          </p>
        </div>
        <div class="form-group">
          <label for="deviceName">Model</label>
          <input
            type="text"
            id="deviceName"
            v-model="deviceName"
            :class="{ error_input: err_deviceName }"
          />
          <p class="error" v-if="err_deviceName">{{ err_deviceName }}</p>
        </div>
        <div class="form-group">
          <label for="deviceSn">Numer seryjny</label>
          <input
            type="text"
            id="deviceSn"
            v-model="deviceSn"
            :class="{ error_input: err_deviceSn }"
          />
          <p class="error" v-if="err_deviceSn">{{ err_deviceSn }}</p>
        </div>
        <div class="form-group">
          <label for="deviceAccessories">Dołączone akcesoria</label>
          <input
            type="text"
            id="deviceAccessories"
            v-model="deviceAccessories"
          />
          <p class="error" v-if="err_deviceAccessories">
            {{ err_deviceAccessories }}
          </p>
        </div>
      </div>
      <div class="owner">
        <h3>Dane zgłaszającego</h3>
        <div class="form-group">
          <label for="name">Imię i nazwisko lub nazwa firmy</label>
          <input
            type="text"
            id="name"
            v-model="name"
            :class="{ error_input: err_name }"
          />
          <p class="error" v-if="err_name">{{ err_name }}</p>
        </div>
        <div class="form-group">
          <label for="phone">Telefon</label>
          <input
            type="text"
            id="phone"
            v-model="phone"
            :class="{ error_input: err_phone }"
          />
          <p class="error" v-if="err_phone">{{ err_phone }}</p>
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="text"
            id="email"
            v-model="email"
            :class="{ error_input: err_email }"
          />
          <p class="error" v-if="err_email">{{ err_email }}</p>
        </div>
      </div>
      <div class="address">
        <h3>Adres odsyłki</h3>
        <div class="form-group">
          <label for="name">Ulica i numer</label>
          <input
            type="text"
            id="lines"
            v-model="lines"
            :class="{ error_input: err_lines }"
          />
          <p class="error" v-if="err_lines">{{ err_lines }}</p>
        </div>
        <div class="form-group">
          <label for="phone">Kod pocztowy</label>
          <input
            type="text"
            id="postCode"
            v-model="postCode"
            :class="{ error_input: err_postCode }"
          />
          <p class="error" v-if="err_postCode">{{ err_postCode }}</p>
        </div>
        <div class="form-group">
          <label for="email">Miejscowość</label>
          <input
            type="text"
            id="city"
            v-model="city"
            :class="{ error_input: err_city }"
          />
          <p class="error" v-if="err_city">{{ err_city }}</p>
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
            :class="{ error_input: err_issue }"
          ></textarea>
          <p class="error" v-if="err_issue">{{ err_issue }}</p>
        </div>
        <input type="submit" value="Dodaj" />
      </div>
    </form>
  </div>
</template>
<style scoped>
form {
  display: grid;
  width: 80%;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  padding: 1em 2em 0 2em;
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
  padding-top: 1.2em;
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

input[type="submit"] {
  background: rgb(21, 129, 230);
  color: #fff;
  border: 0px;
  padding: 0.5em;
  margin-top: 2.3em;
  grid-row: 3;
  width: 25%;
}

p.error {
  position: absolute;
  bottom: -20px;
  left: 0;
  font-size: 12px;
  color: red;
  margin: 0;
  padding: 0;
}

input.error_input,
textarea.error_input {
  border: 2px solid #e90202;
}
</style>
