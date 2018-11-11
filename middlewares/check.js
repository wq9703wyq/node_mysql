const check = {
    checkLogin: function checkLogin (req, res, next) {
        if (!req.session.user) {
            res.json({result: false});
        }
        next()
    },

    checkNotLogin: function checkNotLogin (req, res, next) {
        if (req.session.user) {
            res.json({result: '已登录'});
        }
        next()
    }
};

module.exports = check;
