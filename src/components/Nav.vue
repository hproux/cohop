<template>
  <div id="app">

      <nav class="navbar">
        <div class="navbar-brand">
          <router-link to="/" class="navbar-item">
            <img class="logo" src="../assets/cohop.png" alt="Logo">
          </router-link>
          <!--
      Using the v-on: directive to listen for the click event and toggle the data property showNav. Also, using the v-bind: directive to reactively update the class attribute 'is-active' based on the showNav property.
      -->
          <div class="navbar-burger" @click="showNav = !showNav" :class="{ 'is-active': showNav }">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <!--
      Using the v-bind: directive to reactively update the class attribute 'is-active' based on the showNav property.
      -->
        <div class="navbar-menu" :class="{ 'is-active': showNav }">
          <div class="navbar-end">
            <router-link to="/members" class="navbar-item">
              Membres
            </router-link>
            <router-link to="/conversations" class="navbar-item">
              Conversations
            </router-link>
            <a class="navbar-item" @click="Logout()">
              Se Déconnecter
            </a>
          </div>
        </div>
      </nav>
    <!-- Hero content: will be in the middle -->
    <div class="hero-body">
      <div class="container has-text-centered">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Nav',
  data() {
    return {
      showNav: false
    }
  },
  methods:{
    Logout(){
      axios.delete('members/signout')
      .then((response)=>{
        this.$store.commit("disconnect")
        this.$router.push('/login')
      })
      .catch((error)=>{
        console.log(error);
      })
    }
  },
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.logo{
    width: 108px;
}

.navbar {
  border-bottom: #aaa solid 1px;
}
</style>
