'use strict';
module.exports = (sequelize, DataTypes) => {
  const detalhe_log = sequelize.define('detalhe_log', {   
    mensagem: DataTypes.STRING,
    status: DataTypes.STRING,
    createdat: DataTypes.DATE,
    updatedat: DataTypes.DATE,
    id_log:DataTypes.INTEGER,
    nnf: DataTypes.STRING,
    status: DataTypes.STRING,
    chavenfe: DataTypes.STRING,
    pedido: DataTypes.STRING
  }, 
  {
    // schema: 'rede_verde',  
    tableName: 'detalhe_log'
  }
  );

  detalhe_log.associate = function(models) {    
    models.detalhe_log.belongsTo(models.log_processos, { foreignKey: 'id_log' });  
  };

  return detalhe_log;
};
