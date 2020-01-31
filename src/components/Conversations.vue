<template>
  <div>
    <Nav></Nav>
    <div id="listConversations">
      <article class="conversations panel is-info">
        <p class="panel-heading">
          Conversations
        </p>

        <a v-for="conversation in this.conversations" @click="voirConversation(conversation)" class="panel-block">
          {{conversation.topic}}
		</a>
      </article>
      <div>
        <button @click="afficherAjoutConv()" class="ajoutConv button is-info is-light">+ Ajouter une conversation</button>
      </div>
    </div>
    <div v-if="isModalShow" id="ajoutConversation">
      <div class="ajoutConversation modal">
        <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Ajouter une conversation</p>
            <button @click="fermerModal()" class="delete" aria-label="close"></button>
          </header>
          <section class="modal-card-body">
            <input @keyup.enter="creerConversation()" type="text" v-model='titre' name="titre" placeholder="Titre..." class="titre input" required>
            <input @keyup.enter="creerConversation()" type="text" v-model='tags' name="tags" placeholder="Tags..." class="input" required>
          </section>
          <footer class="modal-card-foot">
            <button @click="creerConversation()" class="button is-success">Créer la conversation</button>
            <button @click="fermerModal()" class="button">Annuler</button>
          </footer>
        </div>
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
  name: 'Conversations',
  data() {
    return {
      titre : null,
      tags : null,
      conversations : null,
      isModalShow : false,
    }
  },
  methods:{
    voirConversation: function(param){
      console.log(param)
      this.$router.push({ name: 'ConvDetail', query: { titre: param.topic, id : param.id, tags : param.label}})
    },
    creerConversation: function(){
      if(this.tags != null && this.titre !=null)
      {
        this.isModalShow = false
        axios.post('channels',{
          label : this.tags,
          topic : this.titre,
          token : this.$store.state.token
        })
        .then((response)=>{
			axios.get('channels')
				.then((response)=>{
				  this.conversations = response.data
				})
				.catch((error)=>{
				  console.log(error);
				})
        })
        .catch((error)=>{
          console.log(error);
        })
      }else {
        alert('Les champs ne sont pas correctement remplis!')
      }
    },
    afficherAjoutConv: function(){
      this.isModalShow = true
    },
    fermerModal: function(){
      this.isModalShow = false
    },
  },
  created: function(){
    axios.get('channels')
    .then((response)=>{
      this.conversations = response.data
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
