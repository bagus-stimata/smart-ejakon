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
            <span class="display-1"> PENGAWASAN FHO</span>
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

        <!-- tidak ada tambah ya -->
        <!-- <router-link style="text-decoration:none;" :to="`/KegiatanCreate`">
          <v-btn
            color="primary"
            dark
            class="mb-2"
            fab
          >
              <v-icon>mdi-plus</v-icon>                          
          </v-btn>
        </router-link> -->
        

        <v-dialog 
          v-model="myConfirmDelete"
          :max-width="myConfirmDeleteOptions.width"
          :style="{ zIndex: myConfirmDeleteOptions.zIndex }"
          @keydown.esc="deleteCancel"
         >
          <v-card>
            <v-toolbar dark :color="myConfirmDeleteOptions.color" dense flat>
              <v-toolbar-title class="text-body-2 font-weight-bold grey--text">
                {{ myConfirmDeleteOptions.title }}
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

    <template v-slot:[`item.nilaiPagu`]="{ item }">  
      <div class="text-right">{{ formattedCurrencyValue(item.nilaiPagu) }}</div>        
    </template>
    <template v-slot:[`item.nilaiKontrak`]="{ item }">  
      <div class="text-right" >{{ formattedCurrencyValue(item.nilaiKontrak) }}</div>        
    </template>

    <!-- <template v-slot:item.actions="{ item }"> -->
    <template v-slot:[`item.actions`]="{ item }">        
      
      <!-- <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon> -->


      <router-link style="text-decoration:none;" :to="`/PengawasanFho/${item.id}/${linkNeated(item.description)}`">
          <v-icon                                  
              class="mr-2"
              small
          >
              mdi-pencil
          </v-icon>
      </router-link>

      <!-- <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon> -->
      
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
      judul: 'PAKET KEGIATAN',
      search: '',
      myConfirmDelete: false,
      myConfirmDeleteOptions: {
        title: 'Konfirmasi Hapus',
        color: "grey lighten-3",
        width: 400,
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
        {
          text: 'Kode',
          align: 'start',
          sortable: true,
          value: 'kode1',
        },
        // {
        //   text: 'Ref',
        //   align: 'start',
        //   sortable: true,
        //   value: 'ref',
        // },
        { text: 'Tahun', value: 'tahun' },
        { text: 'Nama Kegiatan', value: 'description' },
        { text: 'Nama Pekerjaan', value: 'namaPekerjaan' },
        { text: 'Ganti Nama Paket', value: 'gantiNamaPaket' },
        // { text: 'Pagu', value: 'nilaiPagu' },
        { text: 'Nilai Kontrak', value: 'nilaiKontrak' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      headerItems: [
          {
            id: 1,
            kode1: '0001',
            ref: 'xtere/2021/abc',
            tahun: 2021,
            description: 'Pembangunan',
            nama_pekerjaan: 'Pengerjaan Jembatan',
            ganti_nama_paket: 'Pengerjaan Jembatan Barat',
            paket_abt: 'Paket oke',
            nilai_pagu: 350000000,
            nilai_kontrak: 330000000,
          },
      ],
      tahunList: [2020, 2021,  2022,  2023,  2024, 2025],

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
      myConfirmDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        // this.headerItems = this.headerItems.filter()
        // this.headers = this.headers.filter( x => x.text ==='tahun')
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
        this.myConfirmDelete = true
      },
      deleteItemConfirm () {
        // this.headerItems.splice(this.selectedItemIndex, 1)
        // this.closeDelete()

        const deletedItem = this.headerItems[this.selectedItemIndex]

        axios
          // .delete( `http://192.168.1.30:3000/api/headerItems/${deletedItem.kode1}`)
          .delete( `${this.$store.getters.getApiBaseUrl}/deleteFKegiatan/${deletedItem.id}`)
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
        this.myConfirmDelete = false
        
        this.$nextTick(() => {
          this.selectedItem = Object.assign({}, this.defaultItem)
          this.selectedItemIndex = -1
        })

      },
      getColor (calories) {
        if (calories > 400) return 'red'
        else if (calories > 200) return 'orange'
        else return 'green'
      },
      
    },
    mounted(){      
      axios
        .get(`${this.$store.getters.getApiBaseUrl}/getAllFKegiatan`)
        .then(response => {
            this.headerItems = response.data
            console.log(response.data)
        })
        .catch(error => console.log(error))
    }

  }
</script>