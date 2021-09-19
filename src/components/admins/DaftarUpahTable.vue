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
            <span class="display-1"> UPAH</span>
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
                    md="8"
                  >
                    <v-text-field
                      v-model="selectedItem.description"
                      label="Deskripsi"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="selectedItem.tahun"
                      label="Tahun"
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
                      v-model="selectedItem.pengguna"
                      label="Pengguna"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                    <v-text-field
                      v-model="selectedItem.penyedia"
                      label="Penyedia"
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
                    v-model="menu1"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="selectedItem.tgl_mulai"
                        label="Tanggal Mulai"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="selectedItem.tgl_mulai"
                      @input="menu1 = false"
                    ></v-date-picker>
                  </v-menu>

                  </v-col>

                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
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
                        v-model="selectedItem.tanggal_selesai"
                        label="Tgl Selesai"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="selectedItem.tanggal_selesai"
                      @input="menu2 = false"
                    ></v-date-picker>
                  </v-menu>

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
      date1: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      menu1: false,      
      date2: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      menu2: false,      
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
        { text: 'Tahun', value: 'tahun' },
        { text: 'Pengguna', value: 'pengguna' },
        { text: 'Penyedia', value: 'penyedia' },
        { text: 'Tgl Mulai', value: 'tgl_mulai' },
        { text: 'Tgl Selesai', value: 'tgl_selesai' },
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
            description: 'PT. APINDO JAYA',
            tahun: '2021',
            pengguna: 'PT. Tarakan',
            penyedia: 'PT. Pangkalan B',
            tgl_mulai: '2020-12-10',
            tgl_selesai: '2020-12-10'
          },
          {
            id: 2,
            kode1: '0002',
            description: 'BUMERANG HARAPAN',
            tahun: '2020',
            pengguna: 'CV. Tarakan',
            penyedia: 'CV. Pangkalan B',
            tgl_mulai: '2020-12-10',
            tgl_selesai: '2020-12-10'
          },
        ]
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