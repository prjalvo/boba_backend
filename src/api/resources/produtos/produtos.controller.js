import { db } from '../../../models/index.js';
import JWT from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import config from '../../../config/app.js';
import bcrypt from 'bcrypt-nodejs';
import speakeasy from 'speakeasy';
import { validateEmail } from './../../../functions.js'
import util from 'util';


export default {
    //async addProdutos(req, res, next) {
        async addProdutos(req, res, next) {
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
            } = req.body;
          
            try {
              const find = await db.produtos.findOne({ where: { codigo: codigo }, paranoid: false });
          
              if (find) {
                throw new Error('Produto já cadastrado');
              }
          
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
              });
          
              if (produto) {
                return res.status(200).json({ success: true, msg: "Produto cadastrado com sucesso." });
              } else {
                res.status(500).json({ success: false });
              }
            } catch (err) {
              console.error(err);
              next(err);
            }
          },

    async getallprodutos(req,res,next){
        db.produtos.findOne({ paranoid: false })
        .then(produto => {
            if (produto) {
                return res.status(200).json({ success: true, data:produto});
            }
            else
                res.status(500).json({ 'success': false });
        })
        .catch(err => {
            console.log(err)
            next(err);
        })
    },

    async getallprodutosid(req,res,next){
        db.produtos.findOne({ where: { codigo_produto: req.query.codigo_produto }, paranoid: false })
        .then(produto => {
            if (produto) {
                return res.status(200).json({ success: true, data:produto});
            }
            else
                res.status(500).json({ 'success': false });
        })
        .catch(err => {
            console.log(err)
            next(err);
        })
    }
}




