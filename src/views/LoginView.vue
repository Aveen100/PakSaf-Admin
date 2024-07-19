<template>
  <div class="parent">
    <div class="main" :style="mainStyle">
      <h1 class="mb-5">Login to WasteHub</h1>
      <v-row justify="center" align="center" style="height:70px">
        <v-col cols="12" sm="6" md="6">
          <v-text-field
            placeholder="Enter User Name"
            v-model="UserName"
            label="User Name"
            width="100"
            solo
            rounded
          ></v-text-field>
        </v-col>
      </v-row>

      <br />
      <v-row justify="center" align="center" style="height:70px">
        <v-col cols="12" sm="6" md="6">
          <v-text-field
            placeholder="Enter Password"
            v-model="Password"
            label="Password"
            solo
            type="password"
            rounded
          ></v-text-field>
        </v-col>
      </v-row>

      <br />
      <v-btn id="done" class="button" to="/RequestGarbage"> Login </v-btn>
      <br />
      <img src="../assets/google.svg" alt="Login using Google" />
      <img src="../assets/facebook.svg" alt="Login using Facebook" />
      <br />
      Don't have an account? <router-link to="/signup">Sign up</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginPage",
  //Custom style for main and input for make the page responsive:
  props: {
    mainStyle: String,
    inputStyle: String,
  },
  data() {
    return {
      UserName: "",
      Password: "",
    };
  },
  methods: {
    // Login(){
    // }
  },
};
</script>

<style>
/* Import Poppins font: */
@import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");

.main {
  background: rgba(230, 213, 213, 0.4);
  position: absolute;
  top: 20%;
  left: 30%;
  width: 40%;
  text-align: center;
  padding: 5px;
  border-radius: 3rem;
  box-shadow: 0px 0px 8px -5px #000000;
  padding-top: 3%;
  padding-bottom: 5%;
  font-family: "Poppins", sans-serif;
}

h1 {
  cursor: default;
  user-select: none;
}

input {
  border-radius: 3rem;
  border: none;
  padding: 10px;
  text-align: center;
  outline: none;
  margin: 10px;
  width: 30%;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
  font-weight: 400;
}

input:hover {
  box-shadow: 0px 0px 8px -5px #000000;
}

input:active {
  box-shadow: 0px 0px 8px -5px #000000;
}

#done {
  background: lightgreen;
}

.button {
  cursor: pointer;
  user-select: none;
}

img {
  height: 2.2rem;
  margin: 10px;
  user-select: none;
}

img:hover {
  box-shadow: 0px 0px 8px -5px #000000;
  cursor: pointer;
  border-radius: 200rem;
}
.parent {
  background: url("../assets/Login.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  height: 100%;
}
</style>
