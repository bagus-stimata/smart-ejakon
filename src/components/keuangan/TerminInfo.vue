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
                          PENCAIRAN TERMIN Ke-1
                      </v-subheader>
                      <v-divider :inset="!falseInset"></v-divider>
                      <v-list-item>
                         <v-list-item-content>
                             <v-col
                             cols="7"
                             md="7" sm="12">
                                <v-text-field 
                                label="Nilai Termin-1" prefix="Rp." type="number" v-model="parentItem.termin1Cair">
                                    </v-text-field>                             
                             </v-col>
                             <v-col
                             v-if="parentItem.termin1Cair>0"
                             cols="5"
                             md="5" sm="10">                            
                            
                                <v-menu
                                    v-model="menu1"
                                    :close-on-content-click="false"
                                    max-width="290"
                                >
                                    <template v-slot:activator="{ on, attrs } ">
                                    <v-text-field
                                        :value="computedDateFormattedDatefns(parentItem.tglTermin1Cair)"
                                        prepend-inner-icon="mdi-calendar"
                                        :rules="notEmptyRules"
                                        clearable
                                        label="Tanggal Termin 1"
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                        @click:clear="parentItem.tglTermin1Cair = null"
                                    ></v-text-field>
                                    </template>
                                    
                                    <v-date-picker
                                    v-model="parentItem.tglTermin1Cair"
                                    @change="menu1 = false"
                                    ></v-date-picker>
                                </v-menu>

                             </v-col>
                         </v-list-item-content>
                      </v-list-item>

                  </v-list>

                  <v-list two-line>
                      <v-subheader>
                          PENCAIRAN TERMIN Ke-2
                      </v-subheader>
                      <v-divider :inset="!falseInset"></v-divider>
                      <v-list-item>
                         <v-list-item-content>
                             <v-col
                             cols="7"
                             md="7" sm="12">
                                <v-text-field label="Nilai Termin-2" prefix="Rp." type="number" v-model="parentItem.termin2"></v-text-field>                             
                             </v-col>
                             <v-col
                             v-if="parentItem.termin2Cair>0"
                             cols="5"
                             md="5" sm="10">                            

                               <v-menu
                                    v-model="menu2"
                                    :close-on-content-click="false"
                                    max-width="290"
                                >
                                    <template v-slot:activator="{ on, attrs } ">
                                    <v-text-field
                                        :value="computedDateFormattedDatefns(parentItem.tglTermin2Cair)"
                                        prepend-inner-icon="mdi-calendar"
                                        :rules="notEmptyRules"
                                        clearable
                                        label="Tanggal Termin 2"
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                        @click:clear="parentItem.tglTermin2Cair = null"
                                    ></v-text-field>
                                    </template>
                                    
                                    <v-date-picker
                                    v-model="parentItem.tglTermin2Cair"
                                    @change="menu2 = false"
                                    ></v-date-picker>
                                </v-menu>


                             </v-col>
                         </v-list-item-content>
                      </v-list-item>

                  </v-list>

                  <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                        color="blue darken-1"
                        outlined
                        text
                        @click="closeForm"
                        >
                            Batal
                        </v-btn>
                        <v-btn
                        color="blue darken-1"
                        outlined
                        text
                        @click="save"
                        :disabled ="!valid"
                        >              
                            Simpan
                        </v-btn>
                  </v-card-actions>


                <v-dialog 
                v-model="myConfirmCancelUpdate"
                :max-width="myConfirmCancelUpdateOptions.width"
                :style="{ zIndex: myConfirmCancelUpdateOptions.zIndex }"
                @keydown.esc="escapeCancel"
                >
                    <v-card>

                        <v-toolbar
                        dark
                        :color="myConfirmCancelUpdateOptions.color"                    
                        flat
                        >
                            <v-toolbar-title>{{ myConfirmCancelUpdateOptions.title }}</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-btn
                                icon
                                dark
                                @click="myConfirmCancelUpdate = false"
                            >
                                <v-icon>mdi-close</v-icon>
                            </v-btn>                        
                        </v-toolbar>

                        <v-card-title class="text-h5"> {{ myConfirmCancelUpdateOptions.message }}</v-card-title>                    
                        <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" outlined text @click="cancelUpdateConfirm">Batal</v-btn>
                        </v-card-actions>

                    </v-card>
                </v-dialog>

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
                            :src=" lookupFPegawaiImageURL(parentItem.kpaBean) "
                            :lazy-src=" lookupFPegawaiImageURL_Lazy(parentItem.kpaBean) "
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
      </v-row>
  
  </div>
</template>

<script>
import axios from 'axios'
import { format, parseISO } from 'date-fns'
export default {   
    props: {
        parentItem: undefined
    },
    data(){
        return {
            valid: true,
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

            myConfirmCancelUpdate: false,
            myConfirmCancelUpdateOptions: {
                title: 'Konfirmasi',
                message: 'Membatalkan Modifikasi?',
                color: "grey darken-1",
                width: 400,
                zIndex: 200,
                noconfirm: false,
            },

            date: format(parseISO(new Date().toISOString()), 'yyyy-MM-dd'),
            menu1: false,
            menu2: false,
            codeLenghtRules: [
                v => !!v || ' Tidak Boleh Kosong',
                v => v.length <= 20 || 'Maksimal 20 Karakter',
                v => v.length > 1 || 'Harus lebih besar dari 1 karakter'
            ],
            notEmptyRules: [
                v => !!v || 'Tidak boleh kosong'
            ],            

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
        computedDateFormattedDatefns (value) {
            return value ? format(parseISO(value), 'yyyy-MM-dd') : ''
        },
        closeForm() {
            this.myConfirmCancelUpdate = true
        },
        cancelUpdateConfirm() {
            this.$router.push('/KeuanganTermin').catch(()=>{})
        },

        save() {

            // console.log(`======== OKE BOS =======`)

            const id = this.$route.params.id
            axios({
                    method: 'put',
                    // url: `http://192.168.1.30:3000/api/editedItems/${id}`,
                    url: `${this.$store.getters.getApiBaseUrl}/updateFKegiatan/${id}`,
                    data: this.parentItem
                })
                .then(response => {
                    this.isOperationSuccess = true
                    this.dialog = true
                    console.log(response.data)

                    // this.$router.push('/Kegiatan').catch(()=>{})

                })
                .catch(error => {
                    this.isOperationSuccess = false
                    this.dialog = true
                    console.log(error)
                })

        },


    },
    watch: {
        parentItem(val){
            if( val !== null){
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
    },
    mounted() {

    }



}
</script>