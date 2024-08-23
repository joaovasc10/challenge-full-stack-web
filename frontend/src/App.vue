<template>
  <v-app>
    
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Módulo Acadêmico</v-toolbar-title>
    </v-app-bar>

    <!-- Componente principal onde as rotas serão carregadas -->
    <v-main>
      <router-view />
    </v-main>

  
    <v-footer app color="primary" dark>
      <span class="white--text">© 2024 - Sistema de Gestão de Alunos - Desenvolvido por João Vasconcelos para +A Educação</span>
    </v-footer>
  </v-app>
</template>

<script setup>
// import Login from './components/LoginAdmin.vue';
</script>

<style>
/* Estilos globais podem ser definidos aqui */
</style>
