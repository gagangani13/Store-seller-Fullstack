const {Sequelize, INTEGER, STRING}=require('sequelize');
const database=require('../database/database');
module.exports.Items=database.define('GeneralStore',{
    id:{
        primaryKey:true,
        autoIncrement:true,
        type:INTEGER
    },
    itemName:{
        allowNull:false,
        type:STRING,
        unique:true
    },
    description:{
        allowNull:false,
        type:STRING
    },
    quantity:{
        allowNull:false,
        type:INTEGER
    },
    price:{
        allowNull:false,
        type:INTEGER
    }
})