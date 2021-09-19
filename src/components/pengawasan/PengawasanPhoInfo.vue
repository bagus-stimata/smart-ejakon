<template>
  <div class="ma-4">
  
      <v-row>
          <v-col>
              <v-card flat>
                  <v-list two-line>
                      <v-subheader>PT/CV Pelaksana</v-subheader>
                      <v-divider :inset="!falseInset"> </v-divider>
                      <v-list-item>
                          <!-- <v-list-item-avatar></v-list-item-avatar> -->
                          <v-list-item-content>
                              <v-list-item-title>{{ itemFCvpt.description }} </v-list-item-title>
                              <v-list-item-subtitle>{{ itemFCvpt.address}}, {{ itemFCvpt.city}}</v-list-item-subtitle>
                              <v-list-item-subtitle>{{ itemFCvpt.phone}}, {{ itemFCvpt.email}}</v-list-item-subtitle>
                          </v-list-item-content>
                      </v-list-item>
                  </v-list>

                  <v-list two-line>
                      <v-subheader>
                          Angota Team PHO
                      </v-subheader>
                      <v-divider :inset="!falseInset"></v-divider>
                      <v-list-item>
                         <v-list-item-avatar>
                            <v-img
                            :src="lookupFPegawaiImageURL(editedItemTeam.ketuaBean)"
                            :lazy-src="lookupFPegawaiImageURL_Lazy(editedItemTeam.ketuaBean)"
                            />
                         </v-list-item-avatar>
                         <v-list-item-content>
                             <v-list-item-title>Ketua</v-list-item-title>
                             <v-list-item-subtitle>{{ lookupFPegawai(editedItemTeam.ketuaBean) }}</v-list-item-subtitle>
                         </v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                         <v-list-item-avatar>
                            <v-img
                            :src="lookupFPegawaiImageURL(editedItemTeam.sekretarisBean)"
                            :lazy-src="lookupFPegawaiImageURL_Lazy(editedItemTeam.sekretarisBean)"
                            />
                         </v-list-item-avatar>
                         <v-list-item-content>
                             <v-list-item-title>Sekretaris</v-list-item-title>
                             <v-list-item-subtitle>{{ lookupFPegawai(editedItemTeam.sekretarisBean) }}</v-list-item-subtitle>
                         </v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                         <v-list-item-avatar>
                            <v-img
                            :src="lookupFPegawaiImageURL(editedItemTeam.anggota1Bean)"
                            :lazy-src="lookupFPegawaiImageURL_Lazy(editedItemTeam.anggota1Bean)"
                            />
                         </v-list-item-avatar>
                         <v-list-item-content>
                             <v-list-item-title>Aggota 1</v-list-item-title>
                             <v-list-item-subtitle>{{ lookupFPegawai(editedItemTeam.anggota1Bean) }}</v-list-item-subtitle>
                         </v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                         <v-list-item-avatar>
                            <v-img
                            :src="lookupFPegawaiImageURL(editedItemTeam.anggota2Bean)"
                            :lazy-src="lookupFPegawaiImageURL_Lazy(editedItemTeam.anggota2Bean)"
                            />                             
                         </v-list-item-avatar>
                         <v-list-item-content>
                             <v-list-item-title>Anggota 2</v-list-item-title>
                             <v-list-item-subtitle>{{ lookupFPegawai(editedItemTeam.anggota2Bean) }}</v-list-item-subtitle>
                         </v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                         <v-list-item-avatar>
                            <v-img
                            :src="lookupFPegawaiImageURL(editedItemTeam.anggota3Bean)"
                            :lazy-src="lookupFPegawaiImageURL_Lazy(editedItemTeam.anggota3Bean)"
                            />
                         </v-list-item-avatar>
                         <v-list-item-content>
                             <v-list-item-title>Anggota 3</v-list-item-title>
                             <v-list-item-subtitle>{{ lookupFPegawai(editedItemTeam.anggota3Bean) }}</v-list-item-subtitle>
                         </v-list-item-content>
                      </v-list-item>

                  </v-list>
              </v-card>
          </v-col>
          
          <v-divider vertical ></v-divider>
          
          <v-col>
              <v-card flat>

                  <v-list two-line>
                      <v-subheader>
                          Pejabat Terkait
                      </v-subheader>
                      <v-divider :inset="!falseInset"></v-divider>
                      <v-list-item>
                         <v-list-item-avatar>
                            <v-img
                            :src="lookupFPegawaiImageURL(parentItem.kpaBean)"
                            :lazy-src="lookupFPegawaiImageURL_Lazy(parentItem.kpaBean)"
                            />
                         </v-list-item-avatar>
                         <v-list-item-content>
                             <v-list-item-title>KPA</v-list-item-title>
                             <v-list-item-subtitle>{{ lookupFPegawai(parentItem.kpaBean) }}</v-list-item-subtitle>
                         </v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                         <v-list-item-avatar>
                            <v-img
                            :src="lookupFPegawaiImageURL(parentItem.pptkBean)"
                            :lazy-src="lookupFPegawaiImageURL_Lazy(parentItem.pptkBean)"
                            />
                         </v-list-item-avatar>
                         <v-list-item-content>
                             <v-list-item-title>PPTK</v-list-item-title>
                             <v-list-item-subtitle>{{ lookupFPegawai(parentItem.pptkBean) }}</v-list-item-subtitle>
                         </v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                         <v-list-item-avatar>
                            <v-img
                            :src="lookupFPegawaiImageURL(parentItem.pengawasBean)"
                            :lazy-src="lookupFPegawaiImageURL_Lazy(parentItem.pengawasBean)"
                            />
                         </v-list-item-avatar>
                         <v-list-item-content>
                             <v-list-item-title>Pengawas</v-list-item-title>
                             <v-list-item-subtitle>{{ lookupFPegawai(parentItem.pengawasBean) }}</v-list-item-subtitle>
                         </v-list-item-content>
                      </v-list-item>

                  </v-list>
              </v-card>
          </v-col>
      </v-row>
  
  </div>
