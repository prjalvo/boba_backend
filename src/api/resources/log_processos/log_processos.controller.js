import { db } from '../../../models/index.js';
import JWT from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import config from '../../../config/app.js';
import bcrypt from 'bcrypt-nodejs';
import speakeasy from 'speakeasy';
import { validateEmail } from './../../../functions.js'
import util from 'util';



export default {
    async addlog_processos(req, res, next) {
    const { nome, mensagem, status, cd_estabelecimento, operadora } = req.body;

    try {
        // Cria um novo registro diretamente
        const log_processos = await db.log_processos.create({
            nome: nome,
            mensagem: mensagem,
            status: status,
            cd_estabelecimento: cd_estabelecimento,
            operadora: operadora
        });

        // Se o registro foi criado com sucesso, retorna uma resposta positiva
        res.status(200).json({ success: true, data: log_processos });
    } catch (err) {
        // Em caso de erro, retorna uma resposta de erro
        res.status(400).json({ 'success': false,err });
        next(err);
    }
},
     async getlog_processos(req,res,next){
        db.log_processos.findAll({order: [['createdAt', 'DESC']],include: [{ model: db.detalhe_log}] })
        .then(log_processos => {
            if (log_processos) {
                return res.status(200).json({ success: true, data:log_processos});
            }
            else
                res.status(500).json({ 'success': false });
        })
        .catch(err => {
            console.log(err)
            next(err);
        })
    },
    async addCTRL(req, res, next) {
    const { nnf, status, cd_estabelecimento, etapa, demissaonfe } = req.body;
    try {
        // Cria um novo registro diretamente
        const ctrl_process = await db.controle_proces_ent.create({
            nnf: nnf,            
            status: status,
            cd_estabelecimento: cd_estabelecimento,
            etapa: etapa,
            demissaonfe: demissaonfe
        });

        // Se o registro foi criado com sucesso, retorna uma resposta positiva
        res.status(200).json({ success: true, data: ctrl_process });
    } catch (err) {
        // Em caso de erro, retorna uma resposta de erro
        res.status(400).json({ 'success': false,err });
        next(err);
    }
  },

    // async getCTRL(req,res,next){
    //     db.controle_proces_ent.findAll({order: [['demissaonfe', 'DESC']]})
    //     .then(log_processos => {
    //         if (log_processos) {
    //             return res.status(200).json({ success: true, data:log_processos});
    //         }
    //         else
    //             res.status(500).json({ 'success': false });
    //     })
    //     .catch(err => {
    //         console.log(err)
    //         next(err);
    //     })
    // },

    async getCTRL(req, res, next) {
    try {
        // Get page and limit from query parameters or set default values
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        // Calculate offset
        const offset = (page - 1) * limit;

        // Query the database with pagination
        const log_processos = await db.controle_proces_ent.findAndCountAll({
            order: [['demissaonfe', 'DESC']],
            limit: limit,
            offset: offset
        });

        if (log_processos) {
            return res.status(200).json({
                success: true,
                data: log_processos.rows,
                totalRecords: log_processos.count,
                totalPages: Math.ceil(log_processos.count / limit),
                currentPage: page
            });
        } else {
            return res.status(500).json({ success: false });
        }
    } catch (err) {
        console.log(err);
        next(err);
    }
  },
     async CTRLUpdate(req,res,next){
        const { id,nnf, status, cd_estabelecimento, etapa, demissaonfe } = req.body;        
        db.controle_proces_ent.findOne({ where: { id: id }, paranoid: false })
            .then(controle_proces_ent => {
                if (!controle_proces_ent) {
                    throw new RequestError('CTRL Não encontrada', 409);
                }
                return db.controle_proces_ent.update({
                    nnf: nnf ? nnf : controle_proces_ent.nnf,            
                    status: status ? status : controle_proces_ent.status  ,
                    cd_estabelecimento: cd_estabelecimento ? cd_estabelecimento : controle_proces_ent.cd_estabelecimento,
                    etapa: etapa ? etapa : controle_proces_ent.etapa,
                    demissaonfe: demissaonfe ? demissaonfe :  controle_proces_ent.demissaonfe              
                }, { where: { id: id } })
            })
            .then(controle_proces_ent => {
                if (controle_proces_ent) {
                    return res.status(200).json({ success: true, msg: "CTRL Atualizada com Sucesso"});
                }
                else
                    res.status(500).json({ 'success': false });
            })
            .catch(err => {
                console.log(err)
                next(err);
            })
    },
      async deleteCTRL(req, res, next) {
        db.controle_proces_ent.findOne({ where: { id: req.body.id} })
            .then(data => {
                if (data) {
                    return db.controle_proces_ent.destroy({ where: { id: req.body.id } }).then(r => [r, data])
                }
                throw new RequestError('User is not found', 409)
            })
            .then(re => {
                return res.status(200).json({ 'status': "deleted userlist Seccessfully" });
            }).catch(err => {
                next(err)
            })
    }
    
}
