import { db } from '../../../models/index.js';
import JWT from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import config from '../../../config/app.js';
import bcrypt from 'bcrypt-nodejs';
import speakeasy from 'speakeasy';
import { validateEmail } from './../../../functions.js';
import util from 'util';
import axios from 'axios';


export default {
  async InserirProdutos(req, res, next) {
     try {
      let pagina = 1;
      const registrosPorPagina = 1000;
      let totalDeRegistros = 0;
      let todosProdutos = [];
      let app_key=""
      let app_secret="" 
   
      const { cd_estabelecimento } = req.body;
      await db.produtos.destroy({ where: { cd_estabelecimento:cd_estabelecimento } });            
      console.log("Estabelecimento: ", cd_estabelecimento);
        if (cd_estabelecimento === 15) {
          app_key = process.env.ApiKey_SP;
          app_secret = process.env.ApiSecret_SP;
        } else if (cd_estabelecimento === 5) {
          app_key = process.env.ApiKey_ES;
          app_secret = process.env.ApiSecret_ES;
        } else {
          app_key = process.env.ApiKey_RJ;
          app_secret = process.env.ApiSecret_RJ;
        }

       console.log('Chaves: ',app_key,app_secret) 
       do {
        const response = await axios.post('https://app.omie.com.br/api/v1/geral/produtos/', {
          call: 'ListarProdutos',
          app_key: app_key,
          app_secret: app_secret,
          param: [{
            pagina:1,
            registros_por_pagina: registrosPorPagina,
            apenas_importado_api: 'N',
            filtrar_apenas_omiepdv: 'N'
          }]
        });

        const produtos = response.data.produto_servico_cadastro;
        totalDeRegistros = response.data.total_de_registros;
        todosProdutos = todosProdutos.concat(produtos);
        
        pagina++;
      } while (todosProdutos.length < totalDeRegistros); 
      
      for (const produto of todosProdutos) {
        await new Promise(resolve => {
          setTimeout(async () => {
            await this.addProdutos(produto);
            resolve();
          }, 100); 
        });
      }

      res.status(200).json({ success: true, message: 'Produtos adicionados com sucesso.' });
    } catch (error) {
      console.error('Erro ao listar produtos:', error);
      res.status(500).json({ success: false, message: 'Erro ao inserir produtos.' });
    }
  },

 
  async addProdutos(produto) {
    const {
      aliquota_cofins,
      aliquota_ibpt,
      aliquota_icms,
      aliquota_pis,
      altura,
      bloqueado,
      bloquear_exclusao,
      cest,
      cfop,
      codInt_familia,
      codigo,
      codigo_beneficio,
      codigo_familia,
      codigo_produto,
      codigo_produto_integracao,
      csosn_icms,
      cst_cofins,
      cst_icms,
      cst_pis,
      descr_detalhada,
      descricao,
      descricao_familia,
      dias_crossdocking,
      dias_garantia,
      ean,
      estoque_minimo,
      exibir_descricao_nfe,
      exibir_descricao_pedido,
      importado_api,
      inativo,
      largura,
      lead_time,
      marca,
      modelo,
      motivo_deson_icms,
      ncm,
      obs_internas,
      per_icms_fcp,
      peso_bruto,
      peso_liq,
      profundidade,
      quantidade_estoque,
      red_base_cofins,
      red_base_icms,
      red_base_pis,
      tipoItem,
      unidade,
      valor_unitario
    } = produto;

    let transaction;
    try {
      transaction = await db.sequelize.transaction();          
      await db.produtos.create({
        aliquota_cofins,
        aliquota_ibpt,
        aliquota_icms,
        aliquota_pis,
        altura,
        bloqueado,
        bloquear_exclusao,
        cest,
        cfop,
        codInt_familia,
        codigo,
        codigo_beneficio,
        codigo_familia,
        codigo_produto,
        codigo_produto_integracao,
        csosn_icms,
        cst_cofins,
        cst_icms,
        cst_pis,
        descr_detalhada,
        descricao,
        descricao_familia,
        dias_crossdocking,
        dias_garantia,
        ean,
        estoque_minimo,
        exibir_descricao_nfe,
        exibir_descricao_pedido,
        importado_api,
        inativo,
        largura,
        lead_time,
        marca,
        modelo,
        motivo_deson_icms,
        ncm,
        obs_internas,
        per_icms_fcp,
        peso_bruto,
        peso_liq,
        profundidade,
        quantidade_estoque,
        red_base_cofins,
        red_base_icms,
        red_base_pis,
        tipoItem,
        unidade,
        valor_unitario
      }, { transaction });

      await transaction.commit();
    } catch (err) {
      console.error(err);
      if (transaction) await transaction.rollback();
      throw err;
    }
  },

  async getAllProdutos(req, res, next) {
    try {
      const produtos = await db.produtos.findAll({ paranoid: false });
      
      if (produtos) {
        return res.status(200).json({ success: true, data: produtos });
      } else {
        return res.status(404).json({ success: false, message: 'Nenhum produto encontrado.' });
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  },

  async getallprodutosid(req, res, next) {
    const { ean } = req.body;
    try {
      const produto = await db.produtos.findOne({ where: { ean }, paranoid: false });
      
      if (produto) {
        return res.status(200).json({ success: true, data: produto });
      } else {
        return res.status(500).json({ success: false, message: 'Produto não encontrado.' });
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  },
};





