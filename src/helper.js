import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import Loader from 'react-loader-spinner';
import { FormItemError, LoaderWrapper } from './styled-components';

export const renderLoader = () => (
  <LoaderWrapper>
    <Loader type="Oval" color="rgb(82, 196, 26)" height={200} width={200} />
  </LoaderWrapper>
);

export const renderErrorMessage = (formik, fieldName) => (
  formik.touched[fieldName] && formik.errors[fieldName] ? (
    <FormItemError>{formik.errors[fieldName]}</FormItemError>
  ) : null
);

export const getDate = (createdAt) => (
  `${formatDistanceToNow(new Date(createdAt))} ago`
);
