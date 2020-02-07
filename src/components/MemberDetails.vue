<template>
  <div id="memberdetail">
    <Nav></Nav>
    <article class="member panel is-primary">
      <p class="panel-heading">Profil Utilisateur</p>

      <div class="panel-block">
        <img class="centered" :src="'https://api.adorable.io/avatars/128/'+member.email">
        <p>{{member.fullname}}</p>
          <h2>Historique des messages</h2>
      </div>
    </article>
  </div>
</template>

<script>
import Nav from "./Nav.vue";
export default {
  components: {
    Nav,
  },
  name: 'MemberDetails',
  methods:{
  },
  data(){
    return {
      member : null,
    }
  },
  created: function(){
    this.$store.commit("loadMembers");
    this.member = this.$store.state.members.filter(obj =>{
      return obj.id === this.$route.params.id;
    })
    this.member = this.member[0];
    console.log(this.member);
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .table-container{
    margin-left: 2%;
  }
  .member{
    margin-left:2%;
    margin-right:2%;
  }
  .content{
    margin-top: 1%;
    margin-left: 1%;
  }
  .panel-heading{
    text-align: center;
  }
  .panel-block{
    text-align: center;
  }
  .centered{
    margin-left: auto;
    margin-right: auto;
  }
</style>
