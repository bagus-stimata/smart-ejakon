<template>
  <v-container class="pa-4 text-center">
    <v-row
      class="fill-height"
      align="center"
      justify="center"
    >
      <template v-for="(item, i) in headerItems">
        <v-col
          :key="i"
          cols="12"
          md="4"
        >
          <v-hover v-slot="{ hover }">
            <v-card
              :elevation="hover ? 16 : 2"
              :class="[{ 'on-hover': hover }, 'card-image-not-hover']"
            >
              <v-img
                :src="item.imageURL"
                :lazy-src="item.imageURL_Lazy"
                height="225px"
              >
                <v-card-title class="text-h6 grey--text">
                  <v-row
                    class="fill-height flex-column"
                    justify="space-between"
                  >
                    <!-- <p class="mt-4 subheading text-left">
                      {{ item.title }}
                    </p> -->

                    <div class="mt-4 ml-4">
                      <p class="ma-0 text-body-1 font-weight-bold font-italic text-left">
                        {{ item.text }}
                      </p>
                      <p class="text-caption font-weight-medium font-italic text-left">
                        {{ item.subtext }}
                      </p>
                    </div>

                    <div class="align-self-auto mt-6">
                      <v-btn
                        v-for="(icon, index) in btnIcons"
                        :key="index"
                        :class="{ 'show-btns': hover }"
                        :color="transparent"
                        icon
                        @click="clickBtn(item, icon)"
                      >
                        <v-icon
                          :class="{ 'show-btns': hover }"
                          :color="transparent"
                        >
                          {{ icon }}
                        </v-icon>
                      </v-btn>
                    </div>
                  </v-row>
                </v-card-title>
              </v-img>
            </v-card>
          </v-hover>
        </v-col>
      </template>
    </v-row>

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
      v-model="myShowPictureDialog"      
      fullscreen
    >
        <v-card outlined
        class="cardTransparantColor"
        >
            <v-toolbar
            flat            
            class="cardTransparantColor"
            >
                <v-spacer></v-spacer>
                <v-btn
                    icon                    
                    @click="myShowPictureDialog = false"
                >
                    <v-icon>mdi-close</v-icon>
                </v-btn>                        
            </v-toolbar>
            <v-container
              style="opacity: 1"
            >
              <v-img
              :src="selectedItem !==undefined? selectedItem.imageURL: '' "
              :lazy-src="selectedItem!==undefined?selectedItem.imageURL_Lazy : '' "
              ></v-img>
            </v-container>
        </v-card>
    </v-dialog>


    <v-dialog 
          v-model="myUploadPictureDialog"
          :max-width="myUploadPictureDialogOptions.width"
          :style="{ zIndex: myConfirmDialogOptions.zIndex }"
          @keydown.esc="closeWindow"
    >
      <v-card>
        <v-toolbar dark :color="myUploadPictureDialogOptions.color" dense flat>
          <v-toolbar-title class="text-body-2 font-weight-bold grey--text">
            {{ myUploadPictureDialogOptions.title }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn
          icon
          color="grey"
          @click="myUploadPictureDialog = !myUploadPictureDialog"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-container>

             <v-row>
                <v-col>
                  <my-upload-image @successMessage="succesMessageUploadImage">
                    
                  </my-upload-image>
                </v-col>
            </v-row>
        </v-container>

        <v-card-actions>
          <v-spacer></v-spacer>
          <!-- <v-btn color="blue darken-1" outlined text @click="closeDelete">Cancel</v-btn> -->
          <!-- <v-btn color="blue darken-1" outlined text @click="deleteItemConfirm">OK</v-btn> -->
        </v-card-actions>
      </v-card>
    </v-dialog>


  </v-container>


  
</template>

<script>
import MyUploadImage from '@/components/MyUploadImage.vue'
import axios from 'axios'
export default {
    components: { 
      MyUploadImage
    },
    props: {
      parentItem: undefined
    },
    data: () => ({
      btnIcons: ['mdi-play', 'mdi-delete'],

      myShowPictureDialog: false,
      myConfirmDialog: false,
      myConfirmDialogOptions: {
        title: 'Konfirmasi Hapus',
        color: "grey lighten-3",
        width: 400,
        zIndex: 200,
        noconfirm: false,
      },
      myUploadPictureDialog: false,
      myUploadPictureDialogOptions: {
        title: 'Upload Picture',
        color: "grey lighten-3",
        width: 800,
        zIndex: 200,
        noconfirm: false,
      },
      headerItems: [
        {
          title: 'New Releases',
          text: `It's New Release Friday`,
          subtext: 'Newly released songs. Updated daily.',
          img: 'https://images.unsplash.com/photo-1429514513361-8fa32282fd5f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3264&q=80',
        },
      ],
      transparent: 'rgba(255, 255, 255, 0)',

      selectedItemIndex: -1,
      selectedItem: undefined,

    }),
    watch: {
      parentItem(val){
        if (val !== undefined){
          this.retrieveImages(val)
        }
      }
      
    },
    methods: {
      retrieveImages(){
        // console.log(val.id)
        // console.log(`masuk sini: ${val.id}`)
        axios
          .get(`${this.$store.getters.getApiBaseUrl}/getAllFKegiatanFileByParent/${this.parentItem.id}`)
          .then( response => {
              let arr = [];
              response.data.filter(x => x.fileType==='IMAGE' && x.kegiatanType===1).forEach(element => {
                  element.imageURL = `${this.$store.getters.getApiBaseUrl}/files_image_low/${element.fileName}`
                  element.imageURL_Lazy = `${this.$store.getters.getApiBaseUrl}/files_image_verylow/${element.fileName}`                
                  
                  element.text = element.description
                  element.subtext = element.created
                  arr.push(element)
                  // console.log(element.imageURL)
              });  

              this.headerItems = arr

              // console.log(response)
            
          })
          .catch( error => {
            console.log(error)
          })

      },
      clickBtn(item, icon){
        console.log(`${item.title} and ${icon}`)
        if (icon ==="mdi-delete"){
          this.deleteItem(item)
        }else {
          this.showPicture(item)
        }
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
                .delete(`${this.$store.getters.getApiBaseUrl}/deleteimage/${deletedItem.fileName}`)
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
      showPicture(item){
        this.selectedItem = item
        this.myShowPictureDialog = true
        console.log(item)
      },
      showUploadPictureDialog(){
        // console.log("Hello saya ditekan")
        this.myUploadPictureDialog = true
      },
      succesMessageUploadImage: function(val){
        if (val !== undefined){
          //Doing something
          // console.log(val)

          if (val.message.includes(".jpg")){

            const requestData = {
              id: 0,
              fileName: `${val.message}`,
              description: `${val.description}`,
              fileType: 'IMAGE',
              fkegiatanBean: this.parentItem.id,
              kegiatanType: 1,
              flag: true,            
            }

            axios ({
              method: 'post',
              url: `${this.$store.getters.getApiBaseUrl}/createFKegiatanFile`,
              data: requestData
            })
            .then( response => {              
              
              this.retrieveImages()                      
              console.log(`${response.data}`)

            }).catch(error => {console.log(error)})
          }

        }
      }

    },
    mounted() {
      /**
       * Tidak bisa dilihat disini karena ada alasan: Ada Jeda waktu narik data gambar
       */
      //  if (this.paretItem !==null){
      //   this.retrieveImages()
      // }
    }

  }
</script>

<style scoped>
.v-card {
  transition: opacity .4s ease-in-out;
}

/* .v-card:not(.on-hover) {
  opacity: 0.9;
 } */
.card-image-not-hover:not(.on-hover) {
  opacity: 0.85;
 }

.show-btns {
  /* color: rgba(255, 255, 255, 1) !important; */
  color: blue !important;
}

.cardTransparantColor {
   background-color: rgba(255, 255, 255, 0.5) !important;
   border-color: white !important;
 }
</style>