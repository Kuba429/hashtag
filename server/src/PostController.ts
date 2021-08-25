import jwt from "jsonwebtoken";
import pool from "./db";
import user from "./UserController";

class PostController {
    jwtSecret: string;
    constructor() {
        this.jwtSecret = <string>process.env.JWTSECRET;
    }
    add = async (req: any, res: any, next: any) => {
        //get token
        let token: string = req.headers.authorization;
        token = token.split(" ")[1];

        //check if token is ok & get token data
        const userData = user.verifyToken(<string>token);
        if (userData == "error") {
            req.body.outData = "Wrong token";
            req.body.outStatus = 401;
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

                req.body.outData = "post added";
                req.body.outStatus = 200;
            } catch (error) {
                req.body.outData = "db error";
                req.body.outStatus = 500;
            }
        }

        next();
    };

    //get all posts
    getPosts = async (req: any, res: any, next: any) => {
        //get props
        const { page, howMany } = req.body;
        let { tags } = req.body;
        //convert tags into array if needed
        if (typeof tags == "string") {
            tags = [tags];
        }

        //query
        try {
            const queryText: string = `SELECT * FROM posts
            ${
                //add tags clause when given
                tags ? " WHERE tags @> $3 " : ""
            }
            ORDER BY id DESC
            FETCH FIRST $1 ROWS ONLY 
            OFFSET $2;`;

            const queryValues: number[] = [howMany, howMany * (page - 1)];
            //add tags values when given
            if (tags) {
                queryValues.push(tags);
                console.log(queryValues);
            }

            const response = await pool.query(queryText, queryValues);

            if (response.rows.length < 1) {
                req.body.outData = "No posts found";
            } else {
                req.body.outData = response.rows;
            }
        } catch (error) {
            console.log(error);
            req.body.outData = "DB error";
            req.body.outStatus = 500;
        }
        next();
    };
}

const post = new PostController();
export default post;
