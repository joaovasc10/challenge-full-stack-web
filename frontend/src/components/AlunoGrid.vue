<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <v-list-item link to="/alunos">
          <template v-slot:prepend>
            <v-icon>mdi-account</v-icon>
          </template>
          <v-list-item-title>Alunos</v-list-item-title>
        </v-list-item>
        <v-spacer></v-spacer>
        <v-list-item @click="logout">
          <template v-slot:prepend>
            <v-icon>mdi-logout</v-icon>
          </template>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title>Consulta de Alunos</v-app-bar-title>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-row class="mb-4 d-flex align-center">
          <v-col cols="9">
            <v-text-field
              v-model="search"
              label="Buscar Aluno"
              append-icon="mdi-magnify"
            ></v-text-field>
          </v-col>
          <v-col cols="2" class="d-flex justify-end">
            <v-btn color="primary" @click="navigateToCreate">Cadastrar Aluno</v-btn>
          </v-col>
        </v-row>

        <v-table height="300px" fixed-header>
          <thead>
            <tr>
              <th class="text-center font-weight-bold">Registro Acadêmico</th>
              <th class="text-center font-weight-bold">Nome</th>
              <th class="text-center font-weight-bold">CPF</th>
              <th class="text-center font-weight-bold">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in filteredAlunos" :key="item.id">
              <td class="text-center">{{ item.ra }}</td>
              <td class="text-center">{{ item.nome }}</td>
              <td class="text-center">{{ item.cpf }}</td>
              <td class="text-center">
                <v-btn color="primary" @click="updateAluno(item.id)">Editar</v-btn>
                <v-btn color="error" @click="deleteAluno(item.id)">Excluir</v-btn>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import api from '../api';
import { useRouter } from 'vue-router';

const drawer = ref(false);
const search = ref('');
const alunos = ref([]);

const router = useRouter();

const fetchAlunos = async () => {
  try {
    const response = await api.get('/alunos');
    alunos.value = response.data;
  } catch (error) {
    console.error('Erro ao buscar alunos:', error);
  }
};

const updateAluno = (id) => {
  router.push(`/alunos/edit/${id}`);
};

const deleteAluno = async (id) => {
  try {
    await api.delete(`/alunos/${id}`);
    fetchAlunos();
  } catch (error) {
    console.error('Erro ao excluir aluno:', error);
  }
};

const filteredAlunos = computed(() => {
  return alunos.value.filter((aluno) => {
    return (
      aluno.ra.toString().includes(search.value) ||
      aluno.nome.toLowerCase().includes(search.value.toLowerCase()) ||
      aluno.cpf.includes(search.value)
    );
  });
});


const navigateToCreate = () => {
    router.push('/alunos/create');
  };

const logout = () => {
  localStorage.removeItem('authToken');
  sessionStorage.removeItem('authToken');
  router.push('/');
};

onMounted(fetchAlunos);
</script>

<style scoped>
.text-center {
  text-align: center;
}
</style>