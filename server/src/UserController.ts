import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "./db";

class UserController {
    jwtSecret: string;
    constructor() {
        this.jwtSecret = <string>process.env.JWTSECRET;
    }

    createToken = (req: any): string => {
        const { username } = req.body;
        const token = jwt.sign({ username: username }, this.jwtSecret);

        return token;
    };

    verifyToken = (token: string) => {
        token = token.split(" ")[1]
        let payload: any = "blank";
        try {
            payload = jwt.verify(token, this.jwtSecret);
        } catch (error) {
            payload = "error";
        }
        return payload;
    };

    login = (req: any, res: any, next: any): void => {
        
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
    register = (req: any, res: any, next: any): void => {
        const saltRound = parseInt(<string>process.env.SALTROUNDS);
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
export default user;
