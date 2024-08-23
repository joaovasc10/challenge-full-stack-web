<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title">MENU</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item link to="/alunos">
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Alunos</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-spacer></v-spacer>
        <v-list-item @click="logout">
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title>Consulta de Alunos</v-app-bar-title>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-card>
          <v-card-title>
            <v-row>
              <v-col cols="8">
                <v-text-field
                  v-model="search"
                  label="Buscar Aluno"
                  append-icon="mdi-magnify"
                  @input="fetchAlunos"
                ></v-text-field>
              </v-col>
              <v-col cols="4" class="text-right">
                <v-btn color="primary" @click="navigateToCreate">Cadastrar Aluno</v-btn>
              </v-col>
            </v-row>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="alunos"
            :search="search"
            class="elevation-1"
          >
            <template v-slot:[`item.ra`]="{ item }">
              <td>{{ item.ra }}</td>
            </template>
            <template v-slot:[`item.nome`]="{ item }">
              <td>{{ item.nome }}</td>
            </template>
            <template v-slot:[`item.cpf`]="{ item }">
              <td>{{ item.cpf }}</td>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
              <td>
                <v-btn small @click="updateAluno(item.id)" color="primary">
                  Editar
                </v-btn>
                <v-btn small @click="deleteAluno(item.id)" color="red">
                  Excluir
                </v-btn>
              </td>
            </template>
          </v-data-table>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '../api';
import { useRouter } from 'vue-router';

const drawer = ref(false);
const search = ref('');
const alunos = ref([]);
const router = useRouter();
const headers = ref([
  { text: 'RA', value: 'ra' },
  { text: 'Nome', value: 'nome' },
  { text: 'CPF', value: 'cpf' },
  { text: 'Ações', value: 'actions', sortable: false }
]);

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
