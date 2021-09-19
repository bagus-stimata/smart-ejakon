<template>
  <v-app id="inspire">
    
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="8">
            <v-card class="elevation-12">
              <v-window v-model="step">
                <v-window-item :value="1">
                  <v-row>
                    <v-col cols="12" md="8" class="mb-4">
                      <v-card-text class="mt-12">
                        <h3
                          class="text-center display-1 orange--text text--accent-3"
                        >SIGN IN</h3>
                        <div class="text-center mt-4">

                          <!-- <v-btn class="mx-2" fab color="black" outlined>
                            <v-icon>fab fa-facebook-f</v-icon>
                          </v-btn> -->
                          <v-btn class="mx-2" fab color="black" outlined>
                            <v-icon>mdi-google-plus</v-icon>
                          </v-btn>
                          <v-btn disabled class="mx-2" fab color="black" outlined>
                            <v-icon>mdi-linkedin</v-icon>
                          </v-btn>
                          
                        </div>
                        <h4 class="text-center mt-4">Pastikan email anda untuk registrasi</h4>
                        <v-form>
                          <v-text-field
                            v-model="email"
                            label="Email/Username"
                            name="Email"
                            prepend-icon="mdi-email"
                            type="text"
                            color="orange accent-3"
                          />

                          <v-text-field
                            v-model="password"
                            id="password"
                            label="Password"
                            name="password"
                            prepend-icon="mdi-lock"
                            type="password"
                            color="orange accent-3"
                          />
                          <span class="red--text ml-4" v-if="showErrorPassword">User name atau password salah</span>

                        </v-form>
                        <!-- <h3 class="text-center mt-4">Forgot your password ?</h3> -->
                      </v-card-text>
                      <div class="text-center mt-3">
                        <v-btn rounded color="orange accent-3" dark @click="login">MASUK</v-btn>
                      </div>

                    </v-col>

                    <v-col cols="12" md="4" class="accent-3 orange" >
                      <v-card-text class="white--text mt-12">
                        <h4 class="text-center display-1">Informasi</h4>
                        <h5
                          class="text-center"
                        >Saat ini pemeliharaan user masih ditangani oleh admin sistem</h5>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn rounded outlined dark @click="step++">DAFTAR</v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>
                <v-window-item :value="2">
                  <v-row class="fill-height">
                    <v-col cols="12" md="4" class="orange accent-3">
                      <v-card-text class="white--text mt-12">
                        <h1 class="text-center display-1">Welcome Back!</h1>
                        <h5
                          class="text-center"
                        >To Keep connected with us please login with your personnel info</h5>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn rounded outlined dark >MASUK</v-btn>
                      </div>
                    </v-col>

                    <v-col cols="12" md="8" class="mb-4">
                      <v-card-text class="mt-12">
                        <h1 class="text-center display-2 orange--text text--accent-3">Create Account</h1>
                        <div class="text-center mt-4">
                          
                          <!-- <v-btn class="mx-2" fab color="black" outlined>
                            <v-icon>mdi-face</v-icon>
                          </v-btn> -->
                          <v-btn class="mx-2" fab color="black" outlined>
                            <v-icon>mdi-google-plus</v-icon>
                          </v-btn>
                          <v-btn class="mx-2" fab color="black" outlined>
                            <v-icon>mdi-linkedin</v-icon>
                          </v-btn>

                        </div>
                        <h4 class="text-center mt-4">Ensure your email for registration</h4>
                        <v-form>
                          <v-text-field
                            label="Name"
                            name="Name"
                            prepend-icon="mdi-account"
                            type="text"
                            color="orange accent-3"
                          />
                          <v-text-field
                            label="Email"
                            name="Email"
                            type="text"
                            color="orange accent-3"
                            prepend-icon="mdi-email"
                          />

                          <v-text-field
                            id="password"
                            label="Password"
                            name="password"
                            type="password"
                            color="orange accent-3"
                            prepend-icon="mdi-lock"
                          />

                        </v-form>

                      </v-card-text>
                      <div class="text-center mt-n5">
                        <v-btn rounded color="orange accent-3" dark>DAFTAR</v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>
              </v-window>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

  </v-app>
</template>

<script>
export default {
  data: () => ({
    showErrorPassword: false,
    email: '',
    password: '',
    step: 1
  }),
  props: {
    source: String
  },
  methods: {
    login() {
      if (this.email === 'bikon' && this.password === 'default123'){ 
        localStorage.setItem("authenticated", true)
        this.$store.commit("setAuthenticatedTrue")
        this.$router.push( "/")

        this.showErrorPassword = false
      }else {
        this.showErrorPassword = true
      }
      
    }
  }
};
</script>


<style scoped>
 .navbar.side_drawer{
    color:  #3CD1C2;
  }

  .top-gradient {
    background-image: linear-gradient(to bottom left, #FBA80B 10%, transparent 90%);
  }
  .bottom-gradient {
    background-image: linear-gradient(to top right, #FBA80B 10%, transparent 90%);
  }

  .repeating-gradient {
    background-image: repeating-linear-gradient(-45deg,
                        rgba(255,0,0,.25),
                        rgba(255,0,0,.25) 5px,
                        rgba(0,0,255,.25) 5px,
                        rgba(0,0,255,.25) 10px
                      );
  }
</style>