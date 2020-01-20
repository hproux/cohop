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
  },
  created : function(){
    if(this.$store.state.token){
      axios.get("members/"+this.$store.state.id+"/signedin")
      .then((response)=>{
        console.log(response)
      })
      .catch((error)=>{
        this.$router.push('login')
      })
    }else{
      this.$router.push('login')
    }

  }

}
</script>
