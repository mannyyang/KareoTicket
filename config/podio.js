/**
 * Default podio configuration
 * (sails.config.podio)
 *
 * Unless you override them, the following properties will be included
 * in each of your podio apps.
 *
 */

module.exports.podio = {

    /***************************************************************************
     *                                                                          *
     * The Podio API lets developers build apps on top of the Podio             *
     * platform.                                                                *
     *                                                                          *
     *                                                                          *
     ***************************************************************************/
    clientId: 'kareo-ticket',

    clientSecret: '6xV6SSW7Q2NMy67w7EYFMAL5DLA5JOZHcODilKPnAtAMU4F2kDQG8AnK4Bq5lCU1',

    userName: 'marketing@kareo.com',

    password: 'kareo123',

    token: {
        accessToken: "",
        created_at: null,
        expires_at: null
    },

    webProjectsId: 9819541,

    milestonesId: 9819584,

    currentProjectsViewId: 9077279,

    currentProjects: {},

    processedProjects: []
};
