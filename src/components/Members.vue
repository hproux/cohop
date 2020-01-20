<template>
  <div id="members" class="columns">
    <Nav></Nav>
    <div class="table-container column is one-quarter">
      <h1>Membres ({{members.length}} membres)</h1>
      <table class="table">
        <thead>
          <tr>
            <th>Membre</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="member in members">
            <td>{{member.fullname}}</td>
            <td>{{member.email}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="card-content column">
      <div class="content">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.
        <a href="#">@bulmaio</a>. <a href="#">#css</a> <a href="#">#responsive</a>
        <br>
        <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
      </div>
    </div>
    <footer class="card-footer">
      <a href="#" class="card-footer-item">Save</a>
      <a href="#" class="card-footer-item">Edit</a>
      <a href="#" class="card-footer-item">Delete</a>
    </footer>
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
  data(){
    return {
      members : null,
    }
  },
  created: function(){
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
