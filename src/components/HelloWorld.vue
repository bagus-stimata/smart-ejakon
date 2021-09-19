<template>
  <v-container>
    <v-btn>Oke tombol pertama bos</v-btn>

  <h1>{{ $store.state.counter}} </h1>
  <h1>{{ currentCounter }} </h1>

    <div class="buttons">
      <v-btn @click="$store.commit('increaseCounter')">Plus</v-btn>
      <v-btn @click="$store.commit('decreaseCounter')">Minus</v-btn>
    </div>
    <div class="buttons">
      <v-btn @click="$store.dispatch('increaseCounterDispatch')">Plus</v-btn>
      <v-btn @click="$store.dispatch('decreaseCounterDispatch')">Minus</v-btn>
    </div>
    <div class="buttons">
      <v-btn @click="increaseCounterMethod">Plus</v-btn>
      <v-btn @click="decreaseCounterMethod">Minus</v-btn>
    </div>

  </v-container>
</template>

<script>
  export default {
    name: 'HelloWorld',

    data: () => ({
      ecosystem: [
        {
          text: 'vuetify-loader',
          href: 'https://github.com/vuetifyjs/vuetify-loader',
        },
        {
          text: 'github',
          href: 'https://github.com/vuetifyjs/vuetify',
        },
        {
          text: 'awesome-vuetify',
          href: 'https://github.com/vuetifyjs/awesome-vuetify',
        },
      ],
      whatsNext: [
        {
          text: 'Explore components',
          href: 'https://vuetifyjs.com/components/api-explorer',
        },
        {
          text: 'Select a layout',
          href: 'https://vuetifyjs.com/getting-started/pre-made-layouts',
        },
        {
          text: 'Frequently Asked Questions',
          href: 'https://vuetifyjs.com/getting-started/frequently-asked-questions',
        },
      ],
      currentCounter: 0
    }),
    mounted(){
      // this.$store.mutations.setCurrentJoke('aku')
      this.currentCounter = this.$store.getters.getCurrentCounter
    },
    methods: {
      increaseCounterMethod() {
        this.$store.commit('increaseCounter')
        //hanya berlaku untuk tombol ketiga
         this.currentCounter = this.$store.getters.getCurrentCounter
      },
      decreaseCounterMethod() {
        this.$store.dispatch('decreaseCounterDispatch')
        //hanya berlaku untuk tombol ketiga
         this.currentCounter = this.$store.getters.getCurrentCounter
      }

    }
  }
</script>
