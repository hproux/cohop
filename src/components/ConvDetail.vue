<template>
  <div>
    <Nav></Nav>
    <div>
      <div id="listConversations">
        <article class="conversations panel is-info">
          <p class="panel-heading">
            {{titre}}
			<a class="supprConv button is-danger is-light" @click="supprimerConversation()">Supprimer la conversation</a>
          </p>
          <div class="panel-block">
            <input name="sendMessage" v-model='sendMessage' class="input" type="text" placeholder="Message...">
            <button @click="envoyerMessage()" class="button is-link is-light">Envoyer</button>
          </p>
        </div>
        <a v-for="message in messages" class="panel-block">
          {{message.message}}
		  <button class="button is-warning is-small is-rounded is-outlined">
				<span>Modifier</span>
			 </button>
		    <button @click="supprimerMessage(message)" class="button is-danger is-small is-rounded is-outlined">
				<span>Supprimer</span>
			 </button>
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
	  titre : null,
	  tags : null,
	  id : null,
      messages : [],
      sendMessage : null,
    }
  },
  methods:{
	supprimerConversation:function(){
		axios.delete('channels/'+this.id)
        .then((response)=>{
			this.$router.push('/');
        })
        .catch((error)=>{
          console.log(error);
        })
	},
	supprimerMessage:function(msg){
			console.log(msg);
		axios.delete('channels/'+this.id+'/posts/'+msg.id)
        .then((response)=>{
					axios.get('channels/'+this.id+'/posts')
		.then((response)=>{
		
		this.messages = response.data;
		})
		.catch((error)=>{
		  console.log(error);
		})
        })
        .catch((error)=>{
          console.log(error);
        })
	},
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
		  axios.get('channels/'+this.id+'/posts')
			.then((response)=>{
			  this.messages = response.data;
			})
			.catch((error)=>{
			  console.log(error);
			})
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
	if(this.$route.query.titre!=undefined && this.$route.query.id!=undefined){
		this.titre = this.$route.query.titre;
		this.id = this.$route.query.id;
		axios.get('channels/'+this.id+'/posts')
		.then((response)=>{
		/*if(response.data.length==0){
			this.$router.push('/');	
		}*/
		
		this.messages = response.data;
		})
		.catch((error)=>{
		  console.log(error);
		})
	}else{
		this.$router.push('/');
	}

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .supprConv{
	  height : 2em;
	 margin-left:1%;
  }
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
