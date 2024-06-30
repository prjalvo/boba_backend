'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    firstName: DataTypes.STRING,  
    email: DataTypes.STRING,  
    role: DataTypes.STRING,
    verify: DataTypes.BOOLEAN,
    password: DataTypes.STRING,  
  }, {});

  user.associate = function(models) {    
  };

  return user;
};
