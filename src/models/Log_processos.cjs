'use strict';
module.exports = (sequelize, DataTypes) => {
  const log_processos = sequelize.define('log_processos', {
    nome: DataTypes.STRING,  
    mensagem: DataTypes.STRING,
    status: DataTypes.STRING,
    cd_estabelecimento: DataTypes.INTEGER,  
    operadora: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, 
  {
    // schema: 'rede_verde',  
    tableName: 'log_processos'
  }
  );

  log_processos.associate = function(models) {    
    log_processos.hasMany(models.detalhe_log, { foreignKey: 'id_log' });
  };

  return log_processos;
};
