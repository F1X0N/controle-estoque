// Produto.ts
export interface Produto {
  nome: string
  categoria: string
  dataValidade: string
  lote: string
  precoCompra: number
  precoVenda: number
  quantidade: number
  lucroEstimado: number
  observacao: string | null
}
