/**
* Projects.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

"use strict";

var Firebase = require('firebase');
var projectsRef = new Firebase('https://blistering-torch-551.firebaseio.com/projects');

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

    create: function(project, callback) {
        projectsRef.child(project.id).set(project, function(error){
            if (error){
                console.log('firebase creation error');
                callback(error);
            }
            else {
                console.log('firebase creation successful');
                callback();
            }
        });
    }
};

