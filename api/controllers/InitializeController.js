/**
 * InitializeController
 *
 * @description :: Server-side logic
 * @help        ::
 */

module.exports = {

    hi: function (req, res) {
        return res.send({
            currentProjects: sails.config.podio.currentProjeects
        });
    }

};

