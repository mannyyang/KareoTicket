/**
* Item.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

"use strict";

var Firebase = require('firebase');
var projectsRef = new Firebase('https://blistering-torch-551.firebaseio.com/items');

module.exports = {

    // TODO: add model attributes
    attributes: {

        id: {
            type:'integer',
            required: 'true'
        },
        name: {
            type: 'string'
        }

    },

    create: function(item, callback) {
        projectsRef.child(item.id).set(item, function(error){
            if (error){
                console.log('firebase creation error');
                return callback(error);
            }
            else {
                console.log('firebase creation successful');
                return callback();
            }
        });
    },
    
    remove: function(itemID, callback){
        projectsRef.child(itemID).set(null, function(error){
            if (error){
                console.log('firebase deletion error');
                return callback(error, {message: "firebase deletion error"});
            }
            else {
                console.log('firebase deletion successful');
                return callback(error, {message: "firebase deletion successful."});
            }
        });
    }
};

