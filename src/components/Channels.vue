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
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
