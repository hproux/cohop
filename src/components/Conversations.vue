<template>
  <div>
    <div id="listConversations">
      <article class="conversations panel is-info">
        <p class="panel-heading">
          Conversations
        </p>

        <a class="panel-block is-active">
          bulma
        </a>
        <a class="panel-block">
          marksheet
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
            <input type="text" v-model='titre' name="titre" placeholder="Titre..." class="titre input" required>
            <input type="text" v-model='tags' name="tags" placeholder="Tags..." class="input" required>
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
export default {
  name: 'Conversations',
  methods:{
    creerConversation: function(){
      this.isModalShow = false
    },
    afficherAjoutConv: function(){
      this.isModalShow = true
    },
    fermerModal: function(){
      this.isModalShow = false
    },
  },
  data(){
    return{
      tags : null,
      titre : null,
      isModalShow : false,
    }
  },
  created: function(){
    /*axios.get('channels')
    .then((response)=>{
      console.log(response)
    })
    .catch((error)=>{
      console.log(error);
    })*/
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

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
