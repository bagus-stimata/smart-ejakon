<template>
  <div>

    <v-data-table
      :headers="headers"
      :items="headerItems"
      sort-by="calories"
      class="elevation-1 mt-6"
    >


      <template v-slot:[`item.fileName`]="{ item }">
        <a :href="`${$store.getters.getApiBaseUrl}/files/${item.fileName}`" target="_blank">
          <span class="text-center">{{ item.fileName }}</span>
        </a>
        <v-icon dense>mdi-attachment</v-icon>
      </template>

      <template v-slot:[`item.created`]="{ item }">
        <div class="text-center">{{ computedDateFormattedDatefns(item.created) }}</div>
      </template>


      <template v-slot:[`item.actions`]="{ item }">
        <v-icon
          small
          color="red"
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


        <v-dialog
            v-model="myUploadDocumentDialog"
            :max-width="myUploadDocumentDialogOptions.width"
            :style="{ zIndex: myUploadDocumentDialogOptions.zIndex }"
            @keydown.esc="deleteCancel"
        >
        <v-card>
          <v-toolbar dark :color="myUploadDocumentDialogOptions.color" dense flat>
            <v-toolbar-title class="text-body-2 font-weight-bold grey--text">
              {{ myUploadDocumentDialogOptions.title }}
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn
            icon
            color="grey"
            @click="myUploadDocumentDialog = !myUploadDocumentDialog"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-container>

              <v-row>
                  <v-col>
                    <MyUploadDocument @successMessage="succesMessageUploadFile">

                    </MyUploadDocument >
                  </v-col>
              </v-row>
          </v-container>

          <v-card-actions>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>

  </div>


</template>


<script>
  import MyUploadDocument  from '../MyUploadDocument '
import axios from 'axios'
  import { format, parseISO } from 'date-fns'

  export default {
  components: { MyUploadDocument  },
    props: {
      parentItem: undefined
    },
    data: () => ({
      myConfirmDialog: false,
      myConfirmDialogOptions: {
        title: 'Konfirmasi Hapus',
        color: "grey lighten-3",
        width: 400,
        zIndex: 200,
        noconfirm: false,
      },
      myUploadDocumentDialog: false,
      myUploadDocumentDialogOptions: {
        title: 'Upload Document',
        color: "grey lighten-3",
        width: 800,
        zIndex: 200,
        noconfirm: false,
      },
      headers: [
            // {
            //   text: 'ID',
            //   align: 'start',
            //   sortable: true,
            //   value: 'id',
            // },
            // {
            //   text: 'Kode',
            //   align: 'start',
            //   sortable: true,
            //   value: 'kode1',
            // },
            { text: 'Deskripsi', value: 'description' },
            // { text: 'Jenis File', value: 'fileType' },
            { text: 'File', value: 'fileName' },
            { text: 'Uploaded', value: 'created' },
            { text: 'Actions', value: 'actions', sortable: false },
          ],
      headerItems: [
          {
            id: 1,
            kode1: '0001',
            description: 'Pembangunan',
            fileType: 'Pengerjaan Jembatan',
            fileName: 'Pengerjaan Jembatan Barat',
            fileURL: 'http://www.google.com',
            created: '2021-01-01',
          },
      ],

      selectedItemIndex: -1,
      selectedItem: {
        kode1: '',
        description: '',
      },

      date: format(parseISO(new Date().toISOString()), 'yyyy-MM-dd'),

    }),

    computed: {
      formTitle () {
        return this.selectedItemIndex === -1 ? 'BARU' : 'MODIFIKASI'
      },

    },

    watch: {
      myConfirmDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
    },

    methods: {
      retrieveData(){
        // console.log(val.id)
        console.log(`masuk sini: ${this.parentItem.id}`)

        axios
          .get(`${this.$store.getters.getApiBaseUrl}/getAllFKegiatanFileByParent/${this.parentItem.id}`)
          .then( response => {
              let arr = [];
              response.data.filter(x => x.fileType==='DOC' && x.kegiatanType===2 ).forEach(element => {
                  // element.imageURL = `${this.$store.getters.getApiBaseUrl}/files_image_low/${element.fileName}`
                  // element.imageURL_Lazy = `${this.$store.getters.getApiBaseUrl}/files_image_verylow/${element.fileName}`
                  // element.text = element.description
                  // element.subtext = element.created
                  arr.push(element)
                  console.log(element.imageURL)
              });

              this.headerItems = arr

              console.log(response)

          })
          .catch( error => {
            console.log(error)
          })

      },

      formattedCurrencyValue(value){
        if(! value){ return "0"}
            // return "Rp." + parseFloat(value).toFixed(0).toLocaleString()
            return "" + parseFloat(value).toLocaleString()
      },


      linkNeated(link){
          return link.replace(/\s+/g, '-').toLocaleLowerCase()
      },

            deleteItem (item) {
        this.selectedItemIndex = this.headerItems.indexOf(item)
        this.selectedItem = Object.assign({}, item)
        this.myConfirmDialog = true
      },
      deleteItemConfirm () {
        // console.log(this.selectedItem)
        // console.log(this.headerItems)

        const deletedItem = this.headerItems[this.selectedItemIndex]

        console.log(deletedItem.id)

        if (deletedItem.id >0){

          axios
            .delete( `${this.$store.getters.getApiBaseUrl}/deleteFKegiatanFile/${deletedItem.id}`)
            .then( response => {
                this.headerItems.splice(this.selectedItemIndex, 1)
                this.closeDelete()
                console.log("Delete data Success ", response.data)
            })
            .catch( error => {
                console.log(error)
                this.closeDelete()  //Show Dialog Information, sementara ini
            })

            axios
                .delete(`${this.$store.getters.getApiBaseUrl}/deletefiles/${deletedItem.fileName}`)
                .then( response => {
                  console.log(response.data)
                })
                .catch(error => {
                  console.log(error)
                })

          this.closeDelete()

        }

      },
      closeDelete () {
        this.myConfirmDialog = false

        this.$nextTick(() => {
          this.selectedItem = Object.assign({}, this.defaultItem)
          this.selectedItemIndex = -1
        })
      },


      showUploadDocumentDialog(){
        this.myUploadDocumentDialog = true
        // console.log("Hello saya sampai disini")
      },
      succesMessageUploadFile: function(val){
        if (val !== undefined){
          //Doing something
          console.log(val)

          if (! val.message.includes(".jpg")){

            const requestData = {
              id: 0,
              fileName: `${val.message}`,
              description: `${val.description}`,
              fileType: 'DOC',
              fkegiatanBean: this.parentItem.id,
              kegiatanType: 2,
              flag: true,
            }

            axios ({
              method: 'post',
              url: `${this.$store.getters.getApiBaseUrl}/createFKegiatanFile`,
              data: requestData
            })
            .then( response => {

              this.retrieveData()
              console.log(`${response.data}`)

            }).catch(error => {console.log(error)})
          }
        }
      },

      getColor (calories) {
        if (calories > 400) return 'red'
        else if (calories > 200) return 'orange'
        else return 'green'
      },

      computedDateFormattedDatefns (value) {
        return value ? format(parseISO(value), 'yyyy-MM-dd HH:mm:ss') : ''
      },

    },
    mounted(){
      if (this.paretItem !==null){
        this.retrieveData()
      }

    }

  }
</script>
