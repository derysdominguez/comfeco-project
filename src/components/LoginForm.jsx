import React from "react";
import "../assets/styles/components/login.css";
import "../assets/styles/views/Login.css";

const EMAIL_REGEX = new RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

class LoginForm extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      touched: {
        name: false,
        email: false,
      },
      errors: {
        required: {
          name: false,
          email: false,
        },
        valid: {
          email: false,
          name: true,
        },
      },
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  handleChange(event) {
    const { target } = event;
    const { value, name } = target;
    const errors = {
      required: { ...this.state.errors.required, [name]: false },
    };
    this.setState({
      [name]: value,
      errors: { ...this.state.errors, ...errors },
    });
  }

  handleBlur(event) {
    const field = event.target.name;
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
    this.validate(event);
  }

  validate(event) {
    const { target } = event;
    const { value, name } = target;

    if (value.length === 0) {
      const errors = {
        required: { ...this.state.errors.required, [name]: true },
      };

      this.setState({
        errors: { ...this.state.errors, ...errors },
      });
      return;
    }

    if (name === "email") {
      this.validateEmail(value);
    }
  }

  validateEmail(email) {
    const emailIsValid = EMAIL_REGEX.test(this.state.email);
    const errors = {
      valid: { ...this.state.errors.valid, email: emailIsValid },
    };

    this.setState({
      errors: { ...this.state.errors, ...errors },
    });
  }

  hasError(field) {
    return (
      (this.state.errors.required[field] || !this.state.errors.valid[field]) &&
      this.state.touched[field]
    );
  }

  isFormInvalid() {
    const { email, name, errors } = this.state;
    const { required, valid } = errors;
    const isSomeFieldRequired = Object.keys(required).some(
      (error) => required[error]
    );
    const isSomeFieldInvalid = Object.keys(valid).some(
      (error) => !valid[error]
    );

    return isSomeFieldInvalid || isSomeFieldRequired;
  }

  displayError(field) {
    const { required, valid } = this.state.errors;
    const errorMessage = `${field}`;

    if (required[field]) {
      return `Ingrese su ${errorMessage}`;
    }

    if (!valid[field]) {
      return `No es valido su ${errorMessage}`;
    }
  }

  render() {
    const { email, name, errors } = this.state;

    return (
      <div className="bg-login">
        <div className="Login">
          <h1 className="Login__title title">
            <span className="title_hola title">Hola</span>
            <span className="title__message title">Inicia Sesión!</span>
          </h1>
          <form className="Login__form" onSubmit={this.handleSubmit}>
            <div className="form__group">
              <input
                placeholder="Correo Electronico"
                type="email"
                value={email}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                className="form__input"
                className={this.hasError("email") ? "error" : ""}
                name="email"
              />
              <p
                className={
                  this.hasError("email")
                    ? "error-message__visible"
                    : "error-message"
                }
              >
                {this.displayError("email")}
              </p>
            </div>
            <div className="form__group">
              <input
                placeholder="Contraseña"
                type="password"
                value={name}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                className="form__input"
                className={this.hasError("name") ? "error" : ""}
                name="name"
              />
              <p
                className={
                  this.hasError("name")
                    ? "error-message__visible"
                    : "error-message"
                }
              >
                {this.displayError("password")}
              </p>
            </div>
            <div className="form__pass">
              <a href="#" className="form__link">
                Recuperar Contraseña
              </a>
            </div>
            <div className="form__check ">
              <input type="checkbox" />

              <span className="form__check_s">Mantenerme conectado</span>
            </div>
            <div className="submit-button-container">
              <button
                type="submit"
                disabled={this.isFormInvalid()}
                className="form__button"
              >
                Entrar
              </button>
              <p className="form__register">
                No tiene cuenta registrate
                <a href="#">aquí.</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default LoginForm;
