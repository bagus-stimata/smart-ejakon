
<template>
<div>
  <v-card class="mt-4" 
  >
    <v-card-title> {{ formTitle }}</v-card-title>
    <v-card-subtitle> {{ formSubTitle }} </v-card-subtitle>

  
    <!-- <v-tabs
      v-model="myTabs"
    >
      <v-tab
        v-for="item in items"
        :key="item.tab"
      >
        {{ item.tab }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="myTabs">
      <v-tab-item
        v-for="item in items"
        :key="item.tab"
      >
        <v-card flat>
          <v-card-text>{{ item.content }}</v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
 -->
    <v-tabs 
      v-model="myTabs2"
      right
      >
        <v-tab key="Multimedia">Multimedia</v-tab>
        <v-tab key="Dokumen">Dokumen</v-tab>
        <v-tab key="Info">Info</v-tab>
    </v-tabs>

    <v-tabs-items v-model="myTabs2">
      <v-tab-item key="Multimedia">
        <PengawasanFisikGallery ref="refGalleryComponent" :parentItem="editedItem">

        </PengawasanFisikGallery>
      </v-tab-item>
      <v-tab-item key="Dokumen">
        <PengawasanFisikDocument ref="refDocumentComponent" :parentItem="editedItem">

        </PengawasanFisikDocument>
      </v-tab-item>
      <v-tab-item key="Info">
        <PengawasanPhoInfo :parentItem ="editedItem">
            <template v-slot:default="{ data }">
              <span>{{ data }}</span>
            </template>
        </PengawasanPhoInfo>
      </v-tab-item>
    </v-tabs-items >

    <v-card-actions>

      <v-bottom-navigation
      
        v-model="value"
        :background-color="color"
        dark
        shift    
      >
        <v-btn v-if="myTabs2===0" @click="showUploadPictureDialog">
          <span>Multimedia</span>

          <v-icon>mdi-television-play</v-icon>
        </v-btn>
        <v-btn v-if="myTabs2===1" @click="showUploadDocumentDialog">
          <span>Dokument</span>

          <v-icon>mdi-upload</v-icon>
        </v-btn>

      </v-bottom-navigation>
    
    </v-card-actions>

  </v-card> 




</div>
</template>

<script>
import PengawasanFisikGallery from './PengawasanFisikGallery'
import PengawasanFisikDocument from './PengawasanFisikDocument'
import PengawasanPhoInfo from './PengawasanPhoInfo'
import axios from 'axios'
export default {
  components: {
    PengawasanFisikGallery,
    PengawasanFisikDocument,
    PengawasanPhoInfo },
    props: {
      edit: {
        type: Boolean,
        default: false
      }
    },
    data() {
        return {
            formTitle: 'title',
            formSubTitle: 'subtitle',
            value: 1,

            editedItem: null,
            itemsFDivision: null,

            myTabs: null,
            myTabs2: null,
            items: [
                { tab: 'One', content: 'Tab 1 Content' },
                { tab: 'Two', content: 'Tab 2 Content' },
              ],


        }
    },
    methods: {
      lookupFDivision(fdivisionBean){
          const arrValue = this.itemsFDivision.filter(x => x.id === fdivisionBean)
          if (arrValue.length >0) {
            return arrValue[0].description
          }else {
            return "-"
          }
      },
      showUploadPictureDialog(){
        // console.log("Bismillah")
        this.$refs.refGalleryComponent.showUploadPictureDialog()
      },
      showUploadDocumentDialog(){
        this.$refs.refDocumentComponent.showUploadDocumentDialog()
        console.log("Hello PengawasanPHO")
      }

    },
    computed: {
      color () {
        switch (this.value) {
          case 0: return 'blue-grey'
          case 1: return 'teal'
          case 2: return 'brown'
          case 3: return 'indigo'
          default: return 'blue-grey'
        }
      },
    },
    watch: {
      // myTabs2(val) {
      //   console.log(val)
      // }
    },
    mounted() {
        if (this.edit){
          axios
              .get(`${this.$store.getters.getApiBaseUrl}/getAllFDivision`)
              .then( response => {
                  this.itemsFDivision = response.data
                  // console.log(this.itemsFDivision)

                  const id = this.$route.params.id
                  axios
                    .get(`${this.$store.getters.getApiBaseUrl}/getFKegiatanById/${id}`)
                      .then(  response => {
                          this.editedItem = response.data
                          this.formTitle = this.editedItem.namaPekerjaan
                          this.formSubTitle = `${ this.lookupFDivision(this.editedItem.fdivisionBean)}, ${this.editedItem.tahun}`

                          console.log(this.lookupFDivision(this.editedItem.fdivisionBean))
                      })
                      .catch( console => {
                        console.log(console.error())
                      })

              })
              .catch( error => {
                  console.log(error)
              })


        }
    }

}
</script>