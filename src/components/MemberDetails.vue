<template>
  <div id="memberdetail">
    <Nav></Nav>
    <article class="member panel is-primary">
      <p class="panel-heading">Profil Utilisateur</p>
      <div class="card">
  <div class="card-content">
    <div class="media">
      <div class="media-left">
        <figure class="image is-128x128">
          <img :src="'https://api.adorable.io/avatars/128/'+member.email" alt="Placeholder image">
        </figure>
      </div>
      <div class="media-content">
        <p class="title is-4">{{member.fullname}}</p>
        <p class="subtitle is-6">{{member.email}}</p>
      </div>
    </div>

    <div class="content">
    <h2>Historique des messages</h2>
    <p>blablabla</p>
    </div>
  </div>
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
      allMemberMessages : null,
      allConversations : null,
      allMessages : [],
      member : null,
    }
  },
  created: function(){
    this.allMessages = [];
    this.allConversations = [];
    this.allMemberMessages = [];
    this.$store.commit("loadMembers");
    this.member = this.$store.state.members.filter(obj =>{
      return obj.id === this.$route.params.id;
    })
    this.member = this.member[0];

    //Chargement des conversations
    axios.get('channels')
    .then((response)=>{
      this.allConversations = response.data;
      //Chargement de tous les messages
      this.allConversations.forEach(convActu =>{
        axios.get('channels/'+convActu.id+'/posts')
        .then((response)=>{
          this.allMessages.push(response.data);
          this.allMessages.forEach(objActu =>{
            //Chargement des tous les messages de l'utilisateur
            objActu.forEach(msgActu=>{
              this.allMessages.push(msgActu.message);
            })
          })
        })
        .catch((error)=>{
          console.log(error);
        })
      });
      console.log(this.allMessages);
    })
    .catch((error)=>{
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
