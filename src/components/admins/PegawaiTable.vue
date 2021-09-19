<template>

        <v-container class="mx-8 my-8">

            <v-toolbar
              flat
            >
              <v-toolbar-title class="text-uppercase primary--text">
                  <span class="font-weight-light subheading">DAFTAR</span>
                  <span class="display-1"> PEGAWAI</span>
              </v-toolbar-title>        


              <v-spacer class="ml-16"></v-spacer>
              <router-link style="text-decoration:none;" :to="`/AdminsPegawaiCreate`">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  fab
                >
                    <v-icon>mdi-plus</v-icon>                          
                </v-btn>
              </router-link>


              <v-dialog
                v-model="dialog"
                max-width="500px"
              >
              
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                    fab
                    :disabled=true
                  >
                      <v-icon>mdi-plus</v-icon>                          
                  </v-btn>
                </template>

                <v-form v-model="valid">

                  <v-card>
                    <v-card-title class="text-uppercase grey--text">
                      <span v-if="formTitle === 'MODIFIKASI' ">{{ formTitle }}</span>
                      <span class="font-weight-light ml-1 mr-1">ITEM</span>
                      <span v-if="formTitle === 'BARU' ">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col
                            cols="12"
                            sm="8"
                            md="10"
                          >
                            <v-text-field
                              v-model="selectedItem.description"
                              :rules="notEmptyRules"
                              label="Nama"
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="4"
                          >
                            <v-text-field
                              v-model="selectedItem.kode1"
                              label="NIP"
                            ></v-text-field>
                          </v-col>                  
                        </v-row>

                        <v-row>
                          <v-col
                            cols="12"
                            sm="6"
                            md="8"
                          >
                            <v-text-field
                              v-model="selectedItem.address"
                              label="Alamat"
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="4"
                          >
                            <v-text-field
                              v-model="selectedItem.city"
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
                              v-model="selectedItem.phone"
                              label="Telpon/Whatsapp"
                              prepend-inner-icon="mdi-phone-outline"                      
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
                              v-model="selectedItem.golongan"
                              label="Golongan"
                            ></v-text-field>

                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="6"
                          >
                            <v-text-field
                              v-model="selectedItem.jabatan"
                              label="Jabatan"
                            ></v-text-field>
                          </v-col>                   
                        </v-row>


                        <v-row>
                          <v-col
                            cols="12"
                            sm="12"
                            md="12"
                          >

                                <!-- :hint="`${selectFCompany.description}, ${selectFCompany.id}`" -->
                              <v-select
                                v-model="selectedItem.fdivisionBean"
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
                    </v-card-actions>
                  </v-card>

                </v-form>


              </v-dialog>

              <v-dialog 
                v-model="myConfirmDialog"
                :max-width="myConfirmDialogOptions.width"
                :style="{ zIndex: myConfirmDialogOptions.zIndex }"
                @keydown.esc="deleteCancel"
              >
                <v-card>
                  <v-toolbar dark :color="myConfirmDialogOptions.color" dense flat>
                    <v-toolbar-title class="text-body-2 font-weight-bold grey--text">
                      {{ myConfirmDialogOptions.title }}
                    </v-toolbar-title>
                  </v-toolbar>
                  
                  <v-card-title class="text-h5">Yakin akan menghapus data?</v-card-title>
                  
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" outlined text @click="closeDelete">Cancel</v-btn>
                    <v-btn color="blue darken-1" outlined text @click="deleteItemConfirm">OK</v-btn>
                  </v-card-actions>


                </v-card>
              </v-dialog>

            </v-toolbar>

          
            <v-layout row wrap >
                <v-flex xs12 sm6 md4 lg3 v-for="item in headerItems" :key="item.id">
                    <v-card flat class="text-center ma-3">
                        <v-responsive class="pt-4">
                            <v-avatar size="100" class="grey lighten-2">
                               
                              <v-img
                                :src="item.imageURL"
                                :lazy-src="item.imageURL_Lazy"
                                aspect-ratio="1"
                                class="grey lighten-2"
                              >
                                <template v-slot:placeholder>
                                  <v-row
                                    class="fill-height ma-0"
                                    align="center"
                                    justify="center"
                                  >
                                    
                                    <!-- <v-progress-circular
                                      indeterminate
                                      color="grey lighten-5"
                                    ></v-progress-circular> -->

                                  </v-row>
                                </template>
                              </v-img>

                            </v-avatar>
                              <!-- <img :src="item.avatar_path" alt=""> -->
                        </v-responsive>
                        <v-card-text>
                            <div class="subtitle-2">{{item.description}}</div>
                            <div class="grey--text caption" v-if="item.kode1 || item.golongan || item.jabatan">{{item.kode1}} / {{item.golongan}} / {{item.jabatan}} </div>
                            <div class="grey--text" v-if="item.address || item.city">{{item.address}} {{item.city}}</div>
                        </v-card-text>
                        <v-card-actions class="mr-12">
                            <div class="grey--text caption ml-4">
                              <v-icon small v-if="item.phone">mdi-phone</v-icon>
                              {{item.phone}} 
                              <v-icon small v-if="item.email">mdi-mail</v-icon>
                              {{item.email}}
                            </div>
                          <v-spacer></v-spacer>
                          
                          <!-- <v-icon
                            small
                            color="blue"
                            class="mr-2"
                            @click="editItem(item)"
                          >
                            mdi-pencil
                          </v-icon> -->

                          <router-link style="text-decoration:none;" :to="`/AdminsPegawai/${item.id}/${linkNeated(item.description)}`">
                              <v-icon                                  
                                  class="mr-2"
                                  small
                              >
                                  mdi-pencil
                              </v-icon>
                          </router-link>

                          <v-icon
                            small
                            color="red"
                            @click="deleteItem(item)"
                          >
                            mdi-delete
                          </v-icon>

                        </v-card-actions>
                    </v-card>
                </v-flex>

            </v-layout>

        </v-container>

</template>


<script>
  import axios from 'axios'

  export default {
    data: () => ({
      judul: 'PEGAWAI',
      search: '',
      dialog: false,
      myConfirmDialog: false,
      myConfirmDialogOptions: {
        title: 'Konfirmasi Hapus',
        color: "grey lighten-3",
        width: 400,
        zIndex: 200,
        noconfirm: false,
      },
      headers: [
        {
          text: 'ID',
          align: 'start',
          sortable: true,
          value: 'id',
        },
        {
          text: 'Nama',
          align: 'start',
          sortable: true,
          value: 'description',
        },
        { text: 'NIP', value: 'kode1' },
        { text: 'alamat', value: 'address' },
        { text: 'Kota', value: 'city' },
        { text: 'HP/Phone', value: 'phone' },
        { text: 'Golongan', value: 'golongan' },
        { text: 'Jabatan', value: 'jabatan' },
        { text: 'Avatar', value: 'avatar_path' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      headerItems: [
      ],
      selectedItemIndex: -1,
      selectedItem: {
        kode1: '',
        description: '',
      },
      defaultItem: {
        kode1: '',
        description: '',
      },

      selectFDivision: {id: 0, kode1: '', description: 'AAAAA' },
      itemsFDivision: [
        { id: 0, kode1: '', description: 'AAAAA' },
        { id: 1, kode1: '', description: 'BBBB' },
        { id: 2, kode1: '', description: 'CCCC' },
      ],

      valid: false,
      codeLenghtRules: [
          v => !!v || ' Tidak Boleh Kosong',
          v => v.length <= 20 || 'Maksimal 20 Karakter',
          v => v.length > 1 || 'Harus lebih besar dari 1 karakter'
      ],
      notEmptyRules: [
          v => !!v || 'Tidak boleh kosong'
      ],

    }),

    computed: {
      formTitle () {
        return this.selectedItemIndex === -1 ? 'BARU' : 'MODIFIKASI'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      myConfirmDialog (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.headerItems = [
          {
            id: 1,
            nama: 'Abdul',
            nip: '12345',
            address: 'Jln. Pramuka',
            city: 'Pangkalan bun',
            phone: '082145673',
            golongan: 'IVA',
            jabatan: 'Pranata',
            imageURL: '/avatar-1.png',
            imageURL_Lazy: '/avatar-1.png'
          },
 
        ]
      },
      linkNeated(link){      
          return link!=null? link.replace(/\s+/g, '-').toLocaleLowerCase(): ''
      },
      editItem (item) {        
        this.selectedItemIndex = this.headerItems.indexOf(item)
        this.selectedItem = Object.assign({}, item)        
        this.dialog = true
      },
      deleteItem (item) {
        this.selectedItemIndex = this.headerItems.indexOf(item)
        this.selectedItem = Object.assign({}, item)
        this.myConfirmDialog = true
      },
      deleteItemConfirm () {
        // this.headerItems.splice(this.selectedItemIndex, 1)
        // this.closeDelete()

        const deletedItem = this.headerItems[this.selectedItemIndex]

        axios
          // .delete( `http://192.168.1.30:3000/api/headerItems/${deletedItem.kode1}`)
          .delete( `${this.$store.getters.getApiBaseUrl}/deleteFPegawai/${deletedItem.id}`)
          .then( response => {
              this.headerItems.splice(this.selectedItemIndex, 1)        
              this.closeDelete()
              console.log("Delete Success >> ", response.data)
          })
          .catch( error => {
              console.log(error)              
              this.closeDelete()  //Show Dialog Information, sementara ini
          })

      },
      closeDelete () {
        this.myConfirmDialog = false

        this.$nextTick(() => {
          this.selectedItem = Object.assign({}, this.defaultItem)
          this.selectedItemIndex = -1
        })
      },


      closeForm () {
        this.dialog = false

        this.$nextTick(() => {
          this.selectedItem = Object.assign({}, this.defaultItem)
          this.selectedItemIndex = -1
        })
      },

      save () {
        if (this.selectedItemIndex > -1) {
          //Berarti Edit
          Object.assign(this.headerItems[this.selectedItemIndex], this.selectedItem)

          // const id = this.$route.params.id
          const itemSelected = this.headerItems[this.selectedItemIndex]
          this.selectedItem = itemSelected
          // console.log(`>>>> ${this.selectedItem} ${this.selectedItem.fcompanyBean}`)

          axios({
                  method: 'put',
                  url: `${this.$store.getters.getApiBaseUrl}/updateFPegawai/${this.selectedItem.id}`,
                  data: this.selectedItem
              })
              .then(response => {
                  this.isOperationSuccess = true
                  this.dialog = false
                  console.log(`Berhasil >> ${response.data}`)
              })
              .catch(error => {
                  this.isOperationSuccess = false
                  this.dialog = true
                  console.log(`Error >> ${error}`)
              })
        this.closeForm()
          

        } else {
          //Berarti Create
          this.headerItems.push(this.selectedItem)

          axios({
              method: 'post',
              url: `${this.$store.getters.getApiBaseUrl}/createFPegawai`,
              data: this.selectedItem
          })
          .then(response => {
              this.isOperationSuccess = true
              this.dialog = false
              console.log(response.data)
          })
          .catch(error => {
              this.isOperationSuccess = false
              this.dialog = true
              console.log(error)
          })


        }
        this.closeForm()
      },
      
      cancel() {
        this.resolve(false);
        this.dialog = false;
      },

      getColor (calories) {
        if (calories > 400) return 'red'
        else if (calories > 200) return 'orange'
        else return 'green'
      },
      lookupFDivision (fdivisionBean) {
        const str = this.itemsFDivision.filter(x => x.id==fdivisionBean)
        if (str.length>0){
          return str[0].description
        }else {
          return '-'
        }
      },

      
    },
    mounted(){      

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
        .get(`${this.$store.getters.getApiBaseUrl}/getAllFPegawai`)
        .then(response => {
        
            let arr = [];


            response.data.forEach((value, index) => {
              if (value.id >0){    
                value.imageURL = `${this.$store.getters.getApiBaseUrl}/files_image_low/avatar_pegawai_${value.id}.jpg`
                value.imageURL_Lazy = `${this.$store.getters.getApiBaseUrl}/files_image_verylow/avatar_pegawai_${value.id}.jpg`                
                arr.push(value);
                console.log(value);
                console.log(index);
              }
            });

            // this.headerItems = arr


            this.headerItems = response.data
            console.log(response.data)
        })
        .catch(error => console.log(error))
    }

  }
</script>