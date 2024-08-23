<!-- src/components/Register.vue -->

<template>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card>
            <v-card-title class="headline">Registrar</v-card-title>
            
            <v-card-text>
              <v-form @submit.prevent="handleRegister">
                <v-text-field
                  label="Nome"
                  v-model="name"
                  prepend-icon="mdi-account"
                  type="text"
                  required
                ></v-text-field>
  
                <v-text-field
                  label="Email"
                  v-model="email"
                  prepend-icon="mdi-email"
                  type="email"
                  required
                ></v-text-field>
                
                <v-text-field
                  label="Senha"
                  v-model="password"
                  prepend-icon="mdi-lock"
                  type="password"
                  required
                ></v-text-field>
  
                <v-text-field
                  label="Confirmar Senha"
                  v-model="confirmPassword"
                  prepend-icon="mdi-lock-check"
                  type="password"
                  required
                ></v-text-field>
                
                <v-btn type="submit" color="primary" block>Registrar</v-btn>
              </v-form>
            </v-card-text>
            
            <v-card-actions>
              <v-btn color="secondary" text @click="goToLogin">Já tem uma conta? Faça login</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import axios from 'axios';
  
  const name = ref('');
  const email = ref('');
  const password = ref('');
  const confirmPassword = ref('');
  const router = useRouter();
  
  const handleRegister = async () => {
    if (password.value !== confirmPassword.value) {
      alert('As senhas não coincidem.');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:3333/register', {
        name: name.value,
        email: email.value,
        password: password.value,
      });
  
      // Armazena o token JWT para ser usado nas próximas requisições
      localStorage.setItem('token', response.data.token);
  
      // Redireciona o usuário para a página de consulta de alunos após o registro
      router.push('/alunos');
    } catch (error) {
      console.error('Registration Error:', error);
      alert('Falha no registro. Verifique os dados fornecidos.');
    }
  };
  
  const goToLogin = () => {
    router.push('/');
  };
  </script>
  
  <style scoped>
  .fill-height {
    height: 100vh;
  }
  </style>
  