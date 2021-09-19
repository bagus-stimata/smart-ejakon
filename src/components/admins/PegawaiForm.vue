<template>



    <v-form v-model="valid">

        <v-dialog 
          v-model="myConfirmCancelUpdate"
          :max-width="myConfirmCancelUpdateOptions.width"
          :style="{ zIndex: myConfirmCancelUpdateOptions.zIndex }"
          @keydown.esc="escapeCancel"
         >
          <v-card>
            <v-toolbar dark :color="myConfirmCancelUpdateOptions.color" dense flat>
              <v-toolbar-title class="text-body-2 font-weight-bold grey--text">
                {{ myConfirmCancelUpdateOptions.title }}
              </v-toolbar-title>
            </v-toolbar>
            
            <v-card-title class="text-h5"> {{ myConfirmCancelUpdateOptions.message }}</v-card-title>
            
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" outlined text @click="cancelUpdateConfirm">Batal</v-btn>
            </v-card-actions>


          </v-card>
        </v-dialog>

        <v-container v-if="defaultItem">
            <!-- <h1 v-if="create">Registration Form </h1>
            <h1 v-if="edit">Edit Form </h1> -->

            <v-card
             >

                <v-img
                height="200px"
                src="https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg"
                >
                    <v-app-bar
                        flat
                        color="rgba(0, 0, 0, 0)"
                    >
                        <v-app-bar-nav-icon color="white"></v-app-bar-nav-icon>

                        <v-toolbar-title class="text-h6 white--text pl-0">
                            <span v-if="edit">EDIT </span>
                            <span class="font-weight-light ml-1 mr-1">ITEM</span>
                            <span v-if="create"> BARU</span>
                        </v-toolbar-title>

                        <v-spacer></v-spacer>

                        <v-btn
                        color="white"
                        icon
                        >
                        <v-icon>mdi-dots-vertical</v-icon>
                        </v-btn>
                    </v-app-bar>

                    <v-card-title class="white--text mt-6">
                        <!-- <v-avatar size="100">
                        <img
                            alt="user"
                            src="avatar-1.png"
                        >
                        </v-avatar> -->
                        <!-- <p class="ml-3">
                            {{editedItem.description}}
                        </p> -->

                        <!-- <v-row justify="left"> -->
                            <my-image-input v-model="avatar">
                                <div slot="activator">
                                <v-avatar size="100px" v-ripple v-if="!avatar" class="grey lighten-3 mb-3">
                                    <!-- <span>Klik untuk menambahkan gambar</span> -->
                                    <img src="avatar-1.png">
                                </v-avatar>
                                
                                <v-avatar size="100px" v-ripple v-else class="mb-3">
                                    <v-img :src="avatar.imageURL" :lazy-src="avatar.imageURL_Lazy"  alt="avatar"></v-img>
                                </v-avatar>
                                </div>
                            </my-image-input>
                        <!-- </v-row>   
                        <v-row justify="left"> -->
                            <v-slide-y-transition >
                                <div v-if="avatar && avatarSaved == false">
                                <v-btn class="primary" @click="uploadImage" :loading="avatarSaving">Simpan</v-btn>
                                </div>
                            </v-slide-y-transition>

                            <!-- {{editedItem.description}} -->
                        <!-- </v-row> -->

                    </v-card-title>

                </v-img>


                <!-- <v-card-title class="text-uppercase grey--text">
                    <span v-if="edit">EDIT </span>
                    <span class="font-weight-light ml-1 mr-1">ITEM</span>
                    <span v-if="create"> BARU</span>
                </v-card-title> -->

                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col
                            cols="12"
                            sm="6"
                            md="8"
                            >
                                <v-text-field
                                    v-model="editedItem.description"
                                    :rules="notEmptyRules"
                                    label="Nama"
                                ></v-text-field>
                            </v-col>
                            <v-col
                            cols="6"
                            sm="6"
                            md="4"
                            >
                                <v-text-field
                                    v-model="editedItem.kode1"
                                    label="NIP"
                                ></v-text-field>
                            </v-col>                  
                        </v-row>

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
                                <!-- return-object -->

                            </v-col>


                            <v-col
                            cols="12"
                            sm="2"
                            md="2"
                            >
                            <v-text-field
                                v-model="editedItem.golongan"
                                label="Golongan"
                            ></v-text-field>

                            </v-col>
                            <v-col
                            cols="12"
                            sm="4"
                            md="4"
                            >
                            <v-text-field
                                v-model="editedItem.jabatan"
                                label="Jabatan"
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
                                    v-model="editedItem.address"
                                    label="Alamat"
                                ></v-text-field>
                            </v-col>
                            <v-col
                            cols="12"
                            sm="6"
                            md="4"
                            >
                                <v-text-field
                                    v-model="editedItem.city"
                                    label="Kota"
                                ></v-text-field>
                            </v-col>                                 
                                            
                        </v-row>

                        <v-row>                 
                            <v-col
                            cols="12"
                            sm="6"
                            md="6"
                            >
                            <v-text-field
                                v-model="editedItem.phone"
                                label="Telpon/Whatsapp"
                                prepend-inner-icon="mdi-phone-outline"                      
                            ></v-text-field>
                            </v-col>
                        </v-row>

                    </v-container>
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
                    <!-- :to="success ? '/AdminsPegawai' : $route.name" -->

                </v-card-actions>
            </v-card>


        </v-container>
    </v-form>



