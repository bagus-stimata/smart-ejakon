<template>
  <div class="kegiatandetil_table">

    <v-flex class="mt-4">
      <v-img
        lazy-src="/img/header_login.png"
        max-height="64"
        max-width="400"
        src="/img/header_login.png"
      ></v-img>
    </v-flex>

  <v-col cols="12" md12><h1 class="headline mb-2 grey--text">Progres Termin </h1></v-col>
  <v-divider></v-divider>

  <v-col cols="10" md="6">

      <v-card >

        <v-list >  
            <v-list-item>
            <v-col cols="8" sm="4">
              <v-progress-circular
              rotate="360"
              size="100"
              width="15"
              value="50"
              color="darkgray"
              >
              50%
              </v-progress-circular>
            </v-col>

              <v-list-item-content align="right">
                <v-list-item-title class="indigo--text">Bina Marga</v-list-item-title>
                
                <v-list-item-subtitle class="darkgray--text mt-8">Kontrak Rp.400.000,-</v-list-item-subtitle>
                <v-list-item-subtitle class="darkgray--text">Termin Rp.200.000,-</v-list-item-subtitle>


              </v-list-item-content>
            </v-list-item>
            <v-divider inset></v-divider>
            <v-list-item>

            <v-col cols="8" sm="4">
              <v-progress-circular
              rotate="360"
              size="100"
              width="15"
              value="50"
              color="green"
              >
              50%
              </v-progress-circular>
            </v-col>

              <v-list-item-content align="right">
                <v-list-item-title class="indigo--text">Cipta Karya</v-list-item-title>

                <v-list-item-subtitle class="darkgray--text mt-8">Kontrak Rp.200.000,-</v-list-item-subtitle>
                <v-list-item-subtitle class="darkgray--text">Termin Rp.100.000,-</v-list-item-subtitle>
                
              </v-list-item-content>
            </v-list-item>
            <v-divider inset></v-divider>
            <v-list-item>

            <v-col cols="8" sm="4">
              <v-progress-circular
              rotate="360"
              size="100"
              width="15"
              value="50"
              color="teal"
              >
              50%
              </v-progress-circular>
            </v-col>
              <v-list-item-content align="right">
                <v-list-item-title class="indigo--text">Bina Konstruksi</v-list-item-title>
                <!-- <v-list-item-subtitle>$600 of 950</v-list-item-subtitle> -->

                <v-list-item-subtitle class="darkgray--text mt-8">Kontrak Rp.600.000,-</v-list-item-subtitle>
                <v-list-item-subtitle class="darkgray--text">Termin Rp.300.000,-</v-list-item-subtitle>

              </v-list-item-content>
            </v-list-item>


        </v-list>
        
      </v-card>

  </v-col>
  

  </div>
</template>

<script>

export default {
}
</script>
