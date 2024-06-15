<script setup lang="ts">
import { ref } from 'vue'
import { type Produto } from '@/interfaces/Produto'
import DefaultCard from '@/components/Forms/DefaultCard.vue'
import InputGroup from '@/components/Forms/InputGroup.vue'
import SelectGroupTwo from '@/components/Forms/SelectGroup/SelectGroupTwo.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import axios from 'axios'

const produto = ref<Produto>({
  nome: '',
  categoria: '',
  dataValidade: '',
  lote: '',
  precoCompra: 0,
  precoVenda: 0,
  quantidade: 0,
  lucroEstimado: 0,
  observacao: ''
})

const calcularLucro = () => {
  produto.value.lucroEstimado = produto.value.quantidade * produto.value.precoVenda
}

const salvaProdutos = () => {
  axios
    .post('http://localhost:3000/dados/produtos', produto.value)
    .then((response) => {
      console.log('Resposta do servidor:', response.data)
    })
    .catch((error) => {
      console.log('Erro na resposta do servidor:', error)
    })
}

const pageTitle = ref('Produtos')
</script>

<template>
  <DefaultLayout>
    <!-- Breadcrumb Start -->
    <BreadcrumbDefault :pageTitle="pageTitle" />

    <div class="grid grid-cols-1 gap-9 sm:grid-cols-2">
      <div class="flex flex-col gap-9">
        <DefaultCard cardTitle="Cadastrar produto">
          <div>
            <div class="p-6.5">
              <div class="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <InputGroup
                  label="Nome do produto"
                  v-model="produto.nome"
                  type="text"
                  customClasses="w-full xl:w-1/2"
                />

                <SelectGroupTwo label="Categoria" v-model="produto.categoria" />
              </div>

              <div class="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <InputGroup
                  label="Data de validade"
                  v-model="produto.dataValidade"
                  type="date"
                  customClasses="w-full xl:w-1/2"
                />

                <InputGroup
                  label="Lote"
                  v-model="produto.lote"
                  type="text"
                  customClasses="w-full xl:w-1/2"
                />
              </div>

              <div class="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <InputGroup
                  label="Preço de compra"
                  v-model="produto.precoCompra"
                  type="number"
                  customClasses="w-full xl:w-1/2"
                />

                <InputGroup
                  @keyup="calcularLucro"
                  label="Preço de venda"
                  v-model="produto.precoVenda"
                  type="number"
                  customClasses="w-full xl:w-1/2"
                />
              </div>

              <div class="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <InputGroup
                  @keyup="calcularLucro"
                  label="Quantidade"
                  v-model="produto.quantidade"
                  type="number"
                  customClasses="w-full xl:w-1/2"
                />

                <InputGroup
                  :disabled="true"
                  label="Lucro estimado"
                  v-model="produto.lucroEstimado"
                  type="number"
                  customClasses="w-full xl:w-1/2"
                />
              </div>

              <div class="mb-6">
                <label class="mb-2.5 block text-black dark:text-white"> Observação </label>
                <textarea
                  v-model="produto.observacao"
                  rows="6"
                  placeholder="Escreva as observações"
                  class="w-full rounded border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                ></textarea>
              </div>

              <button
                @click="salvaProdutos"
                class="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
              >
                Salvar
              </button>
            </div>
          </div>
        </DefaultCard>
      </div>
    </div>
  </DefaultLayout>
</template>
