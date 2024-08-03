'use strict';
module.exports = (sequelize, DataTypes) => {
  const filiais = sequelize.define('filiais', {
    id: {type: DataTypes.INTEGER,primaryKey: true},
    cd_estabelecimento: {type: DataTypes.INTEGER,primaryKey: true},
    depositante: DataTypes.STRING,
    nome: DataTypes.STRING,   
    cnpj: DataTypes.STRING,  
    createdAt: DataTypes.DATE, 
    updatedAt: DataTypes.DATE    
  }, {

    tableName: 'filiais'
  });

  filiais.associate = function(models) {      
  };
  return filiais;
};
