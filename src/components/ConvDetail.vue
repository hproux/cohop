<template>
  <div>
    <Nav></Nav>
    <div>
      <div id="listConversations">
        <article class="conversations panel is-info">
          <p class="panel-heading">
            {{titre}}
          </p>
          <div class="panel-block">
            <input name="sendMessage" v-model='sendMessage' class="input" type="text" placeholder="Message...">
            <button @click="envoyerMessage()" class="button is-link is-light">Envoyer</button>
          </p>
        </div>
        <a v-for="message in messages" class="panel-block">
          {{message.message}}
        </a>
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
  name: 'ConvDetail',
  data() {
    return {
      id : null,
      titre : null,
      messages : [],
      sendMessage : null,
    }
  },
  methods:{
    envoyerMessage:function(){
      if(this.sendMessage != null){
        axios.post('channels/'+this.id+'/posts',{
          channel_id : this.id,
          member_id : this.$store.state.id,
          message : this.sendMessage,
          token : this.$store.state.token
        })
        .then((response)=>{
          this.sendMessage = null;
          console.log(response)
        })
        .catch((error)=>{
          console.log(error);
        })
      }else{
        alert('Aucun message inséré');
      }
    }
  },
  created: function(){
    if(this.$router.state.idConversation==null){
      if(this.$route.params.conversation){
        this.$store.commit("setIdConv",this.$route.params.conversation.id);
        this.$store.commit("setTitreConversation",this.$route.params.conversation.topic;
      }else{
        this.$router.push('/');
      }
    }

    axios.get('channels/'+this.id+'/posts')
    .then((response)=>{
      console.log(response)
      this.messages = response.data

    })
    .catch((error)=>{
      console.log(error);
    })
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .button{
    margin-left:1%;
  }
  .titre{
    margin-bottom:3%;
  }

  .modal-card{
    margin-top:10%;
  }

  .ajoutConv{
    margin-left:2%;
  }

  .ajoutConversation{
    display:block;
  }

  .conversations{
    margin-left:2%;
    margin-right:2%;
  }
</style>
