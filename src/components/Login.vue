<template>
  <div class="login">
    <section class="hero is-primary is-fullheight">
      <div class="hero-body">
        <div class="container">
          <div class="columns is-centered">
            <div class="column is-5-tablet is-4-desktop is-3-widescreen">
              <form @submit.prevent="checkLogin" class="box">
                <div class="field">
                  <label for="" class="label">Email</label>
                  <input type="email" v-model='email' name="email" placeholder="e.g. bobsmith@gmail.com" class="input" required>
                </div>
                <div class="field">
                  <label for="" class="label">Password</label>
                  <input type="password" v-model='password' placeholder="*******" class="input" name="password" required>
                </div>
                <div class="field">
                  <label for="checkbox" class="checkbox">
                    <input id="checkbox" type="checkbox">
                    Remember me
                  </label>
                </div>
                <div class="field">
                  <button class="button is-success">
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Login',
  props: {
    msg: String
  },
  data() {
    return {
      email : "test1234@gmail.com",
      password : "test1234",
    }
  },
  methods:{
    checkLogin(){
      if (this.email && this.password) {
        axios.post('members/signin',{
          email : this.email,
          password : this.password
        })
        .then((response)=>{
          console.log(response)
          this.$store.commit("setToken",response.data.token)
          this.$store.commit("setId",response.data.member.id)
          this.$store.commit("changeConnectionState")
          this.$router.push('/')
        })
        .catch((error)=>{
          alert("L'adresse mail et le mot de passe ne correspondent pas");
          console.log(error);
        })
      }else{
        alert("Tous les champs ne sont pas correctements remplis");
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
