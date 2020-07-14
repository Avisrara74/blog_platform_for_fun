import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useFormik } from 'formik';
import { Button, Input } from 'antd';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { useHistory } from 'react-router';
import {
  FormItem,
  Form,
  FormTitle,
  FormSubmitButtonStyles,
  FormSignUpLink,
  FormSignInWrapper,
} from '../../styled-components';
import { signIn as signInProcess } from '../../redux/actions/auth';
import { signUpUrl, mainUrl } from '../../routes';
import { renderErrorMessage } from '../../helper';
import { signInErrorsCheck } from '../../API';

const formikInitialValues = {
  email: '',
  password: '',
};

const mapStateToProps = (state) => {
  const { signInState, userData } = state;
  const { isAuthorized } = userData;
  const isInputsDisable = (signInState === 'requested');

  return { isInputsDisable, isAuthorized };
};

const actionCreators = {
  signIn: signInProcess,
};

const SignIn = (props) => {
  const { isInputsDisable, signIn, isAuthorized } = props;

  const history = useHistory();
  const redirectToHome = () => {
    history.push(mainUrl);
  };

  const handleOnAuthorizationUser = async (formik) => {
    const { email, password } = formik.values;
    const userData = {
      user: {
        email: email.toLowerCase(),
        password,
      },
    };
    try {
      await signIn(userData);
    } catch (error) {
      signInErrorsCheck(error.response.data.errors, formik);
    }
  };

  const formik = useFormik({
    initialValues: formikInitialValues,
    onSubmit: () => {
      handleOnAuthorizationUser(formik);
    },
  });

  useEffect(() => {
    if (isAuthorized) redirectToHome();
  }, [isAuthorized]);

  return (
    <FormSignInWrapper>
      <Form onSubmit={formik.handleSubmit}>
        <FormTitle>Sign In</FormTitle>
        <FormItem htmlFor="email">
          Email address:
          <Input
            placeholder="Email address"
            id="email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            disabled={isInputsDisable}
          />
          {renderErrorMessage(formik, 'email')}
        </FormItem>

        <FormItem htmlFor="password">
          Password:
          <Input.Password
            id="password"
            name="password"
            placeholder="Password"
            onChange={formik.handleChange}
            value={formik.values.password}
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            disabled={isInputsDisable}
          />
          {renderErrorMessage(formik, 'password')}
        </FormItem>

        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            className="form-submit"
            onClick={formik.handleSubmit}
            style={FormSubmitButtonStyles}
            disabled={isInputsDisable}
          >
            Войти
          </Button>
        </FormItem>
        <FormSignUpLink>
          <span>Don&apos;t have account?</span>
          <Link to={signUpUrl}> Sign Up.</Link>
        </FormSignUpLink>
      </Form>
    </FormSignInWrapper>

  );
};

SignIn.propTypes = {
  signIn: propTypes.func,
  isInputsDisable: propTypes.bool,
  isAuthorized: propTypes.bool,
};

SignIn.defaultProps = {
  signIn: null,
  isInputsDisable: false,
  isAuthorized: false,
};

export default connect(mapStateToProps, actionCreators)(SignIn);
