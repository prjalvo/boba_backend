'use strict';
module.exports = (sequelize, DataTypes) => {
  const controle_proces_saida = sequelize.define('controle_proces_saida', { 
    nnf: DataTypes.STRING,
    status: DataTypes.STRING,    
    cd_estabelecimento: DataTypes.STRING,
    etapa: DataTypes.STRING,
    createdat: DataTypes.DATE, 
    demissaonfe: DataTypes.DATE    
  }, {
      timestamps: false,  // Desabilita o gerenciamento automático de timestamps
      createdAt: 'createdat',  // Nome do campo para a data de criação
      tableName: 'controle_proces_saida'
  });

  controle_proces_saida.associate = function(models) {   
    models.controle_proces_saida.belongsTo(models.filiais, { foreignKey: 'cd_estabelecimento' });
  };
  return controle_proces_saida;
};
