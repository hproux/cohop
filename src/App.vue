<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import Login from "@/components/Login";
export default {
  name: "App",
  components: {
    Login,
  },
  mounted(){
    if(!this.loggedMember){
      this.$router.push('login');
    }
  },
  computed: {
    loggedMember: function () {
      return this.$store.state.isLogged ? true : false;
    }
}
}
</script>
