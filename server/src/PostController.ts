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
    getPosts = async (req: any, res: any, next: any) => {
        //default outgoing info
        req.body.outMessage = "None";
        req.body.outStatus = "OK";

        //get props
        const { page, howMany, tag } = req.body;

        //query
        try {
            const queryText: string = `SELECT * FROM posts 
            ${
                //add tag clause when given
                tag ? " WHERE tags @> $3 " : ""
            } 
            ORDER BY id DESC 
            FETCH FIRST $1 ROWS ONLY OFFSET $2;`;
            const queryValues = [howMany, howMany * (page - 1)];

            //##TODO##
            //change the clause from tags @> $3 to smth like this:
            //...WHERE 'test' = ANY(tags);
            //better matches; now if letter is contained by tag it returns anyway

            //add tag clause when given
            if (tag) {
                queryValues.push([tag]);
            }

            const response = await pool.query(queryText, queryValues);

            if (response.rows.length < 1) {
                req.body.outMessage = "No posts found";
            } else {
                req.body.outMessage = response.rows;
            }
        } catch (error) {
            console.log(error);
            req.body.outMessage = "DB error";
            req.body.outStatus = "not OK";
        }
        next();
    };
    //get specific post
}

const post = new PostController();
export default post;
