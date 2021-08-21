import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "./db";

class UserController {
    createToken = (req: any): string => {
        const { username } = req.body;
        const jwtSecret: string = <string>process.env.JWTSECRET;
        const token = jwt.sign({ username: username }, jwtSecret);

        return token;
    };

    verifyToken = (token: string) => {
        const jwtSecret: string = <string>process.env.JWTSECRET;
        let payload: any = "blank";
        try {
            payload = jwt.verify(token, jwtSecret);
        } catch (error) {
            payload = "error";
        }
        return payload;
    };

    login = (req: any, res: any, next: any): void => {
        req.body.outMessage = "Everything ok";
        req.body.outStatus = "OK";
        req.body.outToken = "none";

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
                            req.body.outToken = this.createToken(req);
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
    };
    register = (req: any, res: any, next: any): void => {
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
    };
}

const user = new UserController();
export default user;
