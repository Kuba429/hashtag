const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("./db");

class UserController {
    constructor() {
        this.jwtSecret = process.env.JWTSECRET;
    }

    createToken = (req) => {
        const { username } = req.body;
        const token = jwt.sign({ username: username }, this.jwtSecret);

        return token;
    };

    verifyToken = (token) => {
        token = token.split(" ")[1];
        let payload = "blank";
        try {
            payload = jwt.verify(token, this.jwtSecret);
        } catch (error) {
            payload = "error";
        }
        return payload;
    };

    login = (req, res, next) => {
        req.body.outToken = "none";

        const { username } = req.body;

        //get hashed password from db
        pool.query("SELECT * FROM users WHERE username LIKE $1;", [username])
            //good query
            .then((response) => {
                const userRow = response.rows[0];
                const hashedPassword = userRow.password;
                const givenPassword = req.body.password;

                bcrypt
                    .compare(givenPassword, hashedPassword)
                    .then((result) => {
                        if (result === true) {
                            //SUCCESS BLOCK
                            // correct password; give token
                            req.body.outData = "Good password, logged in";
                            req.body.outToken = this.createToken(req);
                        } else {
                            //incorrect password
                            req.body.outData = "Incorrect password";
                            req.body.outStatus = 401;
                        }
                    })
                    .catch((err) => {
                        req.body.outStatus = 500;
                        console.log(err);
                        req.body.outData = err;
                    })
                    .finally(() => {
                        next();
                    });
            })
            //bad query
            .catch((err) => {
                req.body.outStatus = 401;
                req.body.outData = "Wrong username";
                next();
            });
    };
    register = (req, res, next) => {
        const saltRound = parseInt(process.env.SALTROUNDS);
        const { username, password } = req.body;

        bcrypt.hash(password, saltRound, function (err, hash) {
            if (err) {
                req.body.outData = "ERROR";
                req.body.outStatus = 500;

                next();
            } else {
                pool.query(
                    "INSERT INTO users(username,password, created_on)\
             VALUES($1,$2, CURRENT_TIMESTAMP)",
                    [username, hash]
                )
                    .then((response) => {
                        //SUCCESS BLOCK
                        req.body.outData = "User Created";
                    })
                    .catch((err) => {
                        req.body.outStatus = 500;
                        req.body.outData = err;
                    })
                    .finally(() => {
                        next();
                    });
            }
        });
    };
}

const user = new UserController();
module.exports = user;
