import React from "react";

export default function PostForm() {
    return (
        <div className=" p-4 rounded-box form-control bg-base-200 flex flex-col gap-4">
            {/* <label className="label">
                <span className="label-text text-2xl"></span>
            </label> */}
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
                    />
                    <button className="btn btn-primary w-1/5 text-base-200 text-sm lg:text-base">
                        Add tag
                    </button>
                </div>
                <div className="container flex gap-4 flex-wrap">
                    {/* Tag prototype */}
                    <div className="badge badge-primary text-base-200 cursor-pointer">
                        Tag
                    </div>
                </div>
            </div>

            <button className="btn btn-primary  mb-4 text-base-200">
                Post
            </button>
        </div>
    );
}
