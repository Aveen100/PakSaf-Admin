<template>
  <v-container>
    <v-form
      style="background: white; padding: 20px; border-radius: 10px"
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <v-row>
        <v-col cols="4">
          <v-text-field
            v-model="Name"
            :rules="[
              (v) => !!v || 'Name is required',
              (v) =>
                (v && v.length <= 30) || 'Name must be less than 30 characters',
            ]"
            label="Name"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="4">
          <v-text-field
            v-model="Email"
            :rules="[
              (v) => !!v || 'E-mail is required',
              (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ]"
            label="E-mail"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="4">
          <v-text-field
            v-model="Phone"
            :rules="[
              (v) => !!v || 'Phone number is required',
              (v) => /^\d{11}$/.test(v) || 'Phone number must be 11 digits',
            ]"
            label="Phone Number"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="4">
          <v-text-field
            v-model="Address"
            :rules="[(v) => !!v || 'Address is required']"
            label="Address"
            required
          ></v-text-field>
        </v-col>
        <v-snackbar v-model="ShowSnackbar">
          {{ SnackbarText }}

          <template v-slot:action="{ attrs }">
            <v-btn
              color="green"
              flat
              v-bind="attrs"
              @click="ShowSnackbar = false"
            >
              Close
            </v-btn>
          </template>
        </v-snackbar>
      </v-row>

      <v-btn class="mr-1" :disabled="!valid" color="success" @click="submit"
        >Submit</v-btn
      >
      <v-btn
        class="ml-1"
        :disabled="!valid"
        color="success"
        @click="CloseRiderCrud"
        >Cancel</v-btn
      >
    </v-form>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    valid: false,
    Name: "",
    Email: "",
    Phone: "",
    Address: "",
  }),
  methods: {
    async submit() {
      if (this.$refs.form.validate()) {
        // handle form submission
        let obj = {
          Name: this.Name,
          Email: this.Email,
          Phone: this.Phone,
          Address: this.Address,
        };
        try {
          const response = await axios.post(
            "http://localhost:3000/api/riders/createRider",
            obj
          );

          if (response.data.code == 200) {
            this.$refs.form.reset();
            this.$emit("CloseCrud", true);
          }
        } catch (e) {
          console.error(e);
        }
      }
    },
    CloseRiderCrud() {
      this.$refs.form.reset();
      this.$emit("CloseCrud", false);
    },
  },
};
</script>

<style scoped></style>
