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

 
  <v-col cols="12" md12><h1 class="headline mb-2 grey--text">Progres Kegiatan per Bidang </h1>
  </v-col>

  <v-divider class="mt-2"></v-divider>
 
  <v-col cols="10" md="6">

      <v-card >

        <v-list >  
            <div v-for="progDivision in itemsProgDivision" :key="progDivision.id">
              <v-list-item >
                <v-col cols="8" sm="4">
                  <v-progress-circular
                  rotate="360"
                  size="100"
                  width="15"
                  :value="progDivision.totalPersen"
                  color="blue"
                  >
                   {{ Math.round(progDivision.totalPersen) }}%
                  </v-progress-circular>
                </v-col>

                <v-list-item-content align="right">
                  <v-list-item-title class="indigo--text">{{ progDivision.namaDivision }}</v-list-item-title>
                  
                  <v-list-item-subtitle class="black--text mt-8"> {{ progDivision.jmlKegiatan }} kegiatan </v-list-item-subtitle>
                  <v-list-item-subtitle class="darkgrey--text">Kontrak {{ Math.round(progDivision.persenKegiatanVsKontrak) }}% </v-list-item-subtitle>
                  <v-list-item-subtitle class="darkgrey--text">PHO {{ Math.round(progDivision.persenKontrakVsPho)}}%</v-list-item-subtitle>
                  <v-list-item-subtitle class="darkgrey--text">FHO {{ Math.round(progDivision.persenKontrakVsFho)}}%</v-list-item-subtitle>
                  <v-list-item-subtitle class="darkgrey--text">Kem Fisik {{ Math.round(progDivision.persenKontrakVsKemajuanFisik)}}%</v-list-item-subtitle>
                  <v-list-item-subtitle class="darkgrey--text">Penyerahan {{ Math.round(progDivision.persenKontrakVsPenyerahan)}}%</v-list-item-subtitle>
                  <v-list-item-subtitle class="darkgrey--text">Termin {{ Math.round(progDivision.persenKontrakVsCair)}}%</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-divider inset></v-divider>              
            </div>
            
 

        </v-list>
        
      </v-card>

  </v-col>
  

  </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
      return {
        itemsProgDivision:[],
        itemsProgDivisionSorted:[],
      }
    },
    watch:{
      itemsProgDivision: function(){       
      }
    },
    mounted() {
      const id = `${this.$store.state.fcompanyBean}`
      axios
        .get(`${this.$store.getters.getApiBaseUrl}/progKegiatanCompany/${id}`)
        .then( response => {
          // console.log(response.data)
          this.editedItem = response.data
        })
        .then(() => {
          axios
            .get(`${this.$store.getters.getApiBaseUrl}/getAllFDivisionByParent/${id}`)
            .then( response => {
              console.log(response)
              this.itemsProgDivision = []

              response.data.forEach( (value, index) =>{
                console.log(`${index} => ${value}`)
                axios
                  .get(`${this.$store.getters.getApiBaseUrl}/progKegiatanDivision/${value.id}`)
                  .then( responseDetil => {
                    console.log(responseDetil.data)
                    responseDetil.data.namaDivision = value.description          
                    
                        
                    responseDetil.data.totalPersen=0
                    
                    responseDetil.data.totalPersen = ((
                          responseDetil.data.persenKegiatanVsKontrak+ 
                          responseDetil.data.persenKontrakVsPho+ 
                          responseDetil.data.persenKontrakVsFho+ 
                          responseDetil.data.persenKontrakVsKemajuanFisik+
                          responseDetil.data.persenKontrakVsPenyerahan+
                          responseDetil.data.persenKontrakVsCair)/6)

                    this.itemsProgDivision.push(responseDetil.data)

                    this.itemsProgDivision.sort(function (a, b) {
                      return b.totalPersen - a.totalPersen;
                    });

                  })                
              })


            })
            .catch(error => {
              console.log(error)
            })            

        })
        .catch(error => {
          console.log(error)
          
        })


    },
 
}
</script>
