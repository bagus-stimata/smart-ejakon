<template>
  <v-data-table
    :headers="headers"
    :items="headerItems"
    sort-by="calories"
    class="elevation-1 mt-6"
     :search="search"
  >
 
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title class="text-uppercase primary--text">
            <span class="font-weight-light subheading">DAFTAR</span>
            <span class="display-1"> CV-PT</span>
        </v-toolbar-title>        


        <v-spacer class="ml-16"></v-spacer>
        <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Cari data"
            single-line
            hide-details
            class="mr-4"
        ></v-text-field>

        <v-dialog
          v-model="dialog"
          max-width="620px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
              fab
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
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="selectedItem.kode1"
                        :rules="codeLenghtRules"
                        label="Kode"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="8"
                    >
                      <v-text-field
                        v-model="selectedItem.description"
                        :rules="notEmptyRules"
                        label="Nama PT"
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
                        :rules="notEmptyRules"
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
                        :rules="notEmptyRules"
                        prepend-inner-icon="mdi-phone-outline"                      
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                    >
                      <v-text-field
                        v-model="selectedItem.email"
                        label="Email"
                        prepend-inner-icon="mdi-email-outline"
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
                        v-model="selectedItem.nomor_akta"
                        label="Nomor Akta"
                      ></v-text-field>

                    </v-col>                  
                  </v-row>

                  <v-row>                 
              
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                    >

                      <v-menu
                        v-model="menu2"
                        :close-on-content-click="false"
                        max-width="290"
                      >
                        <template v-slot:activator="{ on, attrs } ">
                          <v-text-field
                            :value="computedDateFormattedDatefns(selectedItem.tgl_akta)"
                            prepend-inner-icon="mdi-calendar"
                            clearable
                            label="Tanggal Akta"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                            @click:clear="selectedItem.tgl_akta = null"
                          ></v-text-field>
                        </template>
                        
                        <v-date-picker
                          v-model="selectedItem.tgl_akta"
                          @change="menu2 = false"
                        ></v-date-picker>
                      </v-menu>


                    </v-col>
              
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                    >
                      <v-text-field
                        v-model="selectedItem.contact"
                        label="Direktur"
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
                          v-model="selectedItem.fasosiasiBean"
                          :rules="notEmptyRules"
                          :items="itemsFAsosiasi"
                          item-text="description"
                          item-value="id"
                          label="ASOSIASI"
                          hint="harus dipilih dari pilihan"
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
    </template>
    <!-- <template v-slot:item.actions="{ item }"> -->
    <template v-slot:[`item.actions`]="{ item }">        
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template>

    <template v-slot:[`item.calories`]="{ item }">
      <v-chip
        :color="getColor(item.calories)"
        dark
      >
        {{ item.calories }}
      </v-chip>
    </template>

    <template v-slot:[`item.fasosiasiBean`]="{ item }">
        {{ lookupFAsosiasi(item.fasosiasiBean) }}
    </template>

  </v-data-table>
</template>


<script>
  import axios from 'axios'
  import { format, parseISO } from 'date-fns'

  export default {
    data: () => ({
      judul: 'ASOSIASI',
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

      date: format(parseISO(new Date().toISOString()), 'yyyy-MM-dd'),
      menu2: false,


      headers: [
        // {
        //   text: 'ID',
        //   align: 'start',
        //   sortable: true,
        //   value: 'id',
        // },
        {
          text: 'Kode',
          align: 'start',
          sortable: true,
          value: 'kode1',
        },
        { text: 'Nama PT', value: 'description' },
        { text: 'Alamat', value: 'address' },
        { text: 'Kota', value: 'city' },
        { text: 'Telp', value: 'phone', width: '10' },
        { text: 'Email', value: 'email', width: '10' },
        { text: 'Direktur', value: 'contact' },
        // { text: 'NKTT', value: 'nktt' },
        { text: 'Nomor Akta', value: 'nomor_akta' },
        { text: 'Tanggal Akta', value: 'tgl_akta' },
        { text: 'Asosiasi', value: 'fasosiasiBean' },
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

      selectFAsosiasi: {id: 0, kode1: '', description: 'AAAAA' },
      itemsFAsosiasi: [
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
        val || this.closeForm()
      },
      myConfirmDialog (val) {
        val || this.closeDelete()
      },


    },

    created () {
      this.initialize()
    },

    methods: {
      formatDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${month}/${day}/${year}`
      },

      initialize () {
        this.headerItems = []
      },
      linkNeated(link){
          return link.replace(/\s+/g, '-').toLocaleLowerCase()
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
          .delete( `${this.$store.getters.getApiBaseUrl}/deleteFCvpt/${deletedItem.id}`)
          .then( response => {
              this.headerItems.splice(this.selectedItemIndex, 1)        
              this.closeDelete()
              console.log("Delete Successs >> ", response.data)
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
          // this.selectedItem.tgl_akta = '2021-07-02'
          // console.log(this.selectedItem)

          axios({
                  method: 'put',
                  url: `${this.$store.getters.getApiBaseUrl}/updateFCvpt/${this.selectedItem.id}`,
                  data: this.selectedItem
              })
              .then(response => {
                  this.isOperationSuccess = true
                  this.dialog = false
                  console.log("###" + response.data)
              })
              .catch(error => {
                  this.isOperationSuccess = false
                  this.dialog = true
                  console.log(error)
              })
        this.closeForm()
          

        } else {
          //Berarti Create
          this.headerItems.push(this.selectedItem)

          axios({
              method: 'post',
              url: `${this.$store.getters.getApiBaseUrl}/createFCvpt`,
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

      lookupFAsosiasi (fasosiasiBean) {
        const str = this.itemsFAsosiasi.filter(x => x.id==fasosiasiBean)
        if (str.length>0){
          return str[0].description
        }else {
          return '-'
        }
      },

      computedDateFormattedDatefns (value) {
        return value ? format(parseISO(value), 'yyyy-MM-dd') : ''
      },


      
    },
    mounted(){      

      axios
        .get(`${this.$store.getters.getApiBaseUrl}/getAllFAsosiasi`)
        .then(response => {
            this.itemsFAsosiasi = response.data
            console.log(response.data)
        })
        .catch(error => {
            console.log(error)
        })

      axios
        .get(`${this.$store.getters.getApiBaseUrl}/getAllFCvpt`)
        .then(response => {
            this.headerItems = response.data
            // console.log(response.data)
        })
        .catch(error => console.log(error))
    }

  }
</script>