<template>
  <nav>
    <v-toolbar>
      <v-app-bar-nav-icon @click="drawer = !drawer" class="grey--text"></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase grey--text">
        <span class="font-weight-light">SMART</span>
        <span>EJAKON</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            plain
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-unfold-more-horizontal</v-icon>
            <span>Menu</span>
          </v-btn>
        </template>
        <v-list color="grey lighten-4" outlined rounded> 
          <v-list-item
            v-for="link in top_menus" :key="link.title" route :to="link.route"
          >
            <span>{{link.title}}</span>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-btn plain color="grey" @click="signOut">
        <span>Sign Out</span>
        <v-icon right>mdi-exit-run</v-icon>
      </v-btn>
    </v-toolbar>

 

     <v-navigation-drawer app class="bottom-gradient" v-model="drawer" >
     <!-- <v-navigation-drawer app v-model="drawer" color="#FBA80B"  gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"> -->
      <v-layout column align-center>
        <v-flex class="mt-5">
            <v-img
              lazy-src="/img/header_login.png"
              max-height="36"
              max-width="250"
              src="/img/header_login.png"
            ></v-img>

        </v-flex>
        <v-flex class="mt-4 mb-3">
          <Popup />
        </v-flex>
      </v-layout>

     <v-divider></v-divider>

    <v-list shaped>
      <v-list-item route to='/'>        
        <v-list-item-icon>
          <v-icon>mdi-home</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Home</v-list-item-title>
      </v-list-item>

      <v-list-item route to='/Kegiatan'>        
        <v-list-item-icon>
          <v-icon>mdi-robot-industrial</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Kegiatan</v-list-item-title>
      </v-list-item>


      <v-list-group
        v-for="item in pengawasans"
        :key="item.title"
        v-model="item.active"
        :prepend-icon="item.action"
        no-action
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="child in item.items"
          :key="child.title"
          link
          router :to="child.route"
        >
          <v-list-item-content>
            <v-list-item-title v-text="child.title"></v-list-item-title>
          </v-list-item-content>
          <v-list-item-icon>
            <v-icon >{{ child.icon }}</v-icon>
          </v-list-item-icon>

        </v-list-item>
      </v-list-group>

      <v-list-group
        v-for="item in keuangans"
        :key="item.title"
        v-model="item.active"
        :prepend-icon="item.action"
        no-action
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="child in item.items"
          :key="child.title"
          link
          router :to="child.route"
        >
          <v-list-item-content>
            <v-list-item-title v-text="child.title"></v-list-item-title>
          </v-list-item-content>
          <v-list-item-icon>
            <v-icon >{{ child.icon }}</v-icon>
          </v-list-item-icon>

        </v-list-item>
      </v-list-group>




      <v-list-item route to='/ProgresKegiatan'>        
        <v-list-item-icon>
          <v-icon>mdi-chart-bar</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Progres Keg</v-list-item-title>
      </v-list-item>




      <v-list-group
        v-for="item in berita_agenda"
        :key="item.title"
        v-model="item.active"
        :prepend-icon="item.action"
        no-action
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="child in item.items"
          :key="child.title"
          link
          router :to="child.route"
        >
          <v-list-item-content>
            <v-list-item-title v-text="child.title"></v-list-item-title>
          </v-list-item-content>
          <v-list-item-icon>
            <v-icon >{{ child.icon }}</v-icon>
          </v-list-item-icon>

        </v-list-item>
      </v-list-group>




      <v-list-group
        :value="false"
        prepend-icon="mdi-account-circle"
      >
        <template v-slot:activator>
          <v-list-item-title>Admin</v-list-item-title>
        </template>

        <v-list-group
          :value="false"
          no-action
          sub-group
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Sistem</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="([title, icon, route], i) in admins"
            :key="i"
            link
            router :to="route"
          >
            <v-list-item-subtitle v-text="title"></v-list-item-subtitle>

            <v-list-item-icon>
              <v-icon v-text="icon"></v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>


        <v-list-group
          :value="false"
          no-action
          sub-group
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Struktur Organisasi</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="([title, icon, route], i) in struktur_org"
            :key="i"
            link
            router :to="route"
          >
            <v-list-item-subtitle v-text="title"></v-list-item-subtitle>

            <v-list-item-icon>
              <v-icon v-text="icon"></v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>


        <v-list-group
          :value="false"
          no-action
          sub-group
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Proyek Kegiatan</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="([title, icon, route], i) in kegiatans"
            :key="i"
            link
            router :to="route"
          >
            <v-list-item-subtitle v-text="title"></v-list-item-subtitle>

            <v-list-item-icon>
              <v-icon v-text="icon"></v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>


        <v-list-group
          :value="false"
          no-action
          sub-group
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Expose Public</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="([title, icon, route], i) in public_expose"
            :key="i"
            link
            router :to="route"
          >
            <v-list-item-subtitle v-text="title"></v-list-item-subtitle>

            <v-list-item-icon>
              <v-icon v-text="icon" v-if="sub_menu_icon_show"></v-icon>
            </v-list-item-icon>
            
          </v-list-item>
        </v-list-group>


      </v-list-group>


    </v-list>

      <v-layout column align-center>
        <v-btn icon href="http://ejakon.kotawaringinbaratkab.go.id/berita" target="_blank">
          <!-- <v-icon>window</v-icon> Link Text -->

                <v-flex class="mt-5" >

                      <v-img
                        lazy-src="/img/link_ejakon_lama.png"
                        max-height="36"
                        max-width="250"
                        src="/img/link_ejakon_lama.png"
                      ></v-img>

                  </v-flex>
              <v-flex class="mt-4 mb-3">
              <Popup />
            </v-flex>

        </v-btn>
      </v-layout>



    </v-navigation-drawer>

 
  </nav>
