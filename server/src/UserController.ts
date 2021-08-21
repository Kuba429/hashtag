import bcrypt from "bcrypt";

import pool from "./db";

class UserController {
    constructor() {}

    register(req: any, res: any, next: any) {
        req.body.outMessage = "Fine";
        req.body.outStatus = "OK";
        const saltRound = parseInt(<string>process.env.SALTROUNDS);
        const { username, password } = req.body;

        bcrypt.hash(password, saltRound, function (err, hash) {
            if (err) {
                req.body.outMessage = "ERROR";
                req.body.outStatus = "Not OK, MARK 1";

                next();
            } else {
                pool.query(
                    "INSERT INTO users(username,password, created_on)\
             VALUES($1,$2, CURRENT_TIMESTAMP)",
                    [username, hash]
                )
                    .then((response) => {
                        //SUCCESS BLOCK
                        req.body.outMessage = "User Created";
                    })
                    .catch((err) => {
                        req.body.outStatus = "Not OK";
                        req.body.outMessage = err;
                    })
                    .finally(() => {
                        next();
                    });
            }
        });
    }

    login(req: any, res: any, next: any) {
        req.body.outMessage = "Everything ok";
        req.body.outStatus = "OK";
        //get data from req body
        const { username } = req.body;

        //get hashed password from db

        pool.query("SELECT * FROM users WHERE username LIKE $1;", [username])
            //good query
            .then((response) => {
                const userRow: any = response.rows[0];
                const hashedPassword = userRow.password;
                const givenPassword = req.body.password;

                bcrypt
                    .compare(givenPassword, hashedPassword)
                    .then((result) => {
                        if (result === true) {
                            //SUCCESS BLOCK
                            // correct password; give token
                            req.body.outMessage = "Good password, logged in";
                        } else {
                            //incorrect password
                            req.body.outMessage = "Incorrect password";
                            req.body.outStatus = "Not ok";
                        }
                    })
                    .catch((err) => {
                        req.body.outStatus = "Not OK1";
                        console.log(err);
                        req.body.outMessage = err;
                    })
                    .finally(() => {
                        next();
                    });
            })
            //bad query
            .catch((err) => {
                req.body.outStatus = "Not OK";
                req.body.outMessage = "Wrong username";
                next();
            });
    }
}

const user = new UserController();
export default user;
