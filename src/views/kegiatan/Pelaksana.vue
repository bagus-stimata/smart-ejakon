<template>

  <div class="kegiatan_table">
    <PelaksanaTable />
  </div>


</template>

<script>
import PelaksanaTable from '@/components/kegiatan/PelaksanaTable.vue'

export default {
  name: 'Pelaksana',
  components: {
    PelaksanaTable
  }
}
</script>
