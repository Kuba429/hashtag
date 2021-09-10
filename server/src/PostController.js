const jwt = require("jsonwebtoken");
const pool = require("./db");
const user = require("./UserController");

class PostController {
    constructor() {
        this.jwtSecret = process.env.JWTSECRET;
    }

    //add new post
    add = async (req, res, next) => {
        //get token
        let token = req.headers.authorization;

        //check if token is ok & get token data
        const userData = user.verifyToken(token);
        if (
            userData == "error" ||
            typeof req.body.post.content != "string" ||
            req.body.post.content.length < 2
        ) {
            req.body.outData = "There was a problem";
            req.body.outStatus = 401;
        } else {
            //info about post and user
            const { content, tags, featuredImage } = req.body.post;
            const username = user.verifyToken(token).username;
            //query
            try {
                const queryText = `INSERT INTO posts (content, author,tags, created_on ${
                    featuredImage ? ", featured_img" : ""
                }) 
                VALUES($1,$2,$3, CURRENT_TIMESTAMP ${
                    featuredImage ? ", $4" : ""
                })`;
                let queryValues = [content, username, tags];
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
    //delete post
    delete = async (req, res, next) => {
        try {
            const postId = req.body.postId;
            const token = user.verifyToken(req.headers.authorization);
            console.log(postId);
            console.log(token);

            const queryText =
                "DELETE FROM posts WHERE author LIKE $1 AND id = $2;";
            const queryValues = [token.username, postId];
            const response = await pool.query(queryText, queryValues);
            req.body.outData = "Post deleted";
        } catch (error) {
            req.body.outData = "something went wrong";
            req.body.outStatus = "500";
        }
        next();
    };

    //get all posts or by tags
    getPosts = async (req, res, next) => {
        //get props
        const { page, howMany } = req.body;
        let { tags } = req.body;
        //convert tags into array if needed
        if (typeof tags == "string") {
            tags = [tags];
        }

        //query
        try {
            const queryText = `SELECT * FROM posts
            ${
                //add tags clause when given
                tags ? " WHERE tags @> $3 " : " "
            }
            ORDER BY id DESC
            FETCH FIRST $1 ROWS ONLY 
            OFFSET $2;`;

            const queryValues = [howMany, howMany * (page - 1)];
            //add tags values when given
            if (tags) {
                queryValues.push(tags);
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
module.exports = post;
