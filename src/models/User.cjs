'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    address: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    role: DataTypes.STRING,
    verify: DataTypes.BOOLEAN,
    password: DataTypes.STRING,
    id_cargo: DataTypes.INTEGER,
    id_area: DataTypes.INTEGER,
    id_setor: DataTypes.INTEGER,
    id_distrito: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    url_file: DataTypes.STRING,
    lider_celula: DataTypes.STRING,
  }, {});

  user.associate = function(models) {   
    //models.user.hasMany(models.grupos, { foreignKey: 'id' });      
    //   models.user.hasMany(models.user_cargo, {
    //  foreignKey: 'id_cargo',
    //  sourceKey: 'id',
    //  as: 'user_cargo' });     
    //models.user.belongsToMany(models.user_cargo, { as: 'user_cargo',foreignKey: 'id',sourceKey: 'id'});
    models.user.belongsTo(models.cargo, {foreignKey: 'id_cargo' }); 
    models.user.belongsTo(models.areas, {as:'user_area', foreignKey: 'id_area' });      
    models.user.belongsTo(models.areas, {as:'user_distrito', foreignKey: 'id_distrito' });      
    models.user.belongsTo(models.areas, {as:'user_setor', foreignKey: 'id_setor' });  
  };

  return user;
};
