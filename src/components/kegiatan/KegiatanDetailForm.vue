<template>

    <v-form>
        
        <v-container fluid v-if="editedItem">

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


            <v-card
            min-width="800px"
            flat>

                <v-card-text v-show="tabTitle==='kegiatan' ">
                    <v-row>   
                        <v-col
                        cols="12"
                        sm="6"
                        md="6"
                        >
                            <!-- :hint="`${selectFCompany.description}, ${selectFCompany.id}`" -->
                            <v-select
                            v-model="editedItem.fdivisionBean"
                            :rules="notEmptyRules"
                            :items="itemsFDivision"
                            item-text="description"
                            item-value="id"
                            label="Bidang"
                            hint="Divisi harus dipilih dari pilihan"
                            persistent-hint
                            single-line
                            ></v-select>                      
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col
                        cols="8"
                        sm="6"
                        md="6"
                        >
                            <v-text-field
                                v-model="editedItem.description"
                                :rules="notEmptyRules"
                                label="Nama Kegiatan"
                            ></v-text-field>
                        </v-col>
                        <v-col
                        cols="6"
                        sm="4"
                        md="4"
                        >
                            <v-text-field
                                v-model="editedItem.kode1"
                                label="Kode"
                            ></v-text-field>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col
                        cols="12"
                        sm="12"
                        md="12"
                        >
                            <v-text-field
                                v-model="editedItem.namaPekerjaan"
                                label="Nama Pekerjaan"
                            ></v-text-field>
                        </v-col>                  
                    </v-row>


                    <v-row>   
                        <v-col
                        cols="12"
                        sm="2"
                        md="2"
                        >
                        <v-text-field
                            v-model.number="editedItem.tahun"
                            label="Tahun"
                            type="number"
                        ></v-text-field>

                        </v-col>
                        <v-col
                        cols="12"
                        sm="4"
                        md="4"
                        >
                        <v-text-field
                            v-model.number="editedItem.nilaiPagu"
                            label="Nilai Pagu"
                            prefix="Rp."
                            type="number"
                        ></v-text-field>
                        </v-col>                                       
                    </v-row>

                    <v-row>
                    </v-row>

                    <v-row>
                        <v-col
                        cols="12"
                        sm="6"
                        md="8"
                        >
                            <v-text-field
                                v-model="editedItem.gantiNamaPaket"
                                label="Ganti Nama Paket"
                            ></v-text-field>
                        </v-col>
                        
                                        
                    </v-row>

                    <!-- Continue your learning with related content selected by the Team or move between pages by using the navigation links below.
                    Continue your learning with related content selected by the Team or move between pages by using the navigation links below. -->
                
                </v-card-text>



                <v-card-text v-show="tabTitle ==='pelaksana' " >

                    <v-row>   
                        <v-col
                        cols="12"
                        sm="8"
                        md="8"
                        >
                            <!-- :hint="`${selectFCompany.description}, ${selectFCompany.id}`" -->
                            <v-select
                            v-model="editedItem.cvptBean"
                            :items="itemsFCvpt  "
                            item-text="description"
                            item-value="id"
                            label="CV atau PT Pelaksana"
                            hint="CV/PT harus dipilih dari pilihan"
                            persistent-hint
                            single-line
                            ></v-select>                      
                        </v-col>
                    </v-row>

                    <v-row>   
                        <v-col
                        cols="12"
                        sm="4"
                        md="4"
                        >
                            <v-text-field
                                v-model="editedItem.nomorKontrak"
                                label="Nomor Kontrak"
                            ></v-text-field>
                        </v-col>      

                        <v-col
                        cols="12"
                        sm="4"
                        md="4"
                        >
                            <v-text-field
                                v-model.number="editedItem.nilaiKontrak"
                                label="Nilai Kontrak"
                                prefix="Rp."
                                type="number"
                            ></v-text-field>
                        </v-col>                                       
                    </v-row>

                </v-card-text>

                <v-card-text v-show="tabTitle ==='team_pho_fho' " >

                </v-card-text>

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
            </v-card>

        </v-container>
    </v-form>

</template>

<script>
import axios from 'axios'
export default {
    props: {
        tabTitle:  {
            type: String,
            default: ''
        },
        create: {
            type: Boolean,
            default: false
        },
        edit: {
            type: Boolean,
            default: false
        },
        kegiatan: {
            type: Boolean,
            default: false
        },
        pelaksana: {
            type: Boolean,
            default: false
        },
    },
    
    data() {
        return {
            dialog: false,
            myConfirmCancelUpdate: false,
            myConfirmCancelUpdateOptions: {
                title: 'Konfirmasi',
                message: 'Membatalkan Modifikasi?',
                color: "grey darken-1",
                width: 400,
                zIndex: 200,
                noconfirm: false,
            },
            editedItem:{
                id: 0,
                kode1: 'new',
                description: '',
                namaPekerjaan: '',
                nomorKontrak: '',
            },
            isOperationSuccess: false,
            valid: true,
            nameRules: [
                v => !!v || 'Name is required',
                v => v.length <= 10 || 'Name must be less than 10 characters',
            ],
            codeLenghtRules: [
                v => !!v || ' Tidak Boleh Kosong',
                v => v.length <= 20 || 'Maksimal 20 Karakter',
                v => v.length > 1 || 'Harus lebih besar dari 1 karakter'
            ],
            notEmptyRules: [
                v => !!v || 'Tidak boleh kosong'
            ],

            itemsFDivision: [
                { id: 0, kode1: '', description: 'Divisi A' },
            ],
            itemsFCvpt: [
                { id: 0, kode1: '', description: 'CV PT A' },
            ],

        }
    },
    watch: {
        // editedItem: {
        //     handler(newValue){
        //         console.log(newValue)
        //     },
        //     immediate: true
        // }
    },

    computed:{
        success(){
            return this.isOperationSuccess
        }
    },

    methods: {
        save() {

            // console.log(`======== OKE BOS =======`)

            if (this.create){
                
                console.log(`======== Create New to Database ======= ${this.editedItem}`)

                axios({
                    method: 'post',
                    url: `${this.$store.getters.getApiBaseUrl}/createFKegiatan`,
                    data: this.editedItem
                })
                .then(response => {
                    this.isOperationSuccess = true
                    this.dialog = true
                    console.log(`Create New >> ${response.data}`)

                    this.$router.push('/Kegiatan')

                })
                .catch(error => {
                    this.isOperationSuccess = false
                    this.dialog = true
                    console.log(error)
                })

            }else if (this.edit) {
                const id = this.$route.params.id
                axios({
                        method: 'put',
                        // url: `http://192.168.1.30:3000/api/editedItems/${id}`,
                        url: `${this.$store.getters.getApiBaseUrl}/updateFKegiatan/${id}`,
                        data: this.editedItem
                    })
                    .then(response => {
                        this.isOperationSuccess = true
                        this.dialog = true
                        console.log(response.data)

                        this.$router.push('/Kegiatan')
                    })
                    .catch(error => {
                        this.isOperationSuccess = false
                        this.dialog = true
                        console.log(error)
                    })
            }
        },
        closeForm() {
            this.myConfirmCancelUpdate = true
        },
        cancelUpdateConfirm() {
            this.$router.push('/Kegiatan')
        },
        escapeCancel(){
            this.myConfirmCancelUpdate = true
        },

       
        // lookupFDivision (fdivisionBean) {
        //     const str = this.itemsFDivision.filter(x => x.id==fdivisionBean)
        //     if (str.length>0){
        //         return str[0].description
        //     }else {
        //         return '-'
        //     }
        // },
       
    
    },

    created() {
      axios
        .get(`${this.$store.getters.getApiBaseUrl}/getAllFDivision`)
        .then(response => {
            this.itemsFDivision = response.data
            // console.log(response.data)
        })
        .catch(error => {
            console.log(error)
        })

      axios
        .get(`${this.$store.getters.getApiBaseUrl}/getAllFCvpt`)
        .then(response => {
            this.itemsFCvpt = response.data
            // console.log(response.data)
        })
        .catch(error => {
            console.log(error)
        })


        if(this.edit){
            const id = this.$route.params.id
            // console.log(`bos >>> ${id}`)
            axios
                .get(`${this.$store.getters.getApiBaseUrl}/getFKegiatanById/${id}`)
                .then( response => {
                    this.editedItem =  response.data
                    // console.log(response.data)
                    console.log(`Edit ${id} >> ${response.data} >> ${this.editedItem.namaPekerjaan}`)

                })
                .catch(error => console.log(error))
        }
        if (this.create){
            // console.log("===CREATE in FORM===")
            // this.editedItem = 'new'
        }
    },
    
}
</script>