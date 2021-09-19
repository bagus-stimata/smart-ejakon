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
            <span class="display-1"> BERITA</span>
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
                    md="4"
                  >
                    <v-text-field
                      v-model="selectedItem.kode1"
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
                      label="Judul Berita"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col
                    cols="12"
                    sm="14"
                    md="12"
                  >
                    <v-textarea
                        outlined
                        v-model = "selectedItem.content"
                        label = "Konten Berita"
                    ></v-textarea>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col
                    cols="8"
                    sm="10"
                    md="8"
                  >
                    <v-file-input
                        label = "File Gambar"
                    ></v-file-input>
                  </v-col>
                  <v-col
                    cols="6"
                    sm="4"
                    md="3"
                  >
                    <v-checkbox
                        label = "Publish"
                    ></v-checkbox>
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

    <template v-slot:[`item.publish`]="{ item }">
      <v-chip
        :color="getColor(item.publish)"
        dark
      >
        {{ item.publish }}
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
        { text: 'Judul Berita', value: 'description' },
        { text: 'Konten', value: 'content' },
        { text: 'Publish', value: 'publish' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      headerItems: [
      ],
      selectedItemIndex: -1,
      selectedItem: {
        kode1: '',
        description: '',
        publish: 'publish'
      },
      defaultItem: {
        kode1: '',
        description: '',
        publish: 'publish'
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
            kode1: '0001',
            description: 'Pelatihan Bikon',
            publish: 'publish'
          },
          {
            id: 2,
            kode1: '0002',
            description: 'Pelatihan Permen',
            publish: 'belum'
          },
          {
            id: 3,
            kode1: '0003',
            description: 'Pembangunan Jalan',
            publish: 'publish'
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
        // this.headerItems.splice(this.selectedItemIndex, 1)
        // this.closeDelete()

        const deletedItem = this.headerItems[this.selectedItemIndex]
        const deletedUrl = `${this.$store.getters.getApiBaseUrl}${deletedItem.kode1}`
        
        console.log(deletedUrl)

        axios
          // .delete( `http://192.168.1.30:3000/api/headerItems/${deletedItem.kode1}`)
          // .delete( `${this.$store.getters.getApiBaseUrl}${deletedItem.kode1}`)
          .delete( `${this.$store.getters.getApiBaseUrl}/deleteFExposeBerita/${deletedItem.id}`)
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
          //Berarti Edit
          Object.assign(this.headerItems[this.selectedItemIndex], this.selectedItem)

          // const id = this.$route.params.id
          const itemSelected = this.headerItems[this.selectedItemIndex]
          this.selectedItem = itemSelected

          axios({
                  method: 'put',
                  url: `${this.$store.getters.getApiBaseUrl}/updateFExposeBerita/${this.selectedItem.id}`,
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
        this.close()
          

        } else {
          //Berarti Create
          this.headerItems.push(this.selectedItem)

          axios({
              method: 'post',
              url: `${this.$store.getters.getApiBaseUrl}/createFExposeBerita`,
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
        this.close()
      },
 
      cancel() {
        this.resolve(false);
        this.dialog = false;
      },

      getColor (publish) {
        if (publish ==='publish' ) return 'green'
        else return 'orange'
      },
      
    },
    mounted(){      
      axios
        .get(`${this.$store.getters.getApiBaseUrl}/getAllFExposeBerita`)
        .then(response => {
            this.headerItems = response.data
            console.log(response.data)
        })
        .catch(error => {

            console.log("Tidak tahu kenapa " + error)
          })
    }

  }
</script>