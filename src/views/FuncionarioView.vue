<template>
  <div >
   
    <div v-if="mostrarFormularioAdicionar === false && mostrarFormularioEditar === false" style="width: 50%; margin-top: 3%; margin-left: 25%;">
    
      <b-button class='bg-success mb-2' @click="adicionar()">Adicionar Funcionario</b-button>
    
            <h2 class="card-header bg-primary bg-gradient text-dark">Cadastro de Funcionários</h2>
            <b-table  class="table-striped table-bordered table-hover" :items="items" :fields="fields">
              <template v-slot:cell(acao)="data">
                <b-button class='bg-success' @click="editar(data.item)">Editar</b-button>
                <b-button class="bg-danger" @click="confirmDelete(data.item)">Excluir</b-button>
              </template>
            </b-table>
          </div>
        
        

    <div>
      <b-card v-if="mostrarFormularioAdicionar" class="border-0 shadow-sm mb-3 mt-4" style="width: 50%; margin-top: 3%; margin-left: 25%;">
            <h3 class="card-header bg-primary bg-gradient text-dark">Adicionar Funcionário</h3>
            <div class="card-body">
              <label class="mb-1">
                <span class="text-muted">Nome:</span>
                <input type="email" v-model='nomeFUncionario' name="email" class="form-control">
              </label>
              <div class="mt-1">
                <b-button variant="danger" @click="cancelarAdicionar()">Cancelar</b-button>
              <b-button class='bg-success' @click="handleAdiciona()">Salvar</b-button>
              </div>
             
            </div>
          </b-card>
          <b-card v-if="mostrarFormularioEditar" class="border-0 shadow-sm mb-3 mt-4" style="width: 50%; margin-top: 3%; margin-left: 25%;">
            <h3 class="card-header bg-primary bg-gradient text-dark">Editar Funcionário</h3>
            <div class="card-body">
              <label class="mb-1">
                <span class="text-muted">Nome:</span>
                <input type="email" v-model='nomeFuncionarioEdit' name="email" class="form-control">
              </label>
             <div class="mt-1"> 
              <b-button variant="danger" size="sm"  @click="cancelarEdicao()">Cancelar</b-button>
            <b-button class="bg-success" size="sm" @click="editarFuncionario()">Salvar</b-button></div>
            </div>
          </b-card>
    </div>
    
          
        
  
    <b-modal id="modal-1" ref="modalExcluir" title="Deletar Funcionario" @ok="handleDelete()"  @cancelar="fecharModal()">
          <p class="my-4">Deseja deletar o funcionario ?</p>
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
        { key: 'nome', label: 'Nome' },
        { key: 'acao', label: 'Ações' }
      ],
      items: [],
      idFuncionarioDelete: null,
      nomeFUncionario: '',
      mostrarFormularioAdicionar:false,
      mostrarFormularioEditar: false,
      nomeFuncionarioEdit: '',
      idFuncionarioEdit: null,
    }
  },
  mounted() {
    this.carregarFuncionarios();
  },
  methods: {
    carregarFuncionarios() {
      axios.get('http://localhost:3000/routes/funcionarios/listar')
        .then(response => {
          console.log('RESPONSE', response)
          this.items = response.data.data;
        })
        .catch(error => {
          console.error('Erro ao carregar funcionários:', error);
        });
    },
    handleAdiciona() {
      axios.post('http://localhost:3000/routes/funcionarios/cadastrar', {
        nome: this.nomeFUncionario
      })
        .then(response => {
          console.log('RESPONSE', response)
          this.items = response.data.data;
          this.carregarFuncionarios()
          this.nomeFUncionario = ''
          this.mostrarFormularioAdicionar = false;
        })
        .catch(error => {
          console.error('Erro ao carregar funcionários:', error);
        });
    },
    confirmDelete(item) {
       this.$refs.modalExcluir.show()
       this.idFuncionarioDelete = item.id
    },
    fecharModal() {
      this.$refs.modalExcluir.hide()
      this.idFuncionarioDelete = null
    },
    handleDelete() {
      axios.delete(`http://localhost:3000/routes/funcionarios/excluir/${this.idFuncionarioDelete}`)
        .then(response => {
          console.log('RESPONSE', response)
          this.items = response.data.data;
          this.idFuncionarioDelete = null
          this.carregarFuncionarios()
        })
        .catch(error => {
          console.error('Erro ao carregar funcionários:', error);
        });
    },
    editar(item) {
      this.idFuncionarioEdit = item.id;
      this.nomeFuncionarioEdit = item.nome;
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
    editarFuncionario() {
      axios.put(`http://localhost:3000/routes/funcionarios/alterar/${this.idFuncionarioEdit}`, {
        nome: this.nomeFuncionarioEdit
      })
        .then(response => {
          console.log('RESPONSE', response)
          this.idFuncionarioEdit = '';
          this.nomeFuncionarioEdit = '';
          this.mostrarFormularioEditar = false;
          this.carregarFuncionarios()
        })
        .catch(error => {
          console.error('Erro ao carregar funcionários:', error);
        });
    },
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;700&family=Roboto:wght@100;300;400;500;700;900&family=Source+Sans+Pro:wght@200;300;400;600;700;900&display=swap');
.fundo-preto {
  background-color: #000 !important;
}

</style>