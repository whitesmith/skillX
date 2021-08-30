import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "@inertiajs/inertia-react";
import Layout from "./Layout";

const SingleClass = (props) => {
  const [click_about, setClickA] = useState(true);

  const handleClickA = () => setClickA(!click_about);
  const avatar = (image) => {
    return `${image}?tr=w-60,h-60,r-max`;
  };

  let requestInfo = props.request;

  const buttonOnClick = () => {
    switch (buttonState) {
      case "pending":
        //cancel request
        setButtonState("loading");

        axios
          .put(`/api/match_request/${requestInfo.match_id}/`, {
            status: "cancelled",
            headers: window.defaultHeaders,
          })
          .then((response) => {
            console.log(response.data);

            setButtonState("available");
          })
          .catch((error) => {
            if (error.response.data.error) {
              alert(error.response.data.error);
            }
            setButtonState("pending");
          });

        break;

      case "available":
        //send request
        setButtonState("loading");

        axios
          .post(`/api/classes/${props.class.id}/request/`, {
            headers: window.defaultHeaders,
          })
          .then((response) => {
            console.log(response.data);

            requestInfo.match_id = response.data.request.id;
            setButtonState("pending");
          })
          .catch((error) => {
            if (error.response.data.error) {
              alert(error.response.data.error);
            }
            setButtonState("available");
          });

        break;

      default:
        break;
    }
  };

  //button state can be 'available', 'pending', 'accepted' or 'loading'
  const [buttonState, setButtonState] = useState(
    props.request.status ? props.request.status : "available"
  );

  const classes_url_category = () => {
    return `/classes?category_id=${props.class.skill.category.id}`;
  };

  const classes_url_skill = () => {
    return `/classes?category_id=${props.class.skill.category.id}&skill_id=${props.class.skill.id}`;
  };

  console.log("about:", click_about);
  return (
    <Layout current_user={props.current_user}>
      <div className="path-wrapper">
        <Link rel="stylesheet" href="/home" className="path">
          <img
            src={require("../images/logo_dark.svg")}
            alt="logo"
            className="path-logo"
          />
        </Link>
        <p className="path">&nbsp;/&nbsp;</p>
        <Link rel="stylesheet" href={classes_url_category()} className="path">
          {props.class.skill.category.name}
        </Link>
        <p className="path">&nbsp;/&nbsp;</p>
        <Link rel="stylesheet" href={classes_url_skill()} className="path">
          {props.class.skill.name}
        </Link>
        <p className="path">&nbsp;/&nbsp;</p>
        <Link rel="stylesheet" href="" className="path">
          {props.class.teacher.name}
        </Link>
      </div>
      <div
        className="class-header"
        style={{ "--colorCategory": `#${props.class.skill.category.color}` }}
      >
        <h1 className="class-header-title">{props.class.title}</h1>
        <h2 className="class-header-subtitle">{props.class.teacher.name}</h2>
      </div>
      <div>
        <ul className="class-menu">
          <li
            href=""
            className={click_about ? "class-btn active" : "class-btn"}
            onClick={handleClickA}
            style={{
              "--colorCategory": `#${props.class.skill.category.color}`,
            }}
          >
            About
          </li>
          <li href="" className="class-btn" onClick={""}>
            Review
          </li>
          <li href="" className="class-btn" onClick={""}>
            Coments
          </li>
        </ul>
      </div>

      <div className={click_about ? "class-about" : "class-about off"}>
        <div className="class-details">
          <p className="class-difficulty">{props.class.difficulty}</p>
          <div className="class-lessons">
            <h1 className="class-details-title">{props.class.no_classes}</h1>
            <p className="class-details-subtitle">Lessons </p>
          </div>
          <div className="class-time">
            <h1 className="class-details-title">
              {props.class.class_duration}
            </h1>{" "}
            <p className="class-details-subtitle">min Time p/ lesson</p>
          </div>
        </div>
        <div>
          {props.class.regime} {props.class.method}
        </div>
        <div>
          <img src={avatar(props.class.teacher.avatar.url)} alt="Avatar" />
          <p>{props.class.teacher.name}</p>
          <p>Rating: {props.class.teacher.rating}</p>
        </div>
        <div>
          <h1>About this class</h1>
          <div>{props.class.description}</div>
        </div>
        {props.current_user.id != props.class.teacher.id ? (
          <button
            disabled={buttonState == "loading" || buttonState == "accepted"}
            onClick={buttonOnClick}
          >
            {buttonState == "available"
              ? "Ask for class"
              : buttonState == "pending"
              ? "Request sent!"
              : buttonState == "accepted"
              ? "Connection open"
              : "Loading..."}
          </button>
        ) : null}
      </div>
    </Layout>
  );
};

SingleClass.propTypes = {
  current_user: PropTypes.object.isRequired,
  class: PropTypes.object.isRequired,
  request: PropTypes.object.isRequired,
};

export default SingleClass;