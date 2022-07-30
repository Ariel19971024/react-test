import { postFavourite } from "../../api/api.js";
import Validation from "../../common/Validation.js";
import React, { useState, useEffect } from "react";
const isNotEmpty = (value) => value.trim() !== "";
function RegistryForm(props) {
  const { topics, loading } = props;
  const [topicVal, setTopicVal] = useState("");
  const isLogin = sessionStorage.getItem("token");
  useEffect(() => {}, [isLogin]);
  const {
    value: fname,
    isValid: nameIsValid,
    hasError: fNameError,
    onChangeValue: onChangefName,
    onBlurValue: onBlurfName,
    reset: resetName,
  } = Validation(isNotEmpty);
  const {
    value: lastName,
    isValid: lastNameIsValid,
    hasError: lastNameError,
    onChangeValue: onChangelastName,
    onBlurValue: onBlurlastName,
    reset: resetlastName,
  } = Validation(isNotEmpty);
  const {
    value: email,
    isValid: emailIsValid,
    hasError: emailError,
    onChangeValue: onChangeEmailName,
    onBlurValue: onBlurEmailName,
    reset: resetEmail,
  } = Validation(isNotEmpty);
  const fNameInputClasses = `form-input-field ${
    fNameError ? "error-input" : ""
  }`;
  const lastNameInputClasses = `form-input-field ${
    lastNameError ? "error-input" : ""
  }`;
  const emailInputClasses = `form-input-field ${
    emailError ? "error-input" : ""
  }`;
  const isDisabled =
    nameIsValid && lastNameIsValid && emailIsValid ? false : true;
  const topicDdl = (() => {
    return topics.map((card) => {
      return {
        title: card.title,
        value: card.post_id,
      };
    });
  })();
  const registryHandler = async () => {
    try {
      loading.open();
      window.scrollTo({ top: 0,left: 0 ,behavior: "smooth" });
      let url = `/me/user/favourite/post-analysis/${topicVal}`;
      await postFavourite(url);
    } catch (e) {
      console.log(e);
    } finally {
      clearData();
      loading.close();
    }
  };
  const clearData = () => {
    resetName();
    resetlastName();
    resetEmail();
  };
  return (
    <div className="content-registry">
      <div className="registry-area">
        <div className="registry-form">
          <div className="registry-header">
            <div className="registry-header-title">
              <span>Register for a Webinar now</span>
            </div>
            <div className="registry-header-subtitle">
              <span>
                Please fill in the form below and you will be contacted by one
                of our
              </span>
              <span>professional business experts.</span>
            </div>
          </div>
          <div className="registry-submit">
            <div className="form-input">
              <div className="form-input-title">Topic</div>
              <div className="form-input-field">
                <select
                  onChange={(e) => {
                    setTopicVal(e.target.value);
                  }}
                >
                  <option value="">choose one</option>
                  {topicDdl.map((option, index) => {
                    return (
                      <option value={option.value} key={`option-${index}`}>
                        {option.title}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="form-input required-field">
              <div className="form-title-area">
                <div className="form-input-title">First Name</div>
                {fNameError ? (
                  <div className="field-error">
                    (First Name must not be empty.)
                  </div>
                ) : null}
              </div>

              <div className={fNameInputClasses}>
                <input
                  type="text"
                  onChange={onChangefName}
                  onBlur={onBlurfName}
                  value={fname}
                />
              </div>
            </div>
            <div className="form-input required-field">
              <div className="form-title-area">
                <div className="form-input-title">Last Name</div>
                {lastNameError ? (
                  <div className="field-error">
                    (Last Name must not be empty.)
                  </div>
                ) : null}
              </div>
              <div className={lastNameInputClasses}>
                <input
                  type="text"
                  onChange={onChangelastName}
                  onBlur={onBlurlastName}
                  value={lastName}
                />
              </div>
            </div>
            <div className="form-input required-field">
              <div className="form-title-area">
                <div className="form-input-title">Email</div>
                {emailError ? (
                  <div className="field-error">(Email must not be empty.)</div>
                ) : null}
              </div>
              <div className={emailInputClasses}>
                <input
                  type="text"
                  onChange={onChangeEmailName}
                  onBlur={onBlurEmailName}
                  value={email}
                />
              </div>
            </div>
            <div className="form-input">
              <div
                className={isDisabled ? "disabled-button" : "form-input-field"}
              >
                <button onClick={registryHandler} disabled={isDisabled}>Register</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {!isLogin && (
        <div className="form-mask">
          <div className="mask-icon">
            <span className="material-icons" title="icon-key">
              vpn_key
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
export default RegistryForm;
