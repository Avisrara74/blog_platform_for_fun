// проверка на ошибки в полях форм
export const checkFieldErrors = (errResponse, formik) => {
  Object.entries(errResponse).forEach((error) => {
    const [field, message] = error;
    formik.setFieldError(field, message[0]);
    formik.setSubmitting(false);
  });
};

// проверка на ошибку сети
export const networkErrorCheck = (err) => {
  if (err.message === 'Network Error') {
    alert('Ошибка соединения'); // eslint-disable-line no-alert
  }
};

// проверка ошибки авторизации
export const signInErrorsCheck = (errResponse, formik) => {
  if (Object.keys(errResponse).length > 0) {
    formik.setFieldError('email', 'Invalid login or password');
    formik.setFieldError('password', 'Invalid login or password');
    formik.setSubmitting(false);
  }
};

export const mainRequestHandler = (req) => {
  req.headers['Content-Type'] = 'application/json;charset=utf-8';
  req.json = true;

  if (localStorage.token !== undefined) {
    req.headers.Authorization = `Token ${localStorage.token}`;
  }

  return req;
};
