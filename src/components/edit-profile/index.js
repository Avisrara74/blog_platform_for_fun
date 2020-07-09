import React from 'react';
import { uniqueId } from 'lodash';
import { connect } from 'react-redux';
import { useFormik } from 'formik';
import { Button, Input } from 'antd';
import propTypes from 'prop-types';
import * as Yup from 'yup';
import 'antd/dist/antd.css';
import * as actions from '../../redux/actions/user';

import {
  Form, FormTitle, FormItem, FormSubmitButtonStyles,
} from '../../styled-components';
import { renderErrorMessage } from '../../helper';

const formikInicialValues = {
  username: '',
  email: '',
  image: '',
};

const formItems = [
  {
    id: uniqueId(), title: 'Username', name: 'username', placeholder: 'Username',
  },
  {
    id: uniqueId(), title: 'Email address', name: 'email', placeholder: 'Email',
  },
  {
    id: uniqueId(), title: 'Avatar image (url)', name: 'image', placeholder: 'url',
  },
];

const formikValidationSchema = Yup.object({
  username: Yup.string()
    .max(30, 'Your username should be no more than 30 characters!')
    .required('required'),
  email: Yup.string()
    .email('Invalid email')
    .required('required'),
  image: Yup.string()
    .url('Not correct url')
    .required('required'),
});

const mapStateToProps = (state) => ({ isInputsDisable: state.editUserProfileState === 'requested' });

const actionCreator = {
  editUserProfile: actions.editUserProfile,
};

const EditProfile = (props) => {
  const { isInputsDisable, editUserProfile } = props;

  const handleOnEditUserProfile = (formik) => {
    const { username, email, image } = formik.values;

    const userData = {
      user: {
        username, email, image,
      },
    };
    editUserProfile(userData, formik);
  };

  const formik = useFormik({
    initialValues: formikInicialValues,
    validationSchema: formikValidationSchema,
    onSubmit: () => {
      handleOnEditUserProfile(formik);
    },
  });

  const renderInputs = () => (
    formItems.map((formItem) => (
      <FormItem key={formItem.id} htmlFor={formItem.name}>
        {formItem.title}
        <Input
          type="text"
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

  return (
    <Form onSubmit={formik.handleSubmit}>
      <FormTitle>Edit Profile</FormTitle>

      {renderInputs()}

      <FormItem>
        <Button
          htmlType="submit"
          type="primary"
          onClick={formik.handleSubmit}
          disabled={isInputsDisable}
          style={FormSubmitButtonStyles}
        >
          Save
        </Button>
      </FormItem>
    </Form>
  );
};

EditProfile.propTypes = {
  isInputsDisable: propTypes.bool,
  editUserProfile: propTypes.func,
};

EditProfile.defaultProps = {
  isInputsDisable: false,
  editUserProfile: null,
};

export default connect(mapStateToProps, actionCreator)(EditProfile);
