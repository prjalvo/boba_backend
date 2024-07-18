'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    firstName: DataTypes.STRING,  
    email: DataTypes.STRING,  
    role: DataTypes.STRING,
    verify: DataTypes.BOOLEAN,
    password: DataTypes.STRING,  
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, 
    {
     tableName: 'users'
   },                                
  {});

  users.associate = function(models) {    
  };

  return users;
};
