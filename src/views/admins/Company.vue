<template>

  <div class="asosiasi_table">
    <CompanyTable />
  </div>


</template>

<script>
import CompanyTable from '@/components/admins/CompanyTable.vue'

export default {
  name: 'Company',
  components: {
    CompanyTable
  }
}
</script>
