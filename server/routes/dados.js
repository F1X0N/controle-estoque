const express = require('express')
const router = express.Router()
const { Pool } = require('pg')
const authenticateToken = require('../middleware/auth')

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
})

router.get('/', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM sua_tabela')
    res.json(result.rows)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Erro no servidor')
  }
})

router.post('/produtos', async (req, res) => {
  try {
    const {
      nome,
      categoria,
      dataValidade,
      lote,
      precoCompra,
      precoVenda,
      quantidade,
      lucroEstimado,
      observacao
    } = req.body

    if (
      !nome ||
      !categoria ||
      !dataValidade ||
      !lote ||
      !precoCompra ||
      !precoVenda ||
      !quantidade ||
      !lucroEstimado
    ) {
      res.status(400).send('Preencha todos os campos')
      return
    }

    await pool.query(
      `INSERT INTO estoque.produtos (create_date, nome, categoria, data_validade, lote, preco_compra, preco_venda, quantidade, lucro_estimado, observacao) VALUES ('NOW()', $1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [
        nome,
        categoria,
        dataValidade,
        lote,
        precoCompra,
        precoVenda,
        quantidade,
        lucroEstimado,
        observacao
      ]
    )
    
    res.status(200).send('Produto adicionado com sucesso')
  } catch (error) {
    console.log(error);
    res.status(500).send('Erro interno do servidor')
  }
})

module.exports = router
