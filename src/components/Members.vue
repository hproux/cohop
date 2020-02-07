<template>
  <div id="members">
    <Nav></Nav>
    <div class="">
      <h1>Membres ({{members.length}} membres)</h1>
      <table class="table">
        <thead>
          <tr>
            <th>Membre</th>
            <th>Email</th>
            <th>Supprimer</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="member in members">
            <td>{{member.fullname}}</td>
            <td>{{member.email}}</td>
            <td><a @click="deleteMember(member)">🗑</a></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Nav from "./Nav.vue";
export default {
  components: {
    Nav,
  },
  name: 'Members',
  props: {
    msg: String
  },
  methods:{
    deleteMember : function(member){
      axios.delete("members/"+member.id)
      .then((response)=>{
        axios.get('members')
        .then((response)=>{
          this.members = response.data
        })
      })
      .catch((error)=>{
        console.log(error)
      })
    }
  },
  data(){
    return {
      members : [],
    }
  },
  created: function(){
    this.$store.commit("loadMembers");
    axios.get('members')
    .then((response)=>{
      this.members = response.data
    })
    .catch((error)=>{
      alert("L'adresse mail et le mot de passe ne correspondent pas");
      console.log(error);
    })
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .table-container{
    margin-left: 2%;
  }
</style>
