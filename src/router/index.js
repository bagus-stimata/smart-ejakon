import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Projects from '../views/Projects.vue'
import Team from '../views/Team.vue'

// import store from '@/router/index.js'; // <-- aliased path

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Dashboard',
        component: Dashboard,

        // beforeEnter: (to, from, next) => {
        //     console.log(`Masuk Foot` + to.name + from.name, next.next) 
        // }

    },
    {
        path: '/login',
        name: 'Login',
        component: () =>
            import ('../views/Login.vue')
    },

    {
        path: '/ProgresKegiatan',
        name: 'ProgresKegiatan',
        component: () =>
            import ('../views/progreskegiatan/ProgresKegiatan.vue')
    },
    {
        path: '/ProgresKegiatanDetil',
        name: 'ProgresKegiatanDetil',
        component: () =>
            import ('../views/progreskegiatan/ProgresKegiatanDetil.vue')
    },
    {
        path: '/ProgresTerminDetil',
        name: 'ProgresTerminDetil',
        component: () =>
            import ('../views/progreskegiatan/ProgresTerminDetil.vue')
    },


    {
        path: '/projects',
        name: 'projects',
        component: Projects
    },
    {
        path: '/team',
        name: 'team',
        component: Team
    },
    {
        path: '/EmployeeRegistration',
        name: 'EmployeeRegistration',
        component: () =>
            import ('../views/admins/EmployeeRegistration.vue')
    },

    {
        path: '/Kegiatan',
        name: 'Kegiatan',
        component: () =>
            import ('../views/kegiatan/Kegiatan.vue')
    },
    {
        path: '/Kegiatan/:id/:name',
        name: 'KegiatanEdit',
        component: () =>
            import ('../views/kegiatan/KegiatanEdit.vue')
    },
    {
        path: '/KegiatanCreate',
        name: 'KegiatanCreate',
        component: () =>
            import ('../views/kegiatan/KegiatanCreate.vue')
    },


    {
        path: '/PengawasanPho',
        name: 'PengawasanPho',
        component: () =>
            import ('../views/pengawasan/PengawasanPho.vue')
    },
    {
        path: '/PengawasanPho/:id/:name',
        name: 'PengawasanPhoEdit',
        component: () =>
            import ('../views/pengawasan/PengawasanPhoEdit.vue')
    },
    {
        path: '/PengawasanFho',
        name: 'PengawasanFho',
        component: () =>
            import ('../views/pengawasan/PengawasanFho.vue')
    },
    {
        path: '/PengawasanFho/:id/:name',
        name: 'PengawasanFhoEdit',
        component: () =>
            import ('../views/pengawasan/PengawasanFhoEdit.vue')
    },
    {
        path: '/PengawasanFisik',
        name: 'PengawasanFisik',
        component: () =>
            import ('../views/pengawasan/PengawasanFisik.vue')
    },
    {
        path: '/PengawasanFisik/:id/:name',
        name: 'PengawasanFisikEdit',
        component: () =>
            import ('../views/pengawasan/PengawasanFisikEdit.vue')
    },
    {
        path: '/PengawasanPenyerahan',
        name: 'PengawasanPenyerahan',
        component: () =>
            import ('../views/pengawasan/PengawasanPenyerahan.vue')
    },
    {
        path: '/PengawasanPenyerahan/:id/:name',
        name: 'PengawasanPenyerahanEdit',
        component: () =>
            import ('../views/pengawasan/PengawasanPenyerahanEdit.vue')
    },


    {
        path: '/KeuanganTermin',
        name: 'KeuanganTermin',
        component: () =>
            import ('../views/keuangan/Termin.vue')
    },
    {
        path: '/KeuanganTermin/:id/:name',
        name: 'KeuanganTerminEdit',
        component: () =>
            import ('../views/keuangan/TerminEdit.vue')
    },
    {
        path: '/KeuanganLaporan',
        name: 'KeuanganLaporan',
        component: () =>
            import ('../views/keuangan/Termin.vue')
    },

    {
        path: '/ExposeBerita',
        name: 'ExposeBerita',
        component: () =>
            import ('../views/beritaagenda/ExposeBerita.vue')
    },

    {
        path: '/AdminsCompany',
        name: 'Company',
        component: () =>
            import ('../views/admins/Company.vue')
    },
    {
        path: '/AdminsDivision',
        name: 'Division',
        component: () =>
            import ('../views/admins/Division.vue')
    },


    {
        path: '/AdminsAsosiasi',
        name: 'Asosiasi',
        component: () =>
            import ('../views/admins/Asosiasi.vue')
    },
    {
        path: '/AdminsCvPt',
        name: 'CvPt',
        component: () =>
            import ('../views/admins/CvPt.vue')
    },
    {
        path: '/AdminsPegawai',
        name: 'Pegawai',
        component: () =>
            import ('../views/admins/Pegawai.vue')
    },
    {
        path: '/AdminsPegawai/:id/:name',
        name: 'PegawaiEdit',
        component: () =>
            import ('../views/admins/PegawaiEdit.vue')
    },
    {
        path: '/AdminsPegawaiCreate',
        name: 'PegawaiCreate',
        component: () =>
            import ('../views/admins/PegawaiCreate.vue')
    },

    {
        path: '/AdminsDaftarUpah',
        name: 'DaftarUpah',
        component: () =>
            import ('../views/admins/DaftarUpah.vue')
    },
    {
        path: '/AdminsIujk',
        name: 'Iujk',
        component: () =>
            import ('../views/admins/Iujk.vue')
    },


]

const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    const isAuthenticated = JSON.parse(localStorage.getItem("authenticated"))

    // const isAuthenticated = this.$store.state.isAuthenticated
    // console.log(store.getters['getIsAuthenticated'])
    // const isAuthenticated = store.getters['isAuthenticated'];

    if (to.name !== "Login" & !isAuthenticated) next({ name: "Login" })
    if (to.name === "Login" & isAuthenticated) next({ name: "Home" })
    else next()

    // console.log(to.name + from.name + next() )
})

export default router