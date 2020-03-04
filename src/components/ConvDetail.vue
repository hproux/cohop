<template>
  <div>
    <Nav></Nav>
    <div>
      <div id="listConversations">
        <article class="conversations panel is-info">
          <p class="panel-heading panelConv">
            {{titre}}
            <span v-for="tag in tags" class="tag is-light">{{tag}}</span>
            <img src="../assets/edit.png" title='Modifier la conversation' class="modifConv is-pulled-right" @click="afficherModalConversation()"/>
            <img src="../assets/trash.png" title='Supprimer la conversation' class="supprConv is-pulled-right" @click="supprimerConversation()"/>
          </p>
          <div class="panel-block">
            <input name="sendMessage" v-model='sendMessage' class="input" type="text" @keyup.enter="envoyerMessage()" placeholder="Ecrire un message...">
            <button @click="envoyerMessage()" class="button is-link is-light">Envoyer</button>
        </div>
        <a v-for="message in messages" class="panel-block messageBox">
          <router-link :to="{ name: 'member', params: {id:message.member_id}}"><p class="nomMember tag is-light">{{getName(message)}}</p></router-link>
          <p class="messageMarginLeft">{{message.message}}</p>
          <button v-if="isOwner(message)" @click="afficherModal(message)" class="button is-warning is-small is-rounded is-outlined">
            <span>Modifier</span>
          </button>
          <button v-else disabled class="button is-warning is-small is-rounded is-outlined">
            <span>Modifier</span>
          </button>
          <button v-if="isOwner(message)" @click="supprimerMessage(message)" class="button is-danger is-small is-rounded is-outlined">
            <span>Supprimer</span>
          </button>
          <button v-else disabled class="button is-danger is-small is-rounded is-outlined">
            <span>Supprimer</span>
          </button>
        </a>
      </article>
    </div>
  </div>
  <div v-if="isModalShow" id="ajoutConversation">
    <div class="ajoutConversation modal">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Modifier un message</p>
          <button @click="fermerModal()" class="delete" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
          <input type="text" v-model='messageModif' @keyup.enter="modifierMessage()" name="titre" placeholder="Message ..." class="titre input" required>
        </section>
        <footer class="modal-card-foot">
          <button @click="modifierMessage()" class="button is-success">Modifier le message</button>
          <button @click="fermerModal()" class="button">Annuler</button>
        </footer>
      </div>
    </div>
  </div>
  <div v-if="isModalModifShow" id="modifConversation">
    <div class="ajoutConversation modal">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Modifier une conversation</p>
          <button @click="fermerModalModif()" class="delete" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
          <input @keyup.enter="modifConversation()" type="text" v-model='titreModif' name="titre" placeholder="Titre..." class="titre input" required>
          <input @keyup.enter="modifConversation()" type="text" v-model='tagsModif' name="tags" placeholder="Tags..." class="input" required>
        </section>
        <footer class="modal-card-foot">
          <button @click="modifConversation()" class="button is-success">Modifier la conversation</button>
          <button @click="fermerModalModif()" class="button">Annuler</button>
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
    name: 'ConvDetail',
    data() {
      return {
        titre : null,
        titreModif: null,
        tagsModif : null,
        tags : [],
        id : null,
        messages : [],
        sendMessage : null,
        isModalShow : false,
        isModalModifShow : false,
        currentmessage : null,
        messageModif : null,
      }
    },
    methods:{
      isOwner(member){
        if(member.member_id==this.$store.state.idMember){
          return true;
        }else {
          return false;
        }
      },
      afficherModalConversation(){
        this.tagsModif = this.tags.join(' ');
        this.titreModif = this.titre;
        this.isModalModifShow = true;
      },
      modifConversation(){
        this.titre = this.titreModif;
        this.tags = this.tagsModif.split(" ");
        axios.put('channels/'+this.id,{
          label : this.tagsModif,
          topic : this.titreModif,
        })
        .then((response)=>{
          this.isModalModifShow = false
        })
        .catch((error)=>{
          console.log(error);
        })
      },
      supprimerConversation(){
        if ( !confirm( "Voulez-vous vraiment supprimer la conversation?" ) ) {
          return;
        }
        axios.delete('channels/'+this.id)
        .then((response)=>{
          this.$router.push('/');
        })
        .catch((error)=>{
          console.log(error);
        })
      },
      modifierMessage(){
        console.log(this.currentmessage);
        axios.put('channels/'+this.id+'/posts/'+this.currentmessage.id,{
          message : this.messageModif,
        })
        .then((response)=>{
          axios.get('channels/'+this.id+'/posts') //On recharge les messages
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
        this.isModalShow = false;
      },
      supprimerMessage(msg){
        if ( !confirm( "Voulez-vous vraiment supprimer ce message?" ) ) {
          return;
        }
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
      envoyerMessage(){
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
      },
      afficherModal(msg){
        this.isModalShow = true;
        this.currentmessage = msg;
        this.messageModif = this.currentmessage.message;
      },
      afficherModalModif(){
        this.isModalModifShow = true;
      },
      fermerModal(){
        this.isModalShow = false
      },
      fermerModalModif(){
        this.isModalModifShow = false
      },
      getName(memberId){
          return this.$store.state.members.find(elem => elem.id === memberId.member_id).fullname;
      },
    },
    created(){
      if(this.$route.query.id!=undefined){
        this.id = this.$route.query.id;
        axios.get('channels')
                .then((response) => {
                  this.titre = response.data.find(element => element.id == this.id).topic;
                  this.tags = response.data.find(element => element.id == this.id).label.split(" ");
                })
                .catch((error) => {
                  console.log(error);
                })
        axios.get('channels/'+this.id+'/posts')
        .then((response)=>{
          this.messages = response.data;
        })
        .catch((error)=>{
          this.$router.push('/');
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

  .tag{
    margin-left:1%;
  }

  .nomMember{
    margin-right: 5%;
  }

  .panelConv{
    padding-bottom: 2%;
  }
  .messageMarginLeft{
    margin-left:1%;
  }

  .messageBox{
    overflow: auto;
  }
  .supprConv{
    height:2em;
    margin-right: 2%;
  }
  .supprConv:hover{
    cursor:pointer;
  }
  .modifConv{
    height:2em;
  }
  .modifConv:hover{
    cursor:pointer;
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
