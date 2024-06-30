import { db } from '../../../models/index.js';
import JWT from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import config from '../../../config/app.js';
import bcrypt from 'bcrypt-nodejs';
import speakeasy from 'speakeasy';
import { validateEmail } from './../../../functions.js'
import util from 'util';



export default {
    async addFiliais(req, res, next) {
        const { nome, depositante,cd_estabelecimento,api_key,api_secret,logistica,processar,cnpj } = req.body;
        db.filiais.findOne({ where: { nome: nome }, paranoid: false })
            .then(find => {
                if (find) {
                    throw new RequestError('Filiasl já cadastrada', 409);
                }
                return db.filiais.create({
                    nome: nome,                    
                    depositante: depositante,                      
                    cd_estabelecimento: cd_estabelecimento,
                    api_key: api_key,
                    api_secret: api_secret,
                    logistica: logistica,
                    processar: processar,                    
                    cnpj: cnpj
                })

            })
            .then(user => {
                if (user) {
//                     mailer.sendEmployeePassword(email, token);
                    return res.status(200).json({ success: true, key: otp, msg: "New Registration added and password has been sent to " + email + " ." });
                }
                else
                    res.status(500).json({ 'success': false });
            })
            .catch(err => {
                console.log(err)
                next(err);
            })
    },

     async getAllFiliais(req,res,next){
        db.filiais.findAll({ })
        .then(filiais => {
            if (filiais) {
                return res.status(200).json({ success: true, data:filiais});
            }
            else
                res.status(500).json({ 'success': false });
        })
        .catch(err => {
            console.log(err)
            next(err);
        })
    },

     async filiaisUpdate(req,res,next){
        const { id, nome, depositante,cd_estabelecimento,api_key,api_secret,logistica,processar,cnpj } = req.body;
        
        db.filiais.findOne({ where: { id: id }, paranoid: false })
            .then(user => {
                if (!user) {
                    throw new RequestError('User is not found', 409);
                }
                return db.filiais.update({
                    nome: nome ? nome : filiais.nome,                    
                    depositante: depositante ? depositante : filiais.depositante,                      
                    cd_estabelecimento: cd_estabelecimento ? cd_estabelecimento : filiais.cd_estabelecimento,
                    api_key: api_key ? api_key : filiais.api_key,
                    api_secret: api_secret ? api_secret : filiais.api_secret,
                    logistica: logistica ? logistica : filiais.logistica,
                    processar: processar ? processar : filiais.processar,                    
                    cnpj: cnpj ? cnpj : filiais.cnpj                     
                }, { where: { id: id } })
            })
            .then(user => {
                if (user) {
                    return res.status(200).json({ success: true, msg: "User update successsfully"});
                }
                else
                    res.status(500).json({ 'success': false });
            })
            .catch(err => {
                console.log(err)
                next(err);
            })
    },
      async deleteFiliais(req, res, next) {
        db.filiais.findOne({ where: { id: req.body.id} })
            .then(data => {
                if (data) {
                    return db.filiais.destroy({ where: { id: req.body.id } }).then(r => [r, data])
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
