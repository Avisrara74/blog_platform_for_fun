import React, { useEffect } from 'react';
import { uniqueId } from 'lodash';
import { connect } from 'react-redux';
import { useFormik } from 'formik';
import { Button, Input, Checkbox } from 'antd';
import propTypes from 'prop-types';
import * as Yup from 'yup';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { signInUrl } from '../../routes';
import 'antd/dist/antd.css';
import { signUp as signUpProcess } from '../../redux/actions/auth';
import {
  FormItem,
  Form,
  FormCheckboxWrap,
  FormCheckboxTitle,
  FormSignInLink,
  FormTitle,
  FormSubmitButtonStyles,
} from '../../styled-components';
import { renderErrorMessage } from '../../helper';

const formikInicialValues = {
  username: '',
  email: '',
  password: '',
  repeatPassword: '',
  acceptTerms: false,
};

const formItems = [
  {
    id: uniqueId(), title: 'Username', name: 'username', placeholder: 'Username', type: 'text',
  },
  {
    id: uniqueId(), title: 'Email address', name: 'email', placeholder: 'Email', type: 'text',
  },
  {
    id: uniqueId(), title: 'Password', name: 'password', placeholder: 'Password', type: 'password',
  },
  {
    id: uniqueId(), title: 'Repeat Password', name: 'repeatPassword', placeholder: 'Repeat password', type: 'password',
  },
];

const formikValidationSchema = Yup.object({
  username: Yup.string()
    .max(30, 'Your username should be no more than 30 characters!')
    .required('required'),
  email: Yup.string()
    .email('Invalid email')
    .required('required'),
  password: Yup.string()
    .min(8, 'Your password need to be at least 6 characters.')
    .max(50, 'Your password should be no more than 50 characters.')
    .matches(/^[A-Za-z0-9]+$/, 'Password can be only with latin symbols and numbers')
    .matches(/(?=.*[0-9])/, 'Your password need to be at least 1 number')
    .matches(/(?=.*[A-Z])/, 'Your password need to be at least 1 uppercase symbol')
    .required('required'),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('required'),
  acceptTerms: Yup.bool()
    .oneOf([true])
    .required('You should accept terms'),
});

const mapStateToProps = (state) => {
  const { signUpState } = state;
  const isInputsDisable = (signUpState === 'requested');
  const isUserRegistered = (signUpState === 'finished');

  return { isInputsDisable, signUpState, isUserRegistered };
};

const actionCreators = {
  signUp: signUpProcess,
};

const SignUp = (props) => {
  const { isUserRegistered, isInputsDisable, signUp } = props;

  const history = useHistory();
  const redirectToSignIn = () => {
    history.push(signInUrl);
  };

  const handleOnSignUp = async (formik) => {
    const { username, email, password } = formik.values;
    const newUser = {
      user: {
        username,
        email,
        password,
      },
    };
    signUp(newUser, formik);
  };

  const formik = useFormik({
    initialValues: formikInicialValues,
    validationSchema: formikValidationSchema,
    onSubmit: () => {
      handleOnSignUp(formik);
    },
  });

  const renderInputs = () => (
    formItems.map((formItem) => (
      <FormItem key={formItem.id} htmlFor={formItem.name}>
        {formItem.title}
        <Input
          type={formItem.type}
          placeholder={formItem.placeholder}
          id={formItem.name}
          name={formItem.name}
          onChange={formik.handleChange}
          value={formik.values[formItem.name]}
          disabled={isInputsDisable}
        />
        {renderErrorMessage(formik, formItem.name)}
      </FormItem>
    ))
  );

  useEffect(() => {
    if (isUserRegistered) redirectToSignIn();
  }, [isUserRegistered]);

  return (
    <Form onSubmit={formik.handleSubmit}>
      <FormTitle>Create new account</FormTitle>

      {renderInputs()}

      <FormItem>
        <FormCheckboxWrap>
          <Checkbox
            id="acceptTerms"
            name="acceptTerms"
            checked={formik.values.acceptTerms}
            onChange={formik.handleChange}
            disabled={isInputsDisable}
          />
          <FormCheckboxTitle
            htmlFor="acceptTerms"
          >
            I agree to the processing of my personal information
          </FormCheckboxTitle>
        </FormCheckboxWrap>
        {renderErrorMessage(formik, 'acceptTerms')}
      </FormItem>

      <FormItem>
        <Button
          htmlType="submit"
          type="primary"
          onClick={formik.handleSubmit}
          disabled={isInputsDisable}
          style={FormSubmitButtonStyles}
        >
          Create
        </Button>
      </FormItem>

      <FormSignInLink>
        <span>Already have account?</span>
        <Link to={signInUrl}> Sign In.</Link>
      </FormSignInLink>
    </Form>
  );
};

SignUp.propTypes = {
  signUp: propTypes.func,
  isInputsDisable: propTypes.bool,
  isUserRegistered: propTypes.bool,
};

SignUp.defaultProps = {
  signUp: null,
  isInputsDisable: false,
  isUserRegistered: false,
};

export default connect(mapStateToProps, actionCreators)(SignUp);
