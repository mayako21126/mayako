module.exports = function (app,express) {
    //require('./jwt')(app);
    app.get('/index', function (req, res) {
        res.render('index');
    });
    var jwt = require("jsonwebtoken");
    var User = global.dbHelper.getModel('Users');

    process.env.JWT_SECRET = "asdklq2je3l123nkl1230-4124jmnl15";

    app.post('/api/authenticate',function (req, res) {

        User.findOne({email: req.body.email, password: req.body.password}, function (err, user) {
            if (err) {
                res.json({
                    type: false,
                    data: "Error occured: " + err
                });
            } else {
                console.log(user)
                if (user) {
                    res.json({
                        type: true,
                        data: user,
                        token: user.token
                    });
                } else {
                    res.json({
                        type: false,
                        data: "Incorrect email/password"
                    });
                }
            }
        });
    });
    app.post('/api/signin',function (req, res) {


        User.findOne({email: req.body.email, password: req.body.password}, function (err, user) {
            if (err) {
                res.json({
                    type: false,
                    data: "Error occured: " + err
                });
            } else {

                if (user) {
                    res.json({
                        type: false,
                        data: "User already exists!"
                    });
                } else {
                    var userModel = new User();
                    userModel.email = req.body.email;
                    userModel.password = req.body.password;
                    userModel.save(function (err, user) {
                       user.token = jwt.sign(user, process.env.JWT_SECRET,{'expiresIn':"2 days"});
                      //  user.token = jwt.sign(user, process.env.JWT_SECRET, { expiresInMinutes: 60*5 })
                        //   'expiresInMinutes': 1440000 // 设置过期时间
                        //})
                        user.save(function (err, user1) {
                            res.json({
                                type: true,
                                data: user1,
                                token: user1.token
                            });
                        });
                    })
                }
            }
        });
    });
    app.get('/api/me', [ensureAuthorized], function (req, res) {
        User.findOne({email: req.body.email, password: req.body.password}, function (err, user) {
            if (err) {
                res.json({
                    type: false,
                    data: "Error occured: " + err
                });
            } else {
                res.json({
                    type: true,
                    data: user
                });
            }
        });
    });
    function ensureAuthorized(req, res, next) {
        var bearerHeader = req.headers['x-access-token'];
        console.log(req.headers)
        if (typeof bearerHeader !== 'undefined') {

            jwt.verify(bearerHeader, process.env.JWT_SECRET, function(err, decoded) {
                if (err) {
                    return res.json({ success: false, message: 'token信息错误.' });
                } else {
                    // 如果没问题就把解码后的信息保存到请求中，供后面的路由使用
                    console.log(decoded)
                    req.api_user = decoded;
                    req.body=decoded._doc;
                    next();
                }
            });

        } else {
            res.send(403);
        }
    }


}