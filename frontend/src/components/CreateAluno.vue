<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card>
          <v-card-title>
            Cadastro de Aluno
          </v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid">
              <v-text-field v-model="aluno.nome" label="Nome" required></v-text-field>
              <v-text-field v-model="aluno.email" label="Email" required></v-text-field>
              <v-text-field v-model="aluno.ra" label="Registro Acadêmico" required></v-text-field>
              <v-text-field v-model="aluno.cpf" label="CPF" required></v-text-field>
            </v-form>
            <v-alert v-if="successMessage" type="success" dismissible>{{ successMessage }}</v-alert>
            <v-alert v-if="errorMessages.length" type="error" dismissible>
              <ul>
                <li v-for="(message, index) in errorMessages" :key="index">{{ message }}</li>
              </ul>
            </v-alert>
          </v-card-text>
          <v-col>
            <v-btn color="primary" @click="saveAluno">Cadastrar Aluno</v-btn>
          </v-col>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import api from '@/api';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

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
    const successMessage = ref('');
    const errorMessages = ref([]);

    const validateFields = () => {
      errorMessages.value = [];
      if (aluno.value.ra.length !== 6) {
        errorMessages.value.push('O registro acadêmico deve ser um número de 6 dígitos');
      }
      if (aluno.value.cpf.length !== 11) {
        errorMessages.value.push('O CPF deve conter 11 dígitos');
      }
      return errorMessages.value.length === 0;
    };

    const saveAluno = async () => {
      if (valid.value && validateFields()) {
        try {
          await api.post('/alunos', aluno.value, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
          successMessage.value = 'Aluno cadastrado com sucesso!';
          errorMessages.value = [];
          router.push('/alunos');
        } catch (error) {
          errorMessages.value = ['Erro ao criar aluno: ' + error.response.data.message];
          successMessage.value = '';
        }
      }
    };

    return {
      aluno,
      valid,
      saveAluno,
      successMessage,
      errorMessages,
    };
  },
};
</script>