'use strict';
module.exports = (sequelize, DataTypes) => {
  const filiais = sequelize.define('filiais', {
    cd_estabelecimento: {type: DataTypes.INTEGER,primaryKey: true},
    nome: DataTypes.STRING,
    depositante: DataTypes.STRING,    
    api_key: DataTypes.STRING,
    api_secret: DataTypes.STRING,
    logistica: DataTypes.STRING,
    processar: DataTypes.STRING,
    cnpj: DataTypes.STRING,  
    createdAt: DataTypes.DATE, 
    updatedAt: DataTypes.DATE    
  }, {});

  filiais.associate = function(models) {      
  };
  return filiais;
};
