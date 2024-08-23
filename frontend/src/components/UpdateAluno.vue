<template>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="8">
          <v-card>
            <v-card-title>
              Atualização de Aluno
            </v-card-title>
            <v-card-text>
              <v-form ref="form" v-model="valid">
                <v-text-field v-model="aluno.nome" label="Nome" required></v-text-field>
                <v-text-field v-model="aluno.email" label="Email" required></v-text-field>
                <v-text-field v-model="aluno.ra" label="Registro Acadêmico" readonly></v-text-field>
                <v-text-field v-model="aluno.cpf" label="CPF" readonly></v-text-field>
              </v-form>
              <v-alert v-if="successMessage" type="success" dismissible>{{ successMessage }}</v-alert>
              <v-alert v-if="errorMessages.length" type="error" dismissible>
                <ul>
                  <li v-for="(message, index) in errorMessages" :key="index">{{ message }}</li>
                </ul>
              </v-alert>
            </v-card-text>
            <v-col>
              <v-btn color="primary" class="mr-2" @click="updateAluno">Atualizar Aluno</v-btn>
              <v-btn color="secondary" @click="goBack">Voltar</v-btn>
            </v-col>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import api from '@/api';
  import { ref, onMounted } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  
  export default {
    setup() {
      const aluno = ref({
        nome: '',
        email: '',
        ra: '',
        cpf: '',
      });
      const valid = ref(false);
      const router = useRouter();
      const route = useRoute();
      const successMessage = ref('');
      const errorMessages = ref([]);
  
      // Função para buscar os dados do aluno pelo ID da URL
      const fetchAluno = async () => {
        try {
          const response = await api.get(`/alunos/${route.params.id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
          aluno.value = response.data;
        } catch (error) {
          errorMessages.value = ['Erro ao buscar aluno: ' + error.response.data.message];
        }
      };
  
      // Função para atualizar os dados do aluno
      const updateAluno = async () => {
        if (valid.value) {
          try {
            await api.put(`/alunos/${route.params.id}`, {
              nome: aluno.value.nome,
              email: aluno.value.email,
            }, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            });
            successMessage.value = 'Aluno atualizado com sucesso!';
            errorMessages.value = [];
            router.push('/alunos');
          } catch (error) {
            errorMessages.value = ['Erro ao atualizar aluno: ' + error.response.data.message];
            successMessage.value = '';
          }
        }
      };

    const goBack = () => {
        router.back();
    };
  
      // Chama a função fetchAluno ao montar o componente
      onMounted(fetchAluno);
  
      return {
        aluno,
        valid,
        updateAluno,
        goBack,
        successMessage,
        errorMessages,
      };
    },
  };
  </script>
  
  <style scoped>
  .text-center {
    text-align: center;
  }
  </style>
  