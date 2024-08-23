<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card>
          <v-card-title class="headline">Login</v-card-title>
          
          <v-card-text>
            <v-form @submit.prevent="handleLogin">
              <v-text-field
                label="Email"
                v-model="email"
                prepend-icon="mdi-email"
                type="email"
                required
              ></v-text-field>
              
              <v-text-field
                label="Password"
                v-model="password"
                prepend-icon="mdi-lock"
                type="password"
                required
              ></v-text-field>
              
              <v-btn type="submit" color="primary" block>Login</v-btn>
            </v-form>
          </v-card-text>
          
          <v-card-actions>
            <v-btn color="secondary" text @click="goToRegister">Não tem uma conta? Registre-se</v-btn>
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

const email = ref('');
const password = ref('');
const router = useRouter();

const handleLogin = async () => {
  try {
    const response = await axios.post('http://localhost:3333/login', {
      email: email.value,
      password: password.value,
    });

    // Verifique se a resposta contém o token
    if (response.data.token) {
      // Armazena o token JWT para ser usado nas próximas requisições
      localStorage.setItem('token', response.data.token);
      // Redireciona o usuário para a página de consulta de alunos
      router.push('/alunos');
    } else {
      throw new Error('Token não encontrado na resposta');
    }
  } catch (error) {
    console.error('Login Error:', error);
    alert('Falha no login. Verifique suas credenciais.');
  }
};
const goToRegister = () => {
  router.push('/register');
};
</script>

<style scoped>
.fill-height {
  height: 100vh;
}
</style>
