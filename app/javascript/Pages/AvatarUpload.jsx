import React from "react";
import Layout from "./Layout";
import { Head, Link } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";

export default function Profile(props) {
  const handleSubmit = (e) => {
    e.preventDefault();

    Inertia.put("/users/" + props.user.id + "/avatar", state, {
      headers: window.defaultHeaders,
    });
  };

  const state = { avatar: null };

  const onImageChange = (event) => {
    state.avatar = event.target.files[0];
  };

  const link = props.curent_avatar + "?tr=w-250,h-300";

  return (
    <Layout current_user={props.user}>
      {/* <Head title="Welcome" /> */}
      <h1>Upload Avatar</h1>
      <p>Current avatar:</p>
      <img src={link} />
      <br />
      <form onSubmit={handleSubmit}>
        <label htmlFor="image">
          Upload image
          <input
            type="file"
            name="avatar"
            accept="image/*"
            multiple={false}
            onChange={onImageChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>

      <Link href="/home" headers={window.defaultHeaders} as="button">
        Home
      </Link>
    </Layout>
  );
}
