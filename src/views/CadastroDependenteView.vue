<template>
  <div>

    <div v-if="mostrarFormularioAdicionar === false && mostrarFormularioEditar === false"
      style="width: 50%; margin-top: 3%; margin-left: 25%;">

      <b-button class='bg-success mb-2' @click="adicionar()">Adicionar Dependente</b-button>

      <h2 class="card-header bg-primary bg-gradient text-dark">Cadastro de Dependente</h2>
      <b-table class="table-striped table-bordered table-hover" :items="items" :fields="fields">
        <template v-slot:cell(acao)="data">
          <b-button class='bg-success' @click="editar(data.item)">Editar</b-button>
          <b-button class="bg-danger" @click="confirmDelete(data.item)">Excluir</b-button>
        </template>
      </b-table>
    </div>

    <div>
      <b-card v-if="mostrarFormularioAdicionar" class="border-0 shadow-sm mb-3 mt-4"
        style="width: 50%; margin-top: 3%; margin-left: 25%;">
        <h3 class="card-header bg-primary bg-gradient text-dark">Adicionar Dependente</h3>
        <div class="card-body">
          <label class="mb-1">
            <span class="text-muted">Nome:</span>
            <input type="email" v-model='nomeDependente' name="email" class="form-control">
          </label>
          <label class="mb-1">
            <span class="text-muted">Id Funcionario:</span>
            <select v-model="idFuncionario" class="form-control">
            <option v-for="funcionario in funcionarios" :key="funcionario.id" :value="funcionario.id">{{ funcionario.nome }}</option>
  </select>
          </label>
          <div class="mt-2">
            <b-button variant="danger" @click="cancelarAdicionar()">Cancelar</b-button>
          <b-button class='bg-success' @click="handleAdiciona()">Salvar</b-button>
          </div>

        </div>
      </b-card>
      <b-card v-if="mostrarFormularioEditar" class="border-0 shadow-sm mb-3 mt-4"
        style="width: 50%; margin-top: 3%; margin-left: 25%;">
        <h3 class="card-header bg-primary bg-gradient text-dark">Editar Dependente</h3>
        <div class="card-body">
          <label class="mb-1">
            <span class="text-muted">Nome:</span>
            <input type="email" v-model='nomeDependenteEdit' name="email" class="form-control">
          </label>
          <label class="mb-1">
            <span class="text-muted">Id Funcionario:</span>
            <select v-model="idFuncionarioEdit" class="form-control">
    <option v-for="funcionario in funcionarios" :key="funcionario.id" :value="funcionario.id">{{ funcionario.nome }}</option>
  </select>
          </label>
          <div class="mt-2">
            <b-button variant="danger" @click="cancelarEdicao()">Cancelar</b-button>
          <b-button class="bg-success"  @click="editarDependente()">Salvar</b-button>
          </div>

        </div>
      </b-card>
    </div>




    <b-modal id="modal-1" ref="modalExcluir" title="Deletar Dependente" @ok="handleDelete()" @cancelar="fecharModal()">
      <p class="my-4">Deseja deletar o dependente ?</p>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'SeuComponente',
  data() {
    return {
      fields: [
        { key: 'id', label: 'ID' },
        { key: 'Dependente', label: 'Dependente' },
        { key: 'Funcionário', label: 'Funcionario' },
        { key: 'acao', label: 'Ações' }
      ],
      items: [],
      funcionarios:[],
      idDependenteDelete: null,
      nomeDependente: '',
      idFuncionario: '',
      idFuncionarioEdit:'',
      mostrarFormularioAdicionar: false,
      mostrarFormularioEditar: false,
      nomeDependenteEdit: '',
      idDependenteEdit: null,
    }
  },
  mounted() {
    this.carregarDependentes();
  },
  methods: {
    carregarDependentes() {
      axios.get('http://localhost:3000/routes/dependentes/listar')
        .then(response => {
          console.log('RESPONSE', response)
          this.items = response.data.data;
        })
        .catch(error => {
          console.error('Erro ao carregar Dependente:', error);
        });
        axios.get('http://localhost:3000/routes/funcionarios/listar')
        .then(response => {
          console.log('RESPONSE', response)
          this.funcionarios = response.data.data;
        })
        .catch(error => {
          console.error('Erro ao carregar Dependente:', error);
        });
    },
    handleAdiciona() {
      axios.post('http://localhost:3000/routes/dependentes/cadastrar', {
        nome: this.nomeDependente,
        id_funcionario: this.idFuncionario,
      })
        .then(response => {
          console.log('RESPONSE', response)
          this.items = response.data.data;
          this.carregarDependentes()
          this.nomeDependente = ''
          this.mostrarFormularioAdicionar = false;
        })
        .catch(error => {
          console.error('Erro ao carregar funcionários:', error);
        });
    },
    confirmDelete(item) {
      this.$refs.modalExcluir.show()
      this.idDependenteDelete = item.id
    },
    fecharModal() {
      this.$refs.modalExcluir.hide()
      this.idDependenteDelete = null
    },
    handleDelete() {
      axios.delete(`http://localhost:3000/routes/dependentes/excluir/${this.idDependenteDelete}`)
        .then(response => {
          console.log('RESPONSE', response)
          this.items = response.data.data;
          this.idDependenteDelete = null
          this.carregarDependentes()
        })
        .catch(error => {
          console.error('Erro ao carregar dependentes:', error);
        });
    },
    editar(item) {
      this.idDependenteEdit = item.id;
      this.nomeDependenteEdit = item.Dependente;
      this.idFuncionarioEdit = item.IdFuncionario;
      this.mostrarFormularioEditar = true;
    },
    cancelarAdicionar() {
      this.mostrarFormularioAdicionar = false;
    },
    cancelarEdicao() {
      this.mostrarFormularioEditar = false;
    },
    adicionar() {
      this.mostrarFormularioAdicionar = true;
    },
    editarDependente() {
      axios.put(`http://localhost:3000/routes/dependentes/alterar/${this.idDependenteEdit}`, {
        nome: this.nomeDependenteEdit,
        id_funcionario: this.idFuncionarioEdit,
      })
        .then(response => {
          console.log('RESPONSE', response)
          this.idDependenteEdit = '';
          this.nomeDependenteEdit = '';
          this.mostrarFormularioEditar = false;
          this.carregarDependentes()
        })
        .catch(error => {
          console.error('Erro ao carregar dependentes:', error);
        });
    },
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;700&family=Roboto:wght@100;300;400;500;700;900&family=Source+Sans+Pro:wght@200;300;400;600;700;900&display=swap');

.fundo-preto {
  background-color: #000 !important;
}</style>
