export default {

    /**
     * Here you may specify which of the database connections below you wish
     * to use as your default connection for all database work. 
     */
    connection : process.env.DB_CONNECTION || "postgres",
    
    dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false // Use this option for self-signed certificates
        }
      },   

    host  : process.env.DB_HOST || "185.228.72.82",

    
    /**
     * Here you may specify the port of database which will be
     * used for connection
     */
    port : process.env.DB_PORT || 5432,


    /**
     * Here you may specify the database name of connection which will be
     * used for connection
     */
    database  : process.env.DB_DATABASE || "iba",

    
    /**
     * Here you may specify the username of database which will be
     * used for connection
     */
    username : process.env.DB_USERNAME || "iba_verde",

    
    /**
     * Here you may specify the password of database which will be
     * used for connection
     */
    password : process.env.DB_PASSWORD || "Matvdt68#",
}
