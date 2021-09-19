<template>
  <nav>
    <!-- <v-toolbar flat app > -->
    <v-toolbar app >
      <!-- <v-toolbar-side-icon @click="drawer = !drawer" class="grey--text"></v-toolbar-side-icon> -->
      <v-app-bar-nav-icon @click="drawer = !drawer" class="grey--text"></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase grey--text">
        <span class="font-weight-light">SMART</span>
        <span>EJAKON</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <!-- dropdown menu -->
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

      <v-btn plain color="grey">
        <span>Keluar</span>
        <v-icon right>mdi-exit-run</v-icon>
      </v-btn>
    </v-toolbar>

 
    <!-- <v-navigation-drawer permanent app dark color="indigo"
     src="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
     expand-on-hover
     >      -->
     <v-navigation-drawer app v-model="drawer" color="#FBA80B">

      <v-layout column align-center>
        <v-flex class="mt-5">
          <!-- <v-avatar size="100">
            <img class="text-lg-center" src="/avatar-1.png">
          </v-avatar> -->
            <!-- <img class="text-lg-center" src="/img/icons/header_login.png"> -->
            <v-img
              lazy-src="/img/header_login.png"
              max-height="36"
              max-width="250"
              src="/img/header_login.png"
            ></v-img>
          <!-- <p class="white--text subheading mt-1">Smart Ejakon</p> -->

        </v-flex>
        <v-flex class="mt-4 mb-3">
          <Popup />
        </v-flex>
      </v-layout>

     <v-divider></v-divider>

      <!-- <v-list>
        <v-list-tile v-for="link in links" :key="link.text" router :to="link.route">
          <v-list-tile-action>
            <v-icon class="white--text">{{ link.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="white--text">{{ link.text }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list> -->

      <v-list
        dense
        nav
      >      
        <!-- <v-list-item
          v-for="item in links"
          :key="item.title"
          link
          route :to="item.route"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item> -->


      </v-list>


    <v-list shaped>
      <v-list-item>        
        <v-list-item-icon>
          <v-icon>mdi-home</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Home</v-list-item-title>
      </v-list-item>

      <v-list-group
        :value="false"
        prepend-icon="mdi-account-circle"
      >
        <template v-slot:activator>
          <v-list-item-title>Kegiatan</v-list-item-title>
        </template>

        <v-list-group
          :value="true"
          no-action
          sub-group
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Penerimaan</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="([title, icon, route], i) in keg_penerimaans"
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

        <v-list-group
          no-action
          sub-group
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Team</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="([title, icon, route], i) in keg_teams"
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




      <v-list-group
        :value="false"
        prepend-icon="mdi-account-circle"
      >
        <template v-slot:activator>
          <v-list-item-title>Monitoring</v-list-item-title>
        </template>

        <v-list-group
          :value="false"
          no-action
          sub-group
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>PPHP</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="([title, icon, route], i) in monitoring_pphps"
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

        <v-list-group
          no-action
          sub-group
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>PHO</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="([title, icon, route], i) in monitoring_phos"
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

        <v-list-group
          no-action
          sub-group
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>FHO</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="([title, icon, route], i) in monitoring_fhos"
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

      keg_penerimaans: [
        ['1. Kegiatan', 'mdi-account-multiple-outline', "/keg_penerimaan_kegiatan"],
        ['2. Pendaftar', 'mdi-account-multiple-outline', "/keg_penerimaan_pendaftar"],
        ['3. Pelaksana', 'mdi-account-multiple-outline', "/keg_penerimaan_pelaksana"],
      ],
    
      keg_teams: [
        ['PPHP', 'mdi-account-multiple-outline',"/AdminsAsosiasi"],
        ['PHO', 'mdi-account-multiple-outline',"/xxx"],
        ['FHO', 'mdi-account-multiple-outline',"/xxx"],
      ],

      monitoring_pphps: [
        ['Survey', 'mdi-account-multiple-outline',"/xxx"],
        ['Report', 'mdi-account-multiple-outline',"/xxx"],
      ],
      monitoring_phos: [
        ['Survey', 'mdi-account-multiple-outline',"/xxx"],
        ['Laporan', 'mdi-account-multiple-outline',"/xxx"],
      ],
      monitoring_fhos: [
        ['Survey', 'mdi-account-multiple-outline',"/xxx"],
        ['Laporan', 'mdi-account-multiple-outline',"/xxx"],
      ],

      admins: [
        ['Pengguna', 'mdi-account-multiple-outline',"/xxx"],
        ['Laporan', 'mdi-cog-outline',"/xxx"],
      ],
      kegiatans: [
        ['Asosiasi', 'mdi-plus-outline', "/AdminsAsosiasi"],
        ['CV-PT', 'mdi-file-outline',"/AdminsCvPt"],
        ['Pegawai', 'mdi-update',"/xxx"],
      ],
      public_expose: [
        ['Badan Usaha', 'mdi-plus-outline',"/xxx"],
        ['Daftar Upah', 'mdi-file-outline',"/xxx"],
        ['Informasi Pasar', 'mdi-update',"/xxx"],
        ['IUJK', 'mdi-delete',"/xxx"],
      ],


      keuangans: [
        {
          action: 'mdi-silverware-fork-knife',
          active: false,
          items: [
            { title: 'Termin', route: '/projects', icon: 'mdi-file-outline' },
            { title: 'Laporan', route: '/about', icon: 'mdi-file-outline'   },
          ],
          title: 'Keuangan'
        }
      ],

    }
  }
}
</script>

<style>
 .navbar.side_drawer{
    color:  #3CD1C2;
  }

</style>