</template>

<script>
import Popup from './Popup'

export default {
  components: { Popup },
  data() {
    return {
      sub_menu_icon_show: false,
      drawer: false,

      top_menus: [
        { icon: 'mdi-view-dashboard', title: 'Dashboard', route: '/' },
        { icon: 'mdi-help-box', title: 'Ganti Profile', route: '/ganti_profile' },
      ],
      links: [
        { icon: 'mdi-view-dashboard', title: 'Dashboard', route: '/' },
        { icon: 'mdi-view-dashboard', title: 'Kegiatan', route: '/projects' },
        { icon: 'mdi-view-dashboard', title: 'Kegiatan', route: '/projects' },
        { icon: 'mdi-help-box', title: 'Team', route: '/team' },
      ],

      admins: [
        ['Pengguna', 'mdi-account-multiple-outline',"/xxx"],
        ['Laporan', 'mdi-cog-outline',"/xxx"],
      ],
      struktur_org: [
        ['Dinas/Badan', 'mdi-plus-outline', "/AdminsCompany"],
        ['Bidang', 'mdi-plus-outline', "/AdminsDivision"],
      ],
      kegiatans: [
        ['Asosiasi', 'mdi-plus-outline', "/AdminsAsosiasi"],
        ['CV-PT', 'mdi-file-outline',"/AdminsCvPt"],
        ['Pegawai', 'mdi-update',"/AdminsPegawai"],
      ],
      public_expose: [
        ['Badan Usaha', 'mdi-plus-outline',"/AdminsCvPt"],
        ['Daftar Upah', 'mdi-file-outline',"/AdminsDaftarUpah"],
        ['Informasi Pasar', 'mdi-update',"/AdminsInformasiPasar"],
        ['IUJK', 'mdi-delete',"/AdminsIujk"],
      ],

      pengawasans: [
        {
          action: 'mdi-cctv',
          active: false,
          items: [
            { title: 'PHO', route: '/PengawasanPho', icon: '' },
            { title: 'FHO', route: '/PengawasanFho', icon: ''   },
            { title: 'Kemajuan Fisik', route: '/PengawasanFisik', icon: ''   },
            { title: 'Penyerahan', route: '/PengawasanPenyerahan', icon: ''   },
          ],
          title: 'Pegawasan'
        }
      ],
      keuangans: [
        {
          action: 'mdi-cash',
          active: false,
          items: [
            { title: 'Termin', route: '/KeuanganTermin', icon: 'mdi-file-outline' },
            { title: 'Laporan', route: '/KeuanganLaporan', icon: 'mdi-file-outline'   },
          ],
          title: 'Keuangan'
        }
      ],

      berita_agenda: [
        {
          action: 'mdi-rss',
          active: false,
          items: [
            { title: 'Daftar Berita', route: '/ExposeBerita', icon: 'mdi-rss' },
          ],
          title: 'Berita & Agenda'
        }
      ],



    }
  },
  methods: {
    signOut() {
        localStorage.setItem("authenticated", false)
        this.$store.commit("setAuthenticatedFalse")
        this.$router.push( { name: "Login"})
    },
  }

}
</script>


<style scoped>
 .navbar.side_drawer{
    color:  #3CD1C2;
  }

  .bottom-gradient {
    background-image: linear-gradient(to top right, #FBA80B 10%, transparent 90%);
  }

  .repeating-gradient {
    background-image: repeating-linear-gradient(-45deg,
                        rgba(255,0,0,.25),
                        rgba(255,0,0,.25) 5px,
                        rgba(0,0,255,.25) 5px,
                        rgba(0,0,255,.25) 10px
                      );
  }
</style>