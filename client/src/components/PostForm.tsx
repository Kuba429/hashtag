import React, { useState, useRef, useEffect } from "react";
import { v4 } from "uuid";
export default function PostForm() {
    const [tags, setTags] = useState([""]);
    const [activeButton, setActiveButton] = useState(false);
    const tagInput = useRef(null);

    const addTag = () => {
        const tagInputElement: any = tagInput.current;
        let tagValue: string = tagInputElement.value;
        //Return if empty
        if (!tagValue) {
            return;
        }
        const indexOfHash = tagValue.indexOf("#");
        //Return if # inside
        if (indexOfHash > 0) {
            alert("Your tag can't contain '#' symbol");
            return;
            //remove # at the beginning
        } else if (indexOfHash == 0) {
            tagValue = tagValue.substring(1);
        }
        //set state and empty the input
        setTags([...tags, tagValue]);
        tagInputElement.value = "";
    };

    useEffect(() => {
        setTags([]);
    }, []);

    return (
        <div className="p-4 rounded-box form-control flex flex-col gap-4">
            <input
                placeholder="Title"
                type="text"
                className="input input-primary my-0"
            />
            <textarea
                rows={5}
                placeholder="Write whatever is on your mind"
                className="textarea textarea-bordered textarea-primary"
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
                        } btn-circle w-1/5 text-sm lg:text-base`}
                    >
                        Add tag
                    </button>
                </div>
                <div className="container flex gap-4 flex-wrap">
                    {/* Tag prototype */}
                    {tags.map((item) => {
                        return (
                            <div
                                key={v4()}
                                className="badge badge-primary text-base-200 cursor-pointer"
                            >
                                {`#${item}`}
                            </div>
                        );
                    })}
                </div>
            </div>

            <button className="btn btn-primary  mb-4 text-base-200">
                Post
            </button>
        </div>
    );
}