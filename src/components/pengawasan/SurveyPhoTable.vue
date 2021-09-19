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
            <span class="display-1"> PHO</span>
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
          max-width="650px"
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
                    md="3"
                  >
                    <v-text-field
                      v-model="selectedItem.kode1"
                      label="Kode"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                    <v-text-field
                      v-model="selectedItem.ref"
                      label="Referensi"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="3"
                  >
                    <v-select
                          v-model="selectedItem.tahun"
                          :rules="tahunRules"
                          :items="tahunList"
                          label="Tahun"
                      >
                    </v-select>                    
                  </v-col>
                </v-row>

                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="selectedItem.description"
                      label="Nama Kegiatan"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="8"
                  >
                    <v-text-field
                      v-model="selectedItem.nama_perkerjaan"
                      label="Nama Pekerjaan"
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
                      v-model="selectedItem.nilai_kontrak"
                      label="Nilai Kontrak"
                    ></v-text-field>
                  </v-col>
                </v-row>

               <v-row>                 
                  <v-col cols="10">
                    <v-select
                      v-model="selectCvpt"
                      :hint="`${selectCvpt.state}, ${selectCvpt.abbr}`"
                      :items="cvptList"
                      item-text="state"
                      item-value="abbr"
                      label="CV atau PT"
                      persistent-hint
                      return-object
                      single-line
                    ></v-select>
                  </v-col>                        
                                                                
                </v-row>

                <v-divider class="mt-10"></v-divider>
                
                <v-row>                              
                  <v-col
                    cols="12"
                    sm="5"
                    md="5"
                  >
                    <v-menu
                      v-model="menu2"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          label="Tanggal Permohonan"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                          <!-- v-model="selectedItem.tgl_akta" -->

                      </template>
                      <v-date-picker
                        @input="menu2 = false"
                      ></v-date-picker>
                        <!-- v-model="selectedItem.tgl_akta" -->
                    </v-menu>

                  </v-col>
             

                  <v-col cols="5">                    
                    <template>
                      <v-file-input multiple label="File Permohonan PHO (Pdf, Jpeg, Png)"></v-file-input>
                    </template>
                  </v-col>                                                                                        
                </v-row>

                <v-divider class="mt-10"></v-divider>

                
                <v-row>                              
                  <v-col
                    cols="12"
                    sm="5"
                    md="5"
                  >
                    <v-menu
                      v-model="menu2"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          label="Tanggal Pemeriksaan"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                          <!-- v-model="selectedItem.tgl_akta" -->

                      </template>
                      <v-date-picker
                        @input="menu2 = false"
                      ></v-date-picker>
                        <!-- v-model="selectedItem.tgl_akta" -->
                    </v-menu>

                  </v-col>
                </v-row>


                <v-row>                 
                  <v-col cols="4">                    
                  <template>
                    <v-file-input multiple label="Photo-1"></v-file-input>
                  </template>
                  </v-col>       
                  <v-col cols="5">                    
                  <template>
                    <v-file-input multiple label="Photo-2"></v-file-input>
                  </template>
                  </v-col>         
                  <v-col cols="5">                    
                  <template>
                    <v-file-input multiple label="Photo-3"></v-file-input>
                  </template>
                  </v-col>   

                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                    <v-text-field
                      label="Persentase"
                    ></v-text-field>
                  </v-col>

                </v-row>
                <v-row>                 
                  <v-col cols="10">                    
                  <template>
                    <v-file-input multiple label="File Hasil Pengawasan (Pdf, Jpeg, Png)"></v-file-input>
                  </template>
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
                @click="close"
              >
                Batal
              </v-btn>
              <v-btn
                color="blue darken-1"
                outlined
                text
                @click="save"
              >              
                Simpan
              </v-btn>
            </v-card-actions>
          </v-card>
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
  </v-data-table>
</template>


<script>
  import axios from 'axios'

  export default {
    data: () => ({
      judul: 'PHO',
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
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      menu2: false,      

      headers: [
        {
          text: 'ID',
          align: 'start',
          sortable: true,
          value: 'id',
        },
        {
          text: 'Kode',
          align: 'start',
          sortable: true,
          value: 'kode1',
        },
        {
          text: 'Referensi',
          align: 'start',
          sortable: true,
          value: 'ref',
        },
        { text: 'Tahun', value: 'tahun' },
        // { text: 'Nama Kegiatan', value: 'description' },
        { text: 'Nama Pekerjaan', value: 'nama_perkerjaan' },
        { text: 'Pelaksana (CV/PT)', value: 'id_cvpt' },
        { text: 'nilai_kontrak', value: 'nilai_kontrak' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      headerItems: [
          {
            id: 1,
            kode1: '0001',
            ref: 'xtere/2021/abc',
            tahun: 2021,
            description: 'Pembangunan',
            nama_perkerjaan: 'Pengerjaan Jembatan',
            ganti_namapaket: 'Pengerjaan Jembatan Barat',
            paket_abt: 'Paket oke',
            pagu: 350000000,
            nilai_dpa: 340000000,
            nilai_kontrak: 330000000,
          },
          {
            id: 3,
            kode1: '0003',
            tahun: 2021,
            description: 'Pembangunan',
            nama_perkerjaan: 'Pengerjaan Jalan',
            ganti_namapaket: 'Pengerjaan Jlan Timur',
            paket_abt: 'Paket Sementara',
            pagu: 350000000,
            nilai_dpa: 340000000,
            nilai_kontrak: 330000000,
          },        
      ],
      tahunList: [2020, 2021,  2022,  2023,  2024, 2025],
      selectCvpt: { state: 'PT Arut Merdeka', abbr: 'FL' },
      cvptList: [
          { state: 'PT. Barata Jaya', abbr: 'FL' },
          { state: 'PT. Pangkalan Jaya', abbr: 'GA' },
          { state: 'CV. Jaya Abadi', abbr: 'NE' },
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
      genderRules: [
          v => !!v || 'Gender is required'
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
        this.headerItems = this.headerItems.filter()
        this.headers = this.headers.filter( x => x.text ==='tahun')
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
        const deletedUrl = `${this.$store.getters.getApiBaseUrl}${deletedItem.kode1}`
        
        console.log(deletedUrl)

        axios
          // .delete( `http://192.168.1.30:3000/api/headerItems/${deletedItem.kode1}`)
          .delete( `${this.$store.getters.getApiBaseUrl}${deletedItem.kode1}`)
          .then( response => {
              this.headerItems.splice(this.selectedItemIndex, 1)        
              this.closeDelete
              console.log("DELETE SUCCESS >> ", response.data)
          })
          .catch( error => {
              console.log(error)              
              this.closeDelete  //Show Dialog Information, sementara ini
          })

        
        this.closeDelete()

      },
      closeDelete () {
        this.myConfirmDialog = false
        this.$nextTick(() => {
          this.selectedItem = Object.assign({}, this.defaultItem)
          this.selectedItemIndex = -1
        })
      },
      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.selectedItem = Object.assign({}, this.defaultItem)
          this.selectedItemIndex = -1
        })
      },

      save () {
        if (this.selectedItemIndex > -1) {
          Object.assign(this.headerItems[this.selectedItemIndex], this.selectedItem)
        } else {
          this.headerItems.push(this.selectedItem)
        }
        this.close()
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
      
    },
    mounted(){      
      axios
        .get(`${this.$store.getters.getApiBaseUrl}/getAllFAsosiasi`)
        .then(response => {
            this.headerItems = response.data
            // console.log(response.data)
        })
        .catch(error => console.log(error))
    }

  }
</script>