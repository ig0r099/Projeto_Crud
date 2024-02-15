<template>
  <div>
    <div
      style="width: 50%; margin-top: 3%; margin-left: 25%;">


      <b-button class='bg-success mb-2' v-b-modal.modal-adicionar-jogador> Criar Jogador</b-button>

      <h2 class="card-header bg-dark bg-gradient text-white p-2">Cadastro de Jogador</h2>
      <b-table class="table-striped table-bordered table-hover" :items="items" :fields="fields">
        <template v-slot:cell(acao)="data">
          <b-button class='bg-warning' @click="abrirModalEdicao(data.item)">Editar</b-button>
          <b-button class="bg-danger" @click="confirmDelete(data.item)">Excluir</b-button>
        </template>
      </b-table>
    </div>
    <div>
    </div>

    <b-modal id="modal-1" ref="modalExcluir" title="Deletar Jogador" @ok="handleDelete()" @cancelar="fecharModal()">
      <p class="my-4">Deseja deletar o jogador ?</p>
    </b-modal>
    <b-modal id="modal-adicionar-jogador" ref="modalAdicionarJogador" title="Adicionar Jogador" ok-title="Salvar" @ok="handleAdiciona()" @cancelar="fecharModalAdicionarJogador()">
      <div class="mb-3">
        <label for="idTime">Time:</label>
        <select v-model="idTime" class="form-control">
          <option v-for="time in times" :key="time.id" :value="time.id">{{ time.nome }}</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="nomeJogador">Nome:</label>
        <input id="nomeJogador" type="text" v-model="nomeJogador" class="form-control">
      </div>
    </b-modal>
    <b-modal id="modal-editar-jogador" ref="modalEditar" title="Editar Jogador" ok-title="Salvar" @ok="editarJogador()" @cancelar="fecharModalEditarJogador()">
      <div class="mb-3">
        <label for="nomeJogadorEdit">Nome:</label>
        <input id="nomeJogadorEdit" type="text" v-model="nomeJogadorEdit" class="form-control">
      </div>
      <div class="mb-3">
        <label for="idTimeEdit">Time:</label>
        <select v-model="idTimeEdit" class="form-control">
          <option v-for="time in times" :key="time.id" :value="time.id">{{ time.nome }}</option>
        </select>
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
        { key: 'Jogador', label: 'Jogador' },
        { key: 'Time', label: 'Time' },
        { key: 'acao', label: 'Ações' }
      ],
      items: [],
      times:[],
      idJogadorDelete: null,
      nomeJogador: '',
      idTime: '',
      idTimeEdit:'',
      nomeJogadorEdit: '',
      idJogadorEdit: null,
    }
  },
  mounted() {
    this.carregarJogadors();
  },
  methods: {
    carregarJogadors() {
      axios.get('http://localhost:3000/routes/jogadores/listar')
        .then(response => {
          this.items = response.data.data;
        })
        .catch(error => {
          console.error('Erro ao carregar Jogador:', error);
        });
        axios.get('http://localhost:3000/routes/times/listar')
        .then(response => {
          this.times = response.data.data;
        })
        .catch(error => {
          console.error('Erro ao carregar Jogador:', error);
        });
    },
    handleAdiciona() {
      axios.post('http://localhost:3000/routes/jogadores/cadastrar', {
        nome: this.nomeJogador,
        id_time: this.idTime,
      })
        .then(response => {
          this.items = response.data.data;
          this.carregarJogadors()
          this.$toast.success('Jogador adicionado com sucesso');
          this.nomeJogador = ''
        })
        .catch(error => {
          console.error('Erro ao carregar funcionários:', error);
        });
    },
    confirmDelete(item) {
      this.$refs.modalExcluir.show()
      this.idJogadorDelete = item.id
    },
    fecharModal() {
      this.$refs.modalExcluir.hide()
      this.idJogadorDelete = null
    },
    handleDelete() {
      axios.delete(`http://localhost:3000/routes/jogadores/excluir/${this.idJogadorDelete}`)
        .then(response => {
          this.items = response.data.data;
          this.idJogadorDelete = null
          this.carregarJogadors()
          this.$toast.success('Jogador deletado com sucesso');
        })
        .catch(error => {
          console.error('Erro ao carregar jogadores:', error);
        });
    },
    fecharModalAdicionarJogador() {
      this.$refs.modalExcluir.hide()
      this.nomeJogador = '';
      this.idTime = '';
    },
    abrirModalEdicao(item) {
      this.$refs.modalEditar.show()
      this.idJogadorEdit = item.id;
      this.nomeJogadorEdit = item.Jogador;
      this.idTimeEdit = item.IdTime;
    },
    fecharModalEditarJogador() {
      this.$refs.modalEditar.hide()
      this.idJogadorEdit ='';
      this.nomeJogadorEdit = '';
      this.idTimeEdit = '';
    },
    editarJogador() {
      axios.put(`http://localhost:3000/routes/jogadores/alterar/${this.idJogadorEdit}`, {
        nome: this.nomeJogadorEdit,
        id_time: this.idTimeEdit,
      })
        .then(() => {
          this.idJogadorEdit = '';
          this.nomeJogadorEdit = '';
          this.carregarJogadors()
          this.$toast.success('Jogador alterado com sucesso');
        })
        .catch(error => {
          console.error('Erro ao carregar jogadores:', error);
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