</template>

<script>
import axios from 'axios'
import ImageInput from '@/components/ImageInput.vue'

export default {
    props: {
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
            defaultItem: null,
            myConfirmCancelUpdate: false,
            myConfirmCancelUpdateOptions: {
                title: 'Konfirmasi',
                message: 'Membatalkan Modifikasi?',
                color: "grey lighten-3",
                width: 400,
                zIndex: 200,
                noconfirm: false,
            },
            dialog: false,
            editedItem:{
                id: 0,
                kode1: '',
                description: '',
            },
            isOperationSuccess: false,
            valid: false,
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
                { id: 0, kode1: '', description: 'AAAAA' },
                { id: 1, kode1: '', description: 'BBBB' },
                { id: 2, kode1: '', description: 'CCCC' },
            ],

            avatar: null,
            avatarFirstLoad: true,
            avatarSaving: false,
            avatarSaved: false
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
            },
            deep: true
        }
    },       
    methods: {
        save() {
            if (this.create){
                axios({
                    method: 'post',
                    url: `${this.$store.getters.getApiBaseUrl}/createFPegawai`,
                    data: this.editedItem
                })
                .then(response => {
                    this.isOperationSuccess = true
                    this.dialog = true
                    console.log(response.data)

                    this.$router.push('/AdminsPegawai').catch(()=>{})

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
                        url: `${this.$store.getters.getApiBaseUrl}/updateFPegawai/${id}`,
                        data: this.editedItem
                    })
                    .then(response => {
                        this.isOperationSuccess = true
                        this.dialog = true
                        console.log(response.data)

                        this.$router.push('/AdminsPegawai').catch(()=>{})
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
            this.$router.push('/AdminsPegawai').catch(()=>{})
        },
        escapeCancel(){
            this.myConfirmCancelUpdate = true
        },
       
        lookupFDivision (fdivisionBean) {
            const str = this.itemsFDivision.filter(x => x.id==fdivisionBean)
            if (str.length>0){
                return str[0].description
            }else {
                return '-'
            }
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
                    .post(`${this.$store.getters.getApiBaseUrl}/upload_image/avatar_pegawai_${this.editedItem.id}`, formData)
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

        if(this.edit){
            const id = this.$route.params.id
            // console.log(`>>> ${id}`)
            axios
                // .get(`http://192.168.1.30:3000/api/defaultItems/${this.$route.params.id}`)
                .get(`${this.$store.getters.getApiBaseUrl}/getFPegawaiById/${id}`)
                .then( response => {
                    this.defaultItem = response.data
                    this.editedItem =  this.defaultItem
                    console.log(response.data)

                    this.avatarSaved = true
                     if ( id > 0){
                        const theImageURL_VeryLow = `${this.$store.getters.getApiBaseUrl}/files_image_verylow/avatar_pegawai_${id}.jpg`
                        axios
                            .get(theImageURL_VeryLow)
                            .then( response => {
                                if (response.status === 200){                          
                                      
                                    this.avatar = {
                                        imageURL : (this.avatar!==null?this.avatar.imageURL:null),
                                        imageURL_Lazy : theImageURL_VeryLow
                                    }   
                                                                        
                                    const theImageURL = `${this.$store.getters.getApiBaseUrl}/files_image_low/avatar_pegawai_${id}.jpg`
                                    axios
                                        .get(theImageURL)
                                        .then( response => {
                                            // console.log(` >> ${response.data.status} >> ${theImageURL}`)
                                            if (response.status === 200){                            
                                                this.avatar = {
                                                    imageURL : theImageURL,
                                                    imageURL_Lazy : (this.avatar?this.avatar.imageURL_Lazy:null)
                                                }                         
                                            }  else {
                                                this.avatar = null
                                            } 
                                        })
                                        .catch(error => {
                                            console.log(error)
                                            this.avatar = null
                                        })

                                }  else {
                                    this.avatar = null
                                } 
                            })
                            .catch(error => {
                                console.log(error)
                                this.avatar = null
                            })
                            
                     }

                })
                .catch(error => console.log(error))
        }
        if (this.create){
            this.defaultItem = this.editedItem
        }
    },
    
}
</script>