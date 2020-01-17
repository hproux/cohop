<template>
  <div>
    <Nav></Nav>
    <Conversations></Conversations>
  </div>
</template>

<script>
import Nav from "./Nav.vue";
import Conversations from "./Conversations.vue";
export default {
  components: {
    Nav,
    Conversations,
  },
  name: 'Channels',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
