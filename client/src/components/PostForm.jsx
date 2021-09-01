import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { v4 } from "uuid";
import { readCookie } from "../utils";
export default function PostForm({ setDefaults }) {
    const [tags, setTags] = useState([""]);
    const [activeButton, setActiveButton] = useState(false);
    const tagInput = useRef(null);
    const contentInput = useRef(null);

    const addTag = () => {
        const tagInputElement = tagInput.current;
        let tagValue = tagInputElement.value;
        //Return if empty
        if (!tagValue) {
            return;
        }
        let indexOfHash = tagValue.indexOf("#");
        //remove # at the beginning
        if (indexOfHash == 0) {
            tagValue = tagValue.substring(1);
            indexOfHash = tagValue.indexOf("#");
        }
        //Return if # inside
        if (indexOfHash > -1) {
            alert("Your tag can't contain '#' symbol");
            return;
        }

        //check if tag was already added
        if (tags.includes(tagValue)) {
            alert("There can't be duplicate tags in a post");
            return;
        }

        //set state and empty the input
        setTags([...tags, tagValue]);
        tagInputElement.value = "";
        setActiveButton(false);
    };

    const removeTag = (e) => {
        const toDelete = e.target.dataset.value;
        let safeIndex = 0;
        let tagsCopy = [...tags];
        while (tagsCopy.indexOf(toDelete) > -1 && safeIndex < 20) {
            let index = tagsCopy.indexOf(toDelete);
            tagsCopy.splice(index, 1);
            safeIndex++;
        }
        setTags(tagsCopy);
    };

    const publishPost = async () => {
        try {
            axios.post(
                "http://localhost:5000/posts/add",
                {
                    post: {
                        content: contentInput.current.value,
                        tags: tags,
                    },
                },
                {
                    headers: { authorization: `Bearer ${readCookie("token")}` },
                }
            );

            setDefaults();
            setTags([]);
            tagInput.current.value = "";
            contentInput.current.value = "";
        } catch (error) {
            console.log(error);
            alert("There was a problem");
        }
    };

    useEffect(() => {
        setTags([]);
    }, []);

    return (
        <div className="p-4 rounded-box form-control flex flex-col gap-4">
            <textarea
                rows={5}
                placeholder="Write whatever is on your mind"
                className="textarea textarea-bordered textarea-primary"
                ref={contentInput}
            ></textarea>

            <div className="container flex flex-col gap-4">
                <div className="container flex gap-4">
                    <input
                        type="text"
                        className="input input-primary w-4/5"
                        placeholder="tags"
                        onInput={(e) => {
                            //@ts-ignore
                            e.target.value.length < 1
                                ? setActiveButton(false)
                                : setActiveButton(true);
                        }}
                        ref={tagInput}
                    />
                    <button
                        onClick={addTag}
                        className={`${
                            activeButton
                                ? "btn  btn-accent text-base-200"
                                : "btn-disabled"
                        } btn-circle w-1/5 text-sm lg:text-base `}
                    >
                        Add tag
                    </button>
                </div>
                <div className="container flex gap-4 flex-wrap">
                    {tags.map((item) => {
                        return (
                            <div
                                key={v4()}
                                data-value={item}
                                className="badge badge-primary text-base-200 cursor-pointer"
                                onClick={removeTag}
                            >
                                {`#${item}`}
                            </div>
                        );
                    })}
                </div>
            </div>

            <button
                onClick={publishPost}
                className="btn btn-primary  mb-4 text-base-200"
            >
                Publish
            </button>
        </div>
    );
}
