<template>
  <div id="register">
    <div class="section">
      <div class="container">
        <div class="title">Créer un compte</div>
        <div class="subtitle">Avec votre e-mail</div>
        <form id="register-form" @submit.prevent="checkForm">
          <div class="field">
            <label class="label" for="email">Email</label>
            <input required class="input" type="email" placeholder="Email" v-model='email' name="email"/>
            <div class="columns row-one">
              <div class="column">
                <label class="label" for="fullName">Nom complet</label>
                <div class="control">
                  <input required class="input" type="text" placeholder="Nom complet" v-model='fullname' name="fullName"/>
                </div>
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <label class="label" for="password">Mot de passe</label>
                <input required class="input" type="password" placeholder="Mot de passe" v-model='password' name="password"/>
              </div>
            </div>
            <div class="field is-grouped">
              <div class="control">
                <button class="buttonRegister button is-primary is-medium" type="submit">S'enregistrer</button>
              </div>
              <a class="loginRef" href="/">Vous avez déjà un compte ? Connectez-vous</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'register',
  data() {
    return {
      email : null,
      password : null,
      fullname : null
    }
  },
  methods:{
    checkForm() {
      if (this.email && this.password && this.fullname) {
        axios.post('members',{
          fullname : this.fullname,
          email : this.email,
          password : this.password
        })
        .then((response)=>{
          this.$store.commit('setId',response.data.id)
          this.$router.push('login')
        })
        .catch((error)=>{
          console.log(error);
        })
      }else{
        alert("Tous les champs ne sont pas correctements remplis");
      }
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.buttonRegister{
  height:2em;
}
.loginRef{
  margin-top:1%;
}
  .column {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
  }
  .row-one {
    padding-top: 13px;
  }
  form .field {
    margin: auto;
    max-width: 740px;
  }
</style>
