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
      <div v-for="message in lastTenMessage">
        <a @click="redirectMessage(message)" class="messages button is-link">{{message.message}}, le {{message.formatedDate}}</a>
      </div>

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
  data(){
    return {
      allMemberMessages : null,
      allConversations : null,
      allMessages : [],
      lastTenMessage : null,
      member : null,
      increment : null,
    }
  },
  created(){
    this.allMessages = [];
    this.allConversations = [];
    this.allMemberMessages = [];
    this.lastTenMessage = [];
    this.increment = 0;
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
          this.increment+=1;
          if(this.increment == this.allConversations.length){
            this.allMessages.forEach(objActu =>{
              objActu.forEach(msgActu=>{
                this.allMemberMessages.push(
                        {"channel_id":msgActu.channel_id,
                          "modified_at":msgActu.modified_at,
                          "member_id":msgActu.member_id,
                          "message":msgActu.message,
                          "created_at":new Date(msgActu.created_at),
                          "formatedDate":new Date(msgActu.created_at).toLocaleDateString()+" à "+new Date(msgActu.created_at).getHours()+"h"+this.minutes_with_leading_zeros(new Date(msgActu.created_at).getMinutes())});
              })
            })
            this.UserLastMessages();
          }
        })
        .catch((error)=>{
          console.log(error);
        })
      });
    })
    .catch((error)=>{
      console.log(error);
    })
  },
  methods:{
    redirectMessage(message) {
      this.$router.push({name: 'ConvDetail', query: {id: message.channel_id}})
    },

    minutes_with_leading_zeros(dt)//permet d'afficher le 0 des minutes si <= à 9
    {
      return (dt < 10 ? '0' : '') + dt;
    },

    UserLastMessages(){
      //Recuperation des messages de l'utilisateur courant
      this.lastTenMessage = this.allMemberMessages.filter((msg)=>{
        return msg.member_id===this.member.id;
      })
      this.lastTenMessage = this.lastTenMessage.sort((a, b) => {//tri des messages par date
        a = new Date(a.created_at);
        b = new Date(b.created_at);
        return a>b ? -1 : a<b ? 1 : 0;
      });

      this.lastTenMessage = this.lastTenMessage.slice(0,10);//seulement les 10 premiers messages
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .table-container{
    margin-left: 2%;
  }

  .messages{
    margin-top:1%;
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
