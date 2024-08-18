'use strict';
module.exports = (sequelize, DataTypes) => {
  const controle_proces_ent = sequelize.controle_proces_ent, {
    nnf: DataTypes.STRING,
    status: DataTypes.STRING,    
    cd_estabelecimento: DataTypes.STRING,
    etapa: DataTypes.STRING,
    createdat: DataTypes.DATE, 
    demissaonfe: DataTypes.DATE    
  }, {
      timestamps: false,  // Desabilita o gerenciamento automático de timestamps
      createdAt: 'createdat',  // Nome do campo para a data de criação
      tableName: 'controle_proces_ent'
  });

  controle_proces_ent.associate = function(models) {      
  };
  return controle_proces_ent;
};
