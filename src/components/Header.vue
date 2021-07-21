<template>
  <v-app-bar app color="primary" dark dense>
    <v-toolbar-title>Fablic.js Sample</v-toolbar-title>
    <template v-slot:extension>
      <v-tabs align-with-title>
        <v-tab link to="/">図形の描画</v-tab>
        <v-tab link to="/freehand">お絵かき</v-tab>
        <v-tab link to="/freehandimage">画像にお絵かき</v-tab>
      </v-tabs>
    </template>
  </v-app-bar>
</template>

<script>
export default {};
</script>

<style></style>
