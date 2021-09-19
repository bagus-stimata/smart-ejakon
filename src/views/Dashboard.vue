<template>
  <div class="dashboard">
   
  <div class="home">
   
    <v-flex class="mt-2">
      <v-img
        lazy-src="/img/header_login.png"
        max-height="64"
        max-width="400"
        src="/img/header_login.png"
      ></v-img>
    </v-flex>

    <v-carousel
      continuous="true"
      cycle="true"
      show-arrows-on-hover      
    >
      <v-carousel-item
        v-for="(item,i) in items"
        :key="i"
        :src="item.src"
        reverse-transition="fade-transition"
        transition="fade-transition"
      ></v-carousel-item>
    </v-carousel>


    
    <!-- <v-carousel
        cycle
        height="400"
        hide-delimiter-background
        show-arrows-on-hover
      >
        <v-carousel-item
          v-for="(slide, i) in slides"
          :key="i"
        >
          <v-sheet
            :color="colors[i]"
            height="100%"
          >
            <v-row
              class="fill-height"
              align="center"
              justify="center"
            >
              <div class="text-h2">
                {{ slide }} Slide
              </div>
            </v-row>
          </v-sheet>
        </v-carousel-item>
      </v-carousel> -->


    <h1 class="ml-16 mt-4">Berita dan Agenda</h1>
    <v-container class="mt-2">



<v-divider class="mt-2"></v-divider>

<v-row>
  <v-col>

    <v-card
      :loading="loading"
      class="mx-auto my-12"
      max-width="374"
    >
      <template slot="progress">
        <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>

      <v-img
        height="250"
        src="dashboard-1.jpeg"
      ></v-img>
        <!-- src="https://cdn.vuetifyjs.com/images/cards/cooking.png" -->

      <v-card-title>Sosialisasi Peraturan Menteri</v-card-title>

      <v-card-text>
        <v-row
          align="center"
          class="mx-0"
        >
          <v-rating
            :value="4.5"
            color="amber"
            dense
            half-increments
            readonly
            size="14"
          ></v-rating>

          <div class="grey--text ms-4">
            4.5 (413)
          </div>
        </v-row>

        <div class="my-4 text-subtitle-1">
          Dr. Juni Gultom, ST., MTP dan
          Dr. Ir. Syarif Burhanuddin M. Eng., IPU.
        </div>

        <div>Sosialisasi peraturan menteri pada Dinas PUPR Kotawaringin Barat yang mendatangkan</div>
      </v-card-text>


    </v-card>


  </v-col>

  <v-col>

    <v-card
      :loading="loading"
      class="mx-auto my-12"
      max-width="374"
    >
      <template slot="progress">
        <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>

      <v-img
        height="250"
        src="dashboard-3.jpeg"
      ></v-img>
        <!-- src="https://cdn.vuetifyjs.com/images/cards/cooking.png" -->

      <v-card-title>Pelatihan dan Uji Sertifikasi Tukang Pangkalan Lada</v-card-title>

      <v-card-text>
        <v-row
          align="center"
          class="mx-0"
        >
          <v-rating
            :value="4.5"
            color="amber"
            dense
            half-increments
            readonly
            size="14"
          ></v-rating>

          <div class="grey--text ms-4">
            4.5 (413)
          </div>
        </v-row>

        <div class="my-4 text-subtitle-1">
          Bidang Konstruksi
        </div>

        <div>Pelatihan dan Uji Sertifikasi Tukang Pangkalan Lada pada Dinas PUPR Kotawaringin Barat yang mendatangkan</div>
      </v-card-text>


    </v-card>

  </v-col>



  <v-col>

    <v-card
      :loading="loading"
      class="mx-auto my-12"
      max-width="374"
    >
      <template slot="progress">
        <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>

      <v-img
        height="250"
        src="dashboard-4.jpeg"
      ></v-img>
        <!-- src="https://cdn.vuetifyjs.com/images/cards/cooking.png" -->

      <v-card-title>Sosialisasi Permen PUPR RI Nomor-9 Tentang Pembentukan Lembaga Pengembangan Jasa Konstruksi LPJK</v-card-title>

      <v-card-text>
        <v-row
          align="center"
          class="mx-0"
        >
          <v-rating
            :value="4.5"
            color="amber"
            dense
            half-increments
            readonly
            size="14"
          ></v-rating>

          <div class="grey--text ms-4">
            4.5 (413)
          </div>
        </v-row>

        <div class="my-4 text-subtitle-1">
          Bidang Konstruksi
        </div>

        <div>
          Sosialisasi Permen PUPR RI Nomor-9 Tentang Pembentukan Lembaga 
          Pengembangan Jasa Konstruksi LPJK, pada lingkungan Dinas PUPR Kotawaringin Barat 
          Kalimantan Tengah
        </div>
      </v-card-text>


    </v-card>

  </v-col>


  <v-col>

    <v-card
      :loading="loading"
      class="mx-auto my-12"
      max-width="374"
    >
      <template slot="progress">
        <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>

      <v-img
        height="250"
        src="dashboard-5.jpeg"
      ></v-img>
        <!-- src="https://cdn.vuetifyjs.com/images/cards/cooking.png" -->

      <v-card-title>
      </v-card-title>

      <v-card-text>
        <v-row
          align="center"
          class="mx-0"
        >
          <v-rating
            :value="4.5"
            color="amber"
            dense
            half-increments
            readonly
            size="14"
          ></v-rating>

          <div class="grey--text ms-4">
            4.5 (413)
          </div>
        </v-row>

        <div class="my-4 text-subtitle-1">
          Bidang Konstruksi
        </div>

        <div>
        Sosialisasi Peraturan Pemerintah No 14 Tahun 2021 Tentang Perubahan atas Peraturan Pemerintah No. 22 Tahun 2020 tentang peraturan pelaksanaan undang-undang nomo 2 tahun 2017 Tentang Jasa Konstruksi
        </div>
      </v-card-text>


    </v-card>

  </v-col>


</v-row>



    </v-container>
  </div>


  </div>
</template>

<script>
  export default {
    data () {
      return {
        items: [
          {
            src: '../corousel/corousel-1.jpeg',
          },
          {
            src: '../corousel/corousel-3.jpeg',
          },
          {
            src: '../corousel/corousel-2.jpeg',
          },
          {
            src: '../corousel/corousel-5.jpeg',
          },
          {
            src: '../corousel/corousel-4.jpeg',
          },
        ],
      }
    },


  }
</script>

<style>

  .project.complete{
    border-left: 4px solid #3CD1C2;
  }
  .project.ongoing{
    border-left: 4px solid orange
  }
  .project.overdue{
    border-left: 4px solid tomato;
  }


  .chip.complete{
    background: #3CD1C2;
  }
  .chip.ongoing{
    background:  orange
  }
  .chip.overdue{
    background:  tomato;
    color:  tomato;
  }
  .v-chip.overdue{
    background:  tomato;
    color:  tomato;
  }


</style>
