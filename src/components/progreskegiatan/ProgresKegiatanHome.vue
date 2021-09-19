<template>
  <div class="dashboard">
   
  <div class="home">
    <v-container class="mt-5">

      <v-flex>
        <v-img
          lazy-src="/img/header_login.png"
          max-height="64"
          max-width="400"
          src="/img/header_login.png"
        ></v-img>

      </v-flex>

      <v-divider class="mt-2"></v-divider>
      <v-row class="mt-5">

        <v-col cols="16" sm="16" md="12">
          <v-hover v-slot="{ hover }" open-delay="200">
            <v-card class="top-gradient-cyan" :elevation="hover ? 16 : 2">
              <v-row>

                <v-col cols="12" sm="8">
                  <v-list-item three-line>
                    <v-list-item-content>
                        <div class="mb-4">
                          <div class="mb-4">Proyek Kegiatan</div>
                          <v-row>
                            <v-col cols="12" sm="6">
                              <v-progress-circular
                              rotate="360"
                              size="100"
                              width="15"
                              :value="totalPersen"
                              color="blue"
                              >
                              {{ Math.round(totalPersen) }}%
                              </v-progress-circular>
                            </v-col>
                            <v-col cols="12" sm="6">
                              <v-list-item-subtitle class="black--text mt-8"> {{ editedItem.jmlKegiatan }} kegiatan </v-list-item-subtitle>
                              <v-list-item-subtitle class="blue--text">Kontrak {{ Math.round(editedItem.persenKegiatanVsKontrak) }}% </v-list-item-subtitle>
                              <v-list-item-sub>-</v-list-item-sub>
                              <v-list-item-subtitle class="blue--text">PHO {{ Math.round(editedItem.persenKontrakVsPho)}}%</v-list-item-subtitle>
                              <v-list-item-subtitle class="blue--text">FHO {{ Math.round(editedItem.persenKontrakVsFho)}}%</v-list-item-subtitle>
                              <v-list-item-subtitle class="blue--text">Kem Fisik {{ Math.round(editedItem.persenKontrakVsKemajuanFisik)}}%</v-list-item-subtitle>
                              <v-list-item-subtitle class="blue--text">Penyerahan {{ Math.round(editedItem.persenKontrakVsPenyerahan)}}%</v-list-item-subtitle>
                              <v-list-item-subtitle class="blue--text">Termin {{ Math.round(editedItem.persenKontrakVsCair)}}%</v-list-item-subtitle>
                            </v-col>
                          </v-row>
                        </div>

                      <v-list-item-title class="headline mb-1 darkgrey--text">
                        {{editedItem.jmlKegiatan}} kegiatan
                      </v-list-item-title>
                      <v-list-item-subtitle class="darkgrey--text">{{ editedItem.jmlKontrak }} Kontrak Rp.{{ formattedCurrencyValue(editedItem.nilaiKontrak) }} </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>


                <v-col>
                <!-- <v-list-item> -->
                  <v-list-item-content>
                    <v-list-item-title >Bidang-Bidang</v-list-item-title>
                    <v-list-item-subtitle class="grey--text darken-5" v-for="progDivision in itemsProgDivision" :key="progDivision.id">
                      {{progDivision.namaDivision}} {{ Math.round(progDivision.totalPersen) }}%
                    </v-list-item-subtitle>

                    <!-- <v-list-item-subtitle class="white--text">Bina Marga 10%</v-list-item-subtitle>
                    <v-list-item-subtitle class="white--text">Cipta Karya 13%</v-list-item-subtitle>
                    <v-list-item-subtitle class="white--text">Bina Konstruksi 9%</v-list-item-subtitle>                     -->
                  
                  </v-list-item-content>                
                  <v-list-item-actions>
                    <v-btn outlined color="white" route to='/ProgresKegiatanDetil'>Detail </v-btn>
                  </v-list-item-actions>
                <!-- </v-list-item>                 -->
                </v-col>

              </v-row>

            </v-card>
          </v-hover>
        </v-col>
      </v-row>

    <v-row class="mt-6">
        <v-col cols="16" sm="16" md="12">
          <v-hover v-slot="{hover }" open-delay="200">
            <v-card  class="top-gradient-teal" :elevation="hover ? 16 : 2">
              <v-row>

                <v-col cols="16" sm="8">
                  <v-list-item three-line>
                    <v-list-item-content>
                        <div class="mb-4">
                          <div class="mb-4">Pencairan Termin</div>
                          <v-row>
                            <v-col cols="12" sm="6">
                              <v-progress-circular
                              rotate="360"
                              size="100"
                              width="15"
                              :value="editedItem.persenKontrakVsCair"
                              color="teal"
                              >
                             {{ Math.round(editedItem.persenKontrakVsCair) }}%
                              </v-progress-circular>
                            </v-col>
                          </v-row>
                        </div>
                      <v-list-item-subtitle class="gray--text">{{editedItem.jmlKontrak}} Kontrak Rp.{{ formattedCurrencyValue(editedItem.nilaiKontrak)}}</v-list-item-subtitle>
                      <v-list-item-subtitle class="gray--text ">Pencairan Termin Rp. <span class="font-weight-bold">{{formattedCurrencyValue(editedItem.nilaiCair)}}</span></v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>             
                
                <v-col>
                  <v-list-item-content>
                    <v-list-item-title >Bidang-Bidang</v-list-item-title>
                    <!-- <v-list-item-subtitle class="white--text">Bina Marga 4%</v-list-item-subtitle>
                    <v-list-item-subtitle class="white--text">Cipta Karya 6%</v-list-item-subtitle>
                    <v-list-item-subtitle class="white--text">Bina Konstruksi 9%</v-list-item-subtitle>-->

                    <v-list-item-subtitle class="white--text lighten-2" v-for="progDivision in itemsProgDivision" :key="progDivision.id">
                      {{progDivision.namaDivision}} {{ Math.round(progDivision.persenKontrakVsCair) }}%
                    </v-list-item-subtitle>

                  </v-list-item-content>
                </v-col>

              </v-row>
            </v-card>
          </v-hover>
        </v-col>


    </v-row>





    </v-container>
  </div>


  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'ProgresKegiatanHome',
    data() {
      return {
        // totalPersen: 50.12,
        editedItem: {
          id: 912345668,
          jmlKegiatan: 0,
          nilaiPagu: 0,
          jmlKontrak: 0,
          nilaiKontrak: 0,
          nilaiCair: 0,
          jmlPho: 0,
          jmlFho: 0,
          jmlPenyerahan: 0,
          jmlKemajuanFisik: 0,
          persenKegiatanVsKontrak: 0,
          persenKontrakVsCair: 0,
          persenKontrakVsPho: 0,
          persenKontrakVsFho: 0,
          persenKontrakVsKemajuanFisik: 0,
          persenKontrakVsPenyerahan: 0
        },
        itemsProgDivision:[],
        itemsProgDivisionTermin:[]
      }
    },
    computed: {
      totalPersen(){
        return ((this.editedItem.persenKegiatanVsKontrak+ 
            this.editedItem.persenKontrakVsPho+ 
            this.editedItem.persenKontrakVsFho+ 
            this.editedItem.persenKontrakVsKemajuanFisik+
            this.editedItem.persenKontrakVsPenyerahan+
            this.editedItem.persenKontrakVsCair)/6);
      },

      // totalPersen(){
      //   return this.editedItem.persenKontrakVsPho;
      // }

    },
    methods: {
      formattedCurrencyValue(value){
        if(! value){ return "0"}
            // return "Rp." + parseFloat(value).toFixed(0).toLocaleString()
            return "" + parseFloat(value).toLocaleString()
      },
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

<style scoped>

  .project.complete{
    border-left: 4px solid #3CD1C2;
  }
  .project.ongoing{
    border-left: 4px solid orange
  }
  .project.overdue{
    border-left: 4px solid tomato;
  }


  .chip.complete{
    background: #3CD1C2;
  }
  .chip.ongoing{
    background:  orange
  }
  .chip.overdue{
    background:  tomato;
    color:  tomato;
  }
  .v-chip.overdue{
    background:  tomato;
    color:  tomato;
  }

  .top-gradient-cyan {
    background-image: linear-gradient(to bottom left, cyan 10%, transparent 90%);
  }
  .top-gradient-teal {
    background-image: linear-gradient(to bottom left, green  10%, transparent 90%);
  }

  .bottom-gradient-cyan {
    background-image: linear-gradient(to top right, cyan 10%, transparent 90%);
  }

</style>
