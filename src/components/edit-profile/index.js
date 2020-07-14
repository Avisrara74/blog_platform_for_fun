import React from 'react';
import { uniqueId } from 'lodash';
import { connect } from 'react-redux';
import { useFormik } from 'formik';
import { Button, Input } from 'antd';
import propTypes from 'prop-types';
import * as Yup from 'yup';
import 'antd/dist/antd.css';
import * as actions from '../../redux/actions/user';
import { checkFieldErrors } from '../../API';

import {
  Form, FormTitle, FormItem, FormSubmitButtonStyles,
} from '../../styled-components';
import { renderErrorMessage } from '../../helper';

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
    .max(30, 'Your username should be no more than 30 characters!'),
  email: Yup.string()
    .email('Invalid email'),
  image: Yup.string()
    .url('Not correct url'),
});

const mapStateToProps = (state) => {
  const { userData } = state;
  const userDataInitialValues = {
    email: userData.email,
    image: userData.userProfileImage,
    username: userData.username,
  };
  return { isInputsDisable: state.editUserProfileState === 'requested', userDataInitialValues };
};

const actionCreator = {
  editUserProfile: actions.editUserProfile,
};

const EditProfile = (props) => {
  const { isInputsDisable, editUserProfile, userDataInitialValues } = props;

  const handleOnEditUserProfile = async (formik) => {
    const { username, email, image } = formik.values;

    const userData = {
      user: {
        username: (username.length === 0) ? userDataInitialValues.username : username,
        email: (email.length === 0) ? userDataInitialValues.email : email,
        image: (image.length === 0) ? userDataInitialValues.image : image,
      },
    };

    try {
      await editUserProfile(userData);
    } catch (error) {
      checkFieldErrors(error.response.data.errors, formik);
    }
  };

  const formik = useFormik({
    initialValues: userDataInitialValues,
    validationSchema: formikValidationSchema,
    onSubmit: async () => {
      await handleOnEditUserProfile(formik);
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
  userDataInitialValues: propTypes.objectOf(propTypes.object),
};

EditProfile.defaultProps = {
  isInputsDisable: false,
  editUserProfile: null,
  userDataInitialValues: {},
};

export default connect(mapStateToProps, actionCreator)(EditProfile);
