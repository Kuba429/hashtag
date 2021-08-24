import jwt from "jsonwebtoken";
import pool from "./db";
import user from "./UserController";

class PostController {
    jwtSecret: string;
    constructor() {
        this.jwtSecret = <string>process.env.JWTSECRET;
    }
    add = async (req: any, res: any, next: any) => {
        //default outgoing info
        req.body.outMessage = "None";
        req.body.outStatus = "OK";

        //get token
        let token: string = req.headers.authorization;
        token = token.split(" ")[1];

        //check if token is ok & get token data
        const userData = user.verifyToken(<string>token);
        if (userData == "error") {
            req.body.outMessage = "Wrong token";
            req.body.outStatus = "not OK";
        } else {
            //info about post and user
            const { content, tags, featuredImage } = req.body.post;
            const username = user.verifyToken(<string>token).username;
            //query
            try {
                const queryText = `INSERT INTO posts (content, author,tags, created_on ${
                    featuredImage ? ", featured_img" : ""
                }) 
                VALUES($1,$2,$3, CURRENT_TIMESTAMP ${
                    featuredImage ? ", $4" : ""
                })`;
                let queryValues: any = [content, username, tags];
                if (featuredImage) {
                    queryValues.push(featuredImage);
                }

                let response = await pool.query(queryText, queryValues);

                req.body.outMessage = "post added";
                req.body.outStatus = "OK";
            } catch (error) {
                req.body.outMessage = "db error";
                // req.body.outMessage = error.stack;
                req.body.outStatus = "not OK";
            }
        }

        next();
    };

    //get all posts

    //get specific post
}

const post = new PostController();
export default post;
