'use strict';
module.exports = (sequelize, DataTypes) => {
  const filiais = sequelize.define('filiais', {  
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
    filiais.hasMany(models.controle_proces_ent, { foreignKey: 'cd_estabelecimento' });
    filiais.hasMany(models.log_processos, { foreignKey: 'cd_estabelecimento' });
    filiais.hasMany(models.produtos, { foreignKey: 'cd_estabelecimento' });
  };
  return filiais;
};