</template>

<script>
import axios from 'axios'
export default {   
    props: {
        parentItem: undefined
    },
    data(){
        return {
            falseInset: false,
            editedItemTeam:{
                fkegiatanBean: 0,
                ketuaBean: 0,
                sekretarisBean: 0,
                anggota1Bean: 0,
                anggota2Bean: 0,
                anggota3Bean: 0
            },
            itemsFPegawai: [
            ],
            itemFCvpt: {              
            },

        }
    },
    computed: {
    },
    methods: {
       lookupFPegawai (fpegawaiBean) {
            const str = this.itemsFPegawai.filter(x => x.id==fpegawaiBean)
            if (str.length>0){
                return str[0].description
            }else {
                return '-'
            }
        }, 
       lookupFPegawaiImageURL (fpegawaiBean) {
             return `${this.$store.getters.getApiBaseUrl}/files_image_low/avatar_pegawai_${fpegawaiBean}.jpg`
        }, 
       lookupFPegawaiImageURL_Lazy (fpegawaiBean) {
             return `${this.$store.getters.getApiBaseUrl}/files_image_verylow/avatar_pegawai_${fpegawaiBean}.jpg`
        }, 

    },
    mounted() {
        // console.log(this.parentItem.id)
        if( this.parentItem !== null){
            axios
                .get(`${this.$store.getters.getApiBaseUrl}/getAllFPegawai`)
                .then(response => {
                    this.itemsFPegawai = response.data
                })
                .catch(error => {
                    console.log(error)
                })


            axios
                .get(`${this.$store.getters.getApiBaseUrl}/getFCvptById/${this.parentItem.cvptBean}`)
                .then(response => {
                    this.itemFCvpt = response.data
                    // console.log(response.data)
                })
                .catch(error => {
                    console.log(error)
                })

            const id = this.parentItem.id
            axios
            .get(`${this.$store.getters.getApiBaseUrl}/getAllFKegiatanTeamByParent/${id}`)
            .then( response => {

                // console.log(response.data)

                response.data.forEach(element => {
                    // console.log(element)
                    if (element.type===1){
                        this.editedItemTeam.ketuaBean = element.fpegawaiBean
                    }else if(element.type===2){
                        this.editedItemTeam.sekretarisBean = element.fpegawaiBean
                    }else if(element.type===3){
                        this.editedItemTeam.anggota1Bean = element.fpegawaiBean
                    }else if (element.type===4){
                        this.editedItemTeam.anggota2Bean = element.fpegawaiBean
                    }else if (element.type===5){
                        this.editedItemTeam.anggota3Bean = element.fpegawaiBean
                    }
                })

                // console.log(this.editedItemTeam)

            })
            .catch(error => console.log(error))


            
        }

    }



}
</script>