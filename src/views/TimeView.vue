<template>
  <div >

    <div style="width: 50%; margin-top: 3%; margin-left: 25%;">
      <b-button class='bg-success mb-2' v-b-modal.modal-adicionar> Criar Time</b-button>

            <h2 class="card-header bg-dark bg-gradient text-white p-2">Cadastro de Time</h2>
            <b-table  class="table-striped table-bordered table-hover" :items="items" :fields="fields">
              <template v-slot:cell(acao)="data">
                <b-button class='bg-warning' @click="abrirModalEdicao(data.item)">Editar</b-button>
                <b-button class="bg-danger" @click="confirmDelete(data.item)">Excluir</b-button>
              </template>
            </b-table>
          </div>
    <div>

    </div>

        <b-modal id="modal-1" ref="modalExcluir" title="Deletar Time" @ok="handleDelete()"  @cancelar="fecharModal()">
          <p class="my-4">Deseja deletar o time ?</p>
        </b-modal>

        <b-modal id="modal-adicionar" ref="modalAdicionarTime" title="Adicionar Time" ok-title="Salvar" @ok="handleAdiciona()" @cancelar="fecharModalAdicionarTime()">
         <div class="mb-3">
           <label for="nome">Nome:</label>
           <input id="nome" type="text" v-model="nomeTime" class="form-control">
         </div>
         </b-modal>
         <b-modal id="modal-editar" ref="modalEditar" title="Editar Time" ok-title="Salvar" @ok="editarTime()" @cancelar="fecharModalEditarTime()">
           <div class="mb-3">
            <label for="nomeTimeEdit">Nome:</label>
            <input id="nomeTimeEdit" type="text" v-model="nomeTimeEdit" class="form-control">
           </div>
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
      idTimeDelete: null,
      nomeTime: '',
      nomeTimeEdit: '',
      idTimeEdit: null,
    }
  },
  mounted() {
    this.carregarTimes();
  },
  methods: {
    carregarTimes() {
      axios.get('http://localhost:3000/routes/times/listar')
        .then(response => {
          this.items = response.data.data;
        })
        .catch(error => {
          console.error('Erro ao carregar times:', error);
        });
    },
    handleAdiciona() {
      axios.post('http://localhost:3000/routes/times/cadastrar', {
        nome: this.nomeTime
      })
        .then(response => {
          this.items = response.data.data;
          this.carregarTimes()
          this.nomeTime = ''
          this.$toast.success('Time adicionado com sucesso');
        })
        .catch(error => {
          console.error('Erro ao carregar times:', error);
        });
    },
    confirmDelete(item) {
       this.$refs.modalExcluir.show()
       this.idTimeDelete = item.id
    },
    fecharModal() {
      this.$refs.modalExcluir.hide()
      this.idTimeDelete = null
    },
    handleDelete() {
      axios.delete(`http://localhost:3000/routes/times/excluir/${this.idTimeDelete}`)
        .then(response => {
          this.items = response.data.data;
          this.idTimeDelete = null
          this.carregarTimes()
          this.$toast.success('Time deletado com sucesso');
        })
        .catch(error => {
          console.error('Erro ao carregar times:', error);
        });
    },
    abrirModalEdicao(item) {
      this.$refs.modalEditar.show()
      this.idTimeEdit = item.id;
      this.nomeTimeEdit = item.nome;
    },
    fecharModalEditarTime() {
      this.$refs.modalEditar.hide()
      this.idTimeEdit ='';
      this.nomeTimeEdit = '';
    },
    fecharModalAdicionarTime() {
      this.$refs.modalExcluir.hide()
      this.nomeTime = '';
    },
    editarTime() {
      axios.put(`http://localhost:3000/routes/times/alterar/${this.idTimeEdit}`, {
        nome: this.nomeTimeEdit
      })
        .then(() => {
          this.idTimeEdit = '';
          this.nomeTimeEdit = '';
          this.mostrarFormularioEditar = false;
          this.carregarTimes()
          this.$toast.success('Time alterado com sucesso');
        })
        .catch(error => {
          console.error('Erro ao carregar times:', error);
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
