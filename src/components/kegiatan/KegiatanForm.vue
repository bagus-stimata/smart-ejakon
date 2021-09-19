<template>

    <v-form v-model="valid">
        <v-container v-if="editedItem">

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

            <v-card>                
                <v-toolbar
                color="cyan"
                src="https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg"
                dark
                flat
                >
                <v-app-bar-nav-icon></v-app-bar-nav-icon>

                <v-toolbar-title>{{ editedItem.namaPekerjaan}}</v-toolbar-title>

                <v-spacer></v-spacer>

                <v-btn icon>
                    <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>

                <template v-slot:extension>
                    <v-tabs
                    v-model="tab"
                    align-with-title
                    >
                    <v-tabs-slider color="yellow"></v-tabs-slider>

                    <v-tab
                        v-for="item in items"
                        :key="item"
                    >
                        {{ item }}
                    </v-tab>
                    </v-tabs>
                </template>
                </v-toolbar>

                <v-tabs-items v-model="tab">
                <v-tab-item
                    v-for="item in items"
                    :key="item"
                >


                <v-card
                min-width="800px"
                flat>

                    <v-card-text v-if="item==='kegiatan' ">
                        <v-row>   
                            <v-col
                            cols="12"
                            sm="6"
                            md="6"
                            >
                                <!-- <v-select
                                v-model="editedItem.fdivisionBean"
                                :rules="notEmptyRules"
                                :items="itemsFDivision"
                                item-text="description"
                                item-value="id"
                                label="Bidang"
                                hint="Divisi harus dipilih dari pilihan"
                                persistent-hint
                                single-line
                                ></v-select>          -->

                                <v-autocomplete
                                    :rules="notEmptyRules"
                                    auto-select-first
                                    dense
                                    chips
                                    deletable-chips
                                    v-model="editedItem.fdivisionBean"
                                    :items="itemsFDivision  "
                                    item-text="description"
                                    item-value="id"
                                    label="Bidang"
                                    hint="Bidang"
                                    persistent-hint
                                    single-line
                                ></v-autocomplete>

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
                                    :rules="notEmptyRules"
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
                                :rules="notEmptyRules"
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


                        <v-row>
                            <v-col
                            cols="8"
                            sm="6"
                            md="6"
                            >
                                <v-text-field
                                    v-model="editedItem.nomorAdendum"
                                    label="Nomor Adendum"
                                ></v-text-field>
                            </v-col>
                            <v-col v-if="editedItem.nomorAdendum"
                            cols="6"
                            sm="4"
                            md="4"
                            >

                                <v-menu
                                    v-model="menu1"
                                    :close-on-content-click="false"
                                    max-width="290"
                                >
                                    <template v-slot:activator="{ on, attrs } ">
                                    <v-text-field
                                        :value="computedDateFormattedDatefns(editedItem.tglAdendum)"
                                        prepend-inner-icon="mdi-calendar"
                                        :rules="notEmptyRules"
                                        clearable
                                        label="Tanggal Adendum"
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                        @click:clear="editedItem.tglAdendum = null"
                                    ></v-text-field>
                                    </template>
                                    
                                    <v-date-picker
                                    v-model="editedItem.tglAdendum"
                                    @change="menu1 = false"
                                    ></v-date-picker>
                                </v-menu>
                                
                            </v-col>
                        </v-row>
                    
                    </v-card-text>


                    <v-card-text v-if="item ==='pt pelaksana' " >

                        <v-row>   
                            <v-col
                            cols="12"
                            sm="8"
                            md="8"
                            >

                                <v-autocomplete
                                    auto-select-first
                                    dense
                                    chips
                                    deletable-chips
                                    v-model="editedItem.cvptBean"
                                    :items="itemsFCvpt  "
                                    item-text="description"
                                    item-value="id"
                                    label="CV atau PT Pelaksana"
                                    hint="CV atau PT Pelaksana"
                                    persistent-hint
                                    single-line
                                ></v-autocomplete>

                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col
                            cols="8"
                            sm="6"
                            md="6"
                            >
                                <v-text-field
                                    v-model="editedItem.nomorKontrak"
                                    label="Nomor Kontrak"
                                ></v-text-field>
                            </v-col>
                            <v-col v-if="editedItem.nomorKontrak"
                            cols="6"
                            sm="4"
                            md="4"
                            >

                                <v-menu
                                    v-model="menu2"
                                    :close-on-content-click="false"
                                    :nudge-right="40"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="auto"
                                >
                                    <template v-slot:activator="{ on, attrs } ">
                                    <v-text-field
                                        :value="computedDateFormattedDatefns(editedItem.tglKontrak)"
                                        prepend-inner-icon="mdi-calendar"
                                        clearable
                                        label="Tanggal Kontrak"
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                        @click:clear="editedItem.tglKontrak = null"
                                    ></v-text-field>
                                    </template>
                                    
                                    <v-date-picker
                                    v-model="editedItem.tglKontrak"
                                    @change="menu2 = false"
                                    ></v-date-picker>
                                </v-menu>

                                            
                            </v-col>
                        </v-row>

                        <v-row>   
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

                    <v-card-text v-if="item ==='pejabat terkait' " >

                        <v-row>   
                            <v-col
                            cols="12"
                            sm="8"
                            md="8"
                            >
                                <v-autocomplete
                                    v-model="editedItem.kpaBean"
                                    :items="itemsFPegawai"
                                    auto-select-first
                                    dense
                                    chips
                                    deletable-chips
                                    color="blue-grey lighten-2"
                                    item-text="description"
                                    item-value="id"
                                    label="KPA"
                                    hint="KPA"
                                     persistent-hint            
                                    single-line
                                ></v-autocomplete>

                            </v-col>
                        </v-row>
                        <v-row>   
                            <v-col
                            cols="12"
                            sm="8"
                            md="8"
                            >
                                <v-autocomplete
                                    auto-select-first
                                    dense
                                    chips
                                    deletable-chips
                                    v-model="editedItem.pptkBean"
                                    :items="itemsFPegawai  "
                                    item-text="description"
                                    item-value="id"
                                    label="PPTK"
                                    hint="PPTK"
                                    persistent-hint
                                    single-line
                                ></v-autocomplete>
                            </v-col>
                        </v-row>
                        <v-row>   
                            <v-col
                            cols="12"
                            sm="8"
                            md="8"
                            >
                                <v-autocomplete
                                    auto-select-first
                                    dense
                                    chips
                                    deletable-chips
                                    v-model="editedItem.pengawasBean"
                                    :items="itemsFPegawai  "
                                    item-text="description"
                                    item-value="id"
                                    label="Pengawas"
                                    hint="Pengawas"
                                    persistent-hint
                                    single-line
                                ></v-autocomplete>
                                             
                            </v-col>
                        </v-row>

                    </v-card-text>

                    <v-card-text v-if="item ==='team pho & fho' " >
                        <v-row>   
                            <v-col
                            cols="12"
                            sm="8"
                            md="8"
                            >
                                <v-autocomplete
                                    auto-select-first
                                    dense
                                    chips
                                    deletable-chips
                                    v-model="editedItemTeam.ketuaBean"
                                    :items="itemsFPegawai  "
                                    item-text="description"
                                    item-value="id"
                                    label="Ketua"
                                    hint="KETUA"
                                    persistent-hint
                                    single-line
                                ></v-autocomplete>

                            </v-col>
                        </v-row>
                        <v-row>   
                            <v-col
                            cols="12"
                            sm="8"
                            md="8"
                            >
                                <v-autocomplete
                                    auto-select-first
                                    dense
                                    chips
                                    deletable-chips
                                    v-model="editedItemTeam.sekretarisBean"
                                    :items="itemsFPegawai  "
                                    item-text="description"
                                    item-value="id"
                                    label="Sekretaris"
                                    hint="Sekretaris"
                                    persistent-hint
                                    single-line
                                ></v-autocomplete>
                            </v-col>
                        </v-row>
                        <v-row>   
                            <v-col
                            cols="12"
                            sm="8"
                            md="8"
                            >
                                <v-autocomplete
                                    auto-select-first
                                    dense
                                    chips
                                    deletable-chips
                                    v-model="editedItemTeam.anggota1Bean"
                                    :items="itemsFPegawai  "
                                    item-text="description"
                                    item-value="id"
                                    label="Anggota 1"
                                    hint="Anggota 1"
                                    persistent-hint
                                    single-line
                                ></v-autocomplete>
                            </v-col>
                        </v-row>
                        <v-row>   
                            <v-col
                            cols="12"
                            sm="8"
                            md="8"
                            >
                                <v-autocomplete
                                    auto-select-first
                                    dense
                                    chips
                                    deletable-chips
                                    v-model="editedItemTeam.anggota2Bean"
                          :items="itemsFPegawai  "
                                    item-text="description"
                                    item-value="id"
                                    label="Anggota 2"
                                    hint="Anggota 2"
                                    persistent-hint
                                    single-line
                                ></v-autocomplete>
                            </v-col>
                        </v-row>
                        <v-row>   
                            <v-col
                            cols="12"
                            sm="8"
                            md="8"
                            >
                                <v-autocomplete
                                    auto-select-first
                                    dense
                                    chips
                                    deletable-chips
                                    v-model="editedItemTeam.anggota3Bean"
                                    :items="itemsFPegawai  "
                                    item-text="description"
                                    item-value="id"
                                    label="Anggota 3"
                                    hint="Anggota 3 "
                                    persistent-hint
                                    single-line
                                ></v-autocomplete>
                            </v-col>
                        </v-row>


                    </v-card-text>

                    <v-card-text v-if="item ==='lokasi' " >
                       <v-row>
                            <v-col
                            cols="8"
                            sm="5"
                            md="5"
                            >
                                <v-text-field
                                    v-model.number="editedItem.lat"
                                    type="number"
                                    label="Latitude"
                                ></v-text-field>
                            </v-col>
                            <v-col
                            cols="8"
                            sm="5"
                            md="5"
                            >
                                <v-text-field
                                    v-model.number="editedItem.lon"
                                    type="number"
                                    label="Longitude"
                                ></v-text-field>
                            </v-col>
                        </v-row>

                        <v-row justify="center">
                            <my-image-input v-model="avatar">
                                <div slot="activator">
                                <v-avatar size="350px" v-ripple v-if="!avatar" class="grey lighten-3 mb-3">
                                    <span>Klik untuk menambahkan gambar</span>
                                </v-avatar>
                                
                                <v-avatar size="350px" v-ripple v-else class="mb-3">
                                    <v-img :src="avatar.imageURL" :lazy-src="avatar.imageURL_Lazy"  alt="avatar"></v-img>
                                    <!-- <img src="http://36.66.239.116:8080/rest/files/avatar_kegiatan_1.png"   alt="avatar"> -->
                                </v-avatar>
                                </div>
                            </my-image-input>
                        </v-row>   
                        <v-row justify="center">
                            <v-slide-y-transition >
                                <div v-if="avatar && avatarSaved == false">
                                <v-btn class="primary" @click="uploadImage" :loading="avatarSaving">Simpan Photo</v-btn>
                                </div>
                            </v-slide-y-transition>
                        </v-row>

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


                </v-tab-item>
                </v-tabs-items>

            </v-card>
              
        </v-container>
    </v-form>



</template>

<script>
import axios from 'axios'
import { format, parseISO } from 'date-fns'
import ImageInput from '@/components/ImageInput.vue'

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
        }
    },
    
    data() {
        return {
            tab: null,
            items: [
                'kegiatan', 'pt pelaksana', 'pejabat terkait', 'team pho & fho', 'lokasi'
            ],

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

            date: format(parseISO(new Date().toISOString()), 'yyyy-MM-dd'),
            menu1: false,
            menu2: false,

            editedItem:{
                id: 0,
                kode1: 'new',
                description: '',
                namaPekerjaan: '',
                nomorKontrak: '',
                tglAdendum: '2021-01-01',
                tglKontrak: '2021-01-01',
                tglPenyerahan: '2021-01-01',
            },
            editedItemTeam:{
                fkegiatanBean: 0,
                ketuaBean: 0,
                sekretarisBean: 0,
                anggota1Bean: 0,
                anggota2Bean: 0,
                anggota3Bean: 0
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
            itemsFPegawai: [
                { id: 0, kode1: '', description: 'Pegawai A' },
            ],

            avatar: null,
            avatarFirstLoad: true,
            avatarSaving: false,
            avatarSaved: true
        }
    },

    computed:{
        success(){
            return this.isOperationSuccess
        }
    },
    components: {
        myImageInput: ImageInput
    },  
    watch:{
        avatar: {
            handler: function() {
                if (this.avatar.formData !==undefined){
                    this.avatarSaved = false
                }
                // console.log(`Watch >> ${newValue} and ${oldValue} >> ${this.avatar.formData}`)
            },
            deep: true
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
                        console.log(`Create New >> ${response.data.id}`)

                        const teamToSave = this.editedItemTeam   
                        teamToSave.fkegiatanBean = response.data.id
                        axios({
                                method: 'post',
                                url: `${this.$store.getters.getApiBaseUrl}/updateFKegiatanTeamPost/${response.data.id}`,
                                data: teamToSave                               
                            })
                            // .then(response => {
                            //     console.log("Sukses Bos >>> " + response.data)
                            // })
                            .catch(error => {
                                console.log("Error Bos >>>" +error)
                            })

                        this.$router.push('/Kegiatan').catch(()=>{})

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

                        const teamToSave = this.editedItemTeam   
                        teamToSave.fkegiatanBean = id
                        axios({
                                method: 'post',
                                url: `${this.$store.getters.getApiBaseUrl}/updateFKegiatanTeamPost/${id}`,
                                data: teamToSave                               
                            })
                            .then(response => {
                                console.log("Sukses Bos >>> " + response.data)
                            })
                            .catch(error => {
                                console.log("Error Save Edit >>>" +error)
                            })


                        this.$router.push('/Kegiatan').catch(()=>{})
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
            this.$router.push('/Kegiatan').catch(()=>{})
        },
        escapeCancel(){
            this.myConfirmCancelUpdate = true
        },

       
        // lookupFDivision (fdivisionBean) {
        //     const str = this.itemsFDivision.filter(x => x.id===fdivisionBean)
        //     if (str.length>0){
        //         return str[0].description
        //     }else {
        //         return '-'
        //     }
        // },
        computedDateFormattedDatefns (value) {
            return value ? format(parseISO(value), 'yyyy-MM-dd') : ''
        },
        computedDateFormattedDatefns_ (value) {
            return value ? format(parseISO(value), 'yyyy-MM-dd') : ''
        },
   
        uploadImage() {
            this.avatarSaving = true
            setTimeout(() => this.avatarSavedAvatar(), 1000) 
        },
        async avatarSavedAvatar() {
            this.avatarSaving = false
            this.avatarSaved = true        
            const formData = this.avatar.formData  
            await axios
                    .post(`${this.$store.getters.getApiBaseUrl}/upload_image/avatar_kegiatan_${this.editedItem.id}`, formData)
                    .then(response =>{
                        console.log(response.data)
                    }).catch(error => {
                        console.log(error)
                    })
            
        }
    
    },

    mounted() {
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
      axios
        .get(`${this.$store.getters.getApiBaseUrl}/getAllFPegawai`)
        .then(response => {
            this.itemsFPegawai = response.data
            // console.log(response.data)
        })
        .catch(error => {
            console.log(error)
        })

        if(this.edit){
            const id = this.$route.params.id
            axios
                .get(`${this.$store.getters.getApiBaseUrl}/getFKegiatanById/${id}`)
                .then( response => {
                    this.editedItem =  response.data     
                    console.log("Response Team >>> " + response.data)


                axios
                    .get(`${this.$store.getters.getApiBaseUrl}/getAllFKegiatanTeamByParent/${id}`)
                    .then(response => {
                        // console.log("Response Team >>> " + response.data)
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
                        // this.editedItemTeam = response.data

                        this.avatarSaved = true
                        if (id > 0){
                            const theImageURL_VeryLow = `${this.$store.getters.getApiBaseUrl}/files_image_verylow/avatar_kegiatan_${id}.jpg`
                            axios
                                .get(theImageURL_VeryLow)
                                .then( response => {
                                    if (response.status === 200 ){                            
                                        this.avatar = {
                                            imageURL : (this.avatar!==null?this.avatar.imageURL:null),
                                            imageURL_Lazy : theImageURL_VeryLow
                                        }                         


                                        const theImageURL = `${this.$store.getters.getApiBaseUrl}/files_image_medium/avatar_kegiatan_${id}.jpg`
                                        axios
                                            .get(theImageURL)
                                            .then( response => {
                                                if (response.status ===200 ){                            
                                                    this.avatar = {
                                                        imageURL : theImageURL,
                                                        imageURL_Lazy : (this.avatar?this.avatar.imageURL_Lazy:null)
                                                    }    
                                                    
                                                }  else {
                                                    this.avatar = null
                                                } 
                                            })
                                            .catch(error => {
                                                console.log(" >>> " + error)
                                                this.avatar = null
                                            })


                                    }  else {
                                        this.avatar = null
                                    } 
                                })
                                .catch(error => {
                                    console.log(" >>> " + error)
                                    this.avatar = null
                                })


                        }

                    
                                
                    })
                    .catch(error => {
                        console.log(error)
                    })


            })
            .catch(error => console.log(error))


        }
        if (this.create){
            this.editedItem.id = 0
            this.editedItem.tahun = 2021
            this.valid = true
        }
               


    },
    
}
</script>