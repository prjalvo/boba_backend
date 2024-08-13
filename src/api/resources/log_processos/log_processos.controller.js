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

    
}
