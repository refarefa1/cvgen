<template>
  <router-view />
</template>


<script lang="ts">
export default {

  created() {
    this.$store.dispatch({ type: 'loadUser' })
  }

}

</script>

