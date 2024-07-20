import { db } from '../../../models/index.js';
import JWT from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import config from '../../../config/app.js';
import bcrypt from 'bcrypt-nodejs';
import speakeasy from 'speakeasy';
import { validateEmail } from './../../../functions.js'
import util from 'util';
import axios from 'axios'


async function truncateprodutos(cd_estabelecimento,res, next) {
  return db.produtos.destroy({ where: { cd_estabelecimento:cd_estabelecimento } })           
  .then(re => {
      return res.status(200).json({ 'status': "Produto detelado" });
  }).catch(err => {
      next(err)
  })
}

async const listarProdutos(cd_estabelecimento, res, next) {
  try {
    let pagina = 1;
    const registrosPorPagina = 1000;
    let totalDeRegistros = 0;
    let todosProdutos = [];
    let app_key = "";
    let app_secret = "";

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

    do {
      const response = await axios.post('https://app.omie.com.br/api/v1/geral/produtos/', {
        call: 'ListarProdutos',
        app_key: app_key,
        app_secret: app_secret,
        param: [{
          pagina: pagina,
          registros_por_pagina: registrosPorPagina,
          apenas_importado_api: 'N',
          filtrar_apenas_omiepdv: 'N'
        }]
      });

      console.log('Chaves', app_key, app_secret);
      const produtos = response.data.produto_servico_cadastro;
      totalDeRegistros = response.data.total_de_registros;
      todosProdutos = todosProdutos.concat(produtos);

      pagina++;
    } while (todosProdutos.length < totalDeRegistros);

    return todosProdutos;
  } catch (error) {
    console.error('Erro ao listar produtos:', error);
    return [];
  }
}

  async function addProdutos(produto) {    
    const produto1 = {
      aliquota_cofins: produto.aliquota_cofins,
      aliquota_ibpt: produto.aliquota_ibpt,
      aliquota_icms: produto.aliquota_icms,
      aliquota_pis: produto.aliquota_pis,
      altura: produto.altura,
      bloqueado: produto.bloqueado,
      bloquear_exclusao: produto.bloquear_exclusao,
      cest: produto.cest,
      cfop: produto.cfop,
      codInt_familia: produto.codInt_familia,
      codigo: produto.codigo,
      codigo_beneficio: produto.codigo_beneficio,
      codigo_familia: produto.codigo_familia,
      codigo_produto: produto.codigo_produto,
      codigo_produto_integracao: produto.codigo_produto_integracao,
      csosn_icms: produto.csosn_icms,
      cst_cofins: produto.cst_cofins,
      cst_icms: produto.cst_icms,
      cst_pis: produto.cst_pis,
      descr_detalhada: produto.descr_detalhada,
      descricao: produto.descricao,
      descricao_familia: produto.descricao_familia,
      dias_crossdocking: produto.dias_crossdocking,
      dias_garantia: produto.dias_garantia,
      ean: produto.ean,
      estoque_minimo: produto.estoque_minimo,
      exibir_descricao_nfe: produto.exibir_descricao_nfe,
      exibir_descricao_pedido: produto.exibir_descricao_pedido,
      importado_api: produto.importado_api,
      inativo: produto.inativo,
      largura: produto.largura,
      lead_time: produto.lead_time,
      marca: produto.marca,
      modelo: produto.modelo,
      motivo_deson_icms: produto.motivo_deson_icms,
      ncm: produto.ncm,
      obs_internas: produto.obs_internas,
      per_icms_fcp: produto.per_icms_fcp,
      peso_bruto: produto.peso_bruto,
      peso_liq: produto.peso_liq,
      profundidade: produto.profundidade,
      quantidade_estoque: produto.quantidade_estoque,
      red_base_cofins: produto.red_base_cofins,
      red_base_icms: produto.red_base_icms,
      red_base_pis: produto.red_base_pis,
      tipoItem: produto.tipoItem,
      unidade: produto.unidade,
      valor_unitario: produto.valor_unitario
     };

    let transaction;
    try {
      transaction = await db.sequelize.transaction();          
      const produto = await db.produtos.create({
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
  
      if (produto) {
        return res.status(200).json({ success: true, msg: "Produto cadastrado com sucesso." });
      } else {
        res.status(500).json({ success: false });
      }
    } catch (err) {
      console.error(err);
      if (transaction) await transaction.rollback();
      next(err);
    }
   }


export default {       
      async InserirProdutos(req,res,next){
           try {
            const { cd_estabelecimento } = req.body;
            truncateprodutos(cd_estabelecimento);            
            console.log("Estabelecimento: ",cd_estabelecimento)
            const produtos = await listarProdutos(cd_estabelecimento);   
            truncateprodutos("Produtos Listados");  
            for (const produto of produtos) {
              await new Promise(resolve => {
                setTimeout(() => {
                  addProdutos(produto);
                  resolve();
                }, 1000); 
              });
            }        
            res.status(200).json({ success: true, message: 'Produtos adicionados com sucesso.' });
          } catch (error) {
            console.error('Erro ao listar produtos:', error);
            res.status(500).json({ success: false, message: 'Erro ao listar produtos.' });
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
    async getallprodutosid(req,res,next){
        const { ean } = req.body;
        db.produtos.findOne({ where: { ean: ean }, paranoid: false })
        .then(produtos => {
            if (produtos) {
                return res.status(200).json({ success: true, data:produtos});
            }
            else
                res.status(500).json({ 'success': false });
        })
        .catch(err => {
            console.log(err)
            next(err);
        })
    },   
}




