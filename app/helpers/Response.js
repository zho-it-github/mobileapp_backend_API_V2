
module.exports = {

    ok: function (res, data = undefined) {
        let response = {};
        response.data = data;
        response.status = 200;
        response.success = true;
        return res.json(response);
    },
    notOk: function (res, message = undefined) {
        let response = {};
        response.message = message;
        response.status = 200;
        response.success = false;
        return res.json(response);
    },

};
