<template>

    <v-form v-model="valid">
        <v-container v-if="editedItem">
            <v-card>                
                <v-toolbar
                color="cyan"
                src="https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg"
                dark
                flat
                >
                <v-app-bar-nav-icon></v-app-bar-nav-icon>

                <v-toolbar-title>{{ editedItem.namaPekerjaan}}</v-toolbar-title>

                <v-spacer></v-spacer>

                <v-btn icon>
                    <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>

                <template v-slot:extension>
                    <v-tabs
                    v-model="tab"
                    align-with-title
                    >
                    <v-tabs-slider color="yellow"></v-tabs-slider>

                    <v-tab
                        v-for="item in items"
                        :key="item"
                    >
                        {{ item }}
                    </v-tab>
                    </v-tabs>
                </template>
                </v-toolbar>

                <v-tabs-items v-model="tab">
                <v-tab-item
                    v-for="item in items"
                    :key="item"
                >
                    <v-card flat>
                        <v-card-text>
                            <v-container v-if="edit">
                                <v-row >
                                   <KegiatanDetailForm :tabTitle="item" edit/>
                                </v-row>
                            </v-container>
                            <v-container v-if="create">
                                <v-row >
                                   <KegiatanDetailForm :tabTitle="item" create/>
                                </v-row>
                            </v-container>

                        </v-card-text>

                    </v-card>
                </v-tab-item>
                </v-tabs-items>

            </v-card>
              
        </v-container>
    </v-form>



</template>

<script>
import axios from 'axios'
import KegiatanDetailForm from '@/components/kegiatan/KegiatanDetailForm.vue'
export default {
    components: {
      KegiatanDetailForm
    },
    props: {
        tabTitle:  {
            type: String,
            default: ''
        },
        create: {
            type: Boolean,
            default: false
        },
        edit: {
            type: Boolean,
            default: false
        }
    },
    
    data() {
        return {
            tab: null,
            items: [
            'kegiatan', 'pelaksana', 'team pho & fho'
            ],

            editedItem: null,
            dialog: false,
        }
    },

    computed:{
        success(){
            return this.isOperationSuccess
        }
    },
    methods: {
       
        lookupFDivision (fdivisionBean) {
            const str = this.itemsFDivision.filter(x => x.id==fdivisionBean)
            if (str.length>0){
            return str[0].description
            }else {
            return '-'
            }
        },
       
    
    },
    created() {

        if(this.edit){
            const id = this.$route.params.id
            axios
                .get(`${this.$store.getters.getApiBaseUrl}/getFKegiatanById/${id}`)
                .then( response => {
                    this.editedItem =  response.data                    // console.log(`Edit ${id} >> ${response.data} >> ${this.editedItem.namaPekerjaan}`)
                })
                .catch(error => console.log(error))
        }
        if (this.create){
            console.log("=== CREATE in DETAIL ===")
            this.editedItem = 'new'
        }

    },
    
}
</script>