<template>
  <div id="members">
    <Nav></Nav>
    <div class="">
      <h1>Membres ({{members.length}} membres)</h1>
      <div id="listMembers">
        <article class="conversations panel is-info">
          <p class="panel-heading">Membres</p>

          <p v-for="member in members" class="panel-block">
            <img :src="'https://api.adorable.io/avatars/48/'+member.email">
            <router-link class="content" :to="{ name: 'member', params: {id : member.id} }">{{member.fullname}} {{member.email}}</router-link>
            <a v-if="currentIdMember != member.id" class="trash" @click="deleteMember(member)">🗑</a>
          </p>
        </article>
      </div>
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
        this.$store.commit("loadMembers");
      })
      .catch((error)=>{
        console.log(error)
      })
    }
  },
  data(){
    return {
      members : [],
      currentIdMember : null,
    }
  },
  created: function(){
    this.currentIdMember = this.$store.state.idMember;
    this.$store.commit("loadMembers");
    this.members = this.$store.state.members
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .table-container{
    margin-left: 2%;
  }
  .conversations{
    margin-left:2%;
    margin-right:2%;
  }
  .trash{
    margin-right: 1%;
    margin-left: auto;
  }
  .content{
    margin-top: 1%;
    margin-left: 1%;
  }
</style>
