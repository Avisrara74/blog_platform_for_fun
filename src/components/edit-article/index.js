import React, { useEffect } from 'react';
import { uniqueId } from 'lodash';
import { connect } from 'react-redux';
import { useFormik } from 'formik';
import { useHistory } from 'react-router';
import { Button, Input } from 'antd';
import propTypes from 'prop-types';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';
import { mainUrl } from '../../routes';
import { renderErrorMessage, renderLoader } from '../../helper';
import 'antd/dist/antd.css';
import * as actions from '../../redux/actions/articles';

import {
  FormItem,
  FormArticle,
  FormTitle,
  FormItemTagsWrap,
  FormAddTagButton,
  FormRemoveTagButton,
  FormItemTagsTitle,
  FormItemTag,
} from '../../styled-components';

const formSubmitButtonStyles = {
  height: 40,
  maxWidth: 320,
  width: '100%',
};

const formAddTagInputStyles = {
  maxWidth: 300,
  width: '100%',
  borderRadius: 4,
};

const markdownStyles = {
  flexGrow: 1,
};

const formItems = [
  {
    id: uniqueId(), title: 'Title', name: 'title', placeholder: 'Title', type: 'text',
  },
  {
    id: uniqueId(), title: 'Short description', name: 'description', placeholder: 'Description', type: 'text',
  },
];

const formikInicialValues = {
  title: '',
  description: '',
  body: '',
  tagText: '',
  tagList: [],
};

const formikValidationSchema = Yup.object({
  title: Yup.string()
    .required('required'),
  description: Yup.string()
    .required('required'),
  body: Yup.string()
    .required('required'),
});

const mapStateToProps = (state) => {
  const {
    userData, oneArticle, oneArticleState, editArticleState,
  } = state;

  return {
    username: userData.username,
    isOneArticleReady: oneArticleState === 'finished',
    isArticleChanged: editArticleState === 'finished',
    isInputsDisabled: editArticleState === 'requested',
    oneArticle,
  };
};

const actionCreators = {
  editArticle: actions.editArticle,
  getOneArticle: actions.getOneArticle,
};

const EditArticle = (props) => {
  const {
    isArticleChanged, username, getOneArticle, oneArticle, isOneArticleReady, isInputsDisabled,
  } = props;
  const { slug } = useParams();
  const queryParam = slug.slice(1, slug.length);

  const handleOnEditArticle = async (formik) => {
    const { editArticle } = props;
    const {
      title, description, body, tagList,
    } = formik.values;
    const tags = tagList.map((tag) => tag.title);

    const articleBody = {
      article: {
        title, description, body, tagList: tags,
      },
    };
    editArticle(articleBody, queryParam, formik);
  };

  const history = useHistory();
  const redirectToHome = () => {
    history.push(mainUrl);
  };

  const formik = useFormik({
    initialValues: formikInicialValues,
    validationSchema: formikValidationSchema,
    onSubmit: () => {
      handleOnEditArticle(formik);
    },
  });

  const setFormikValues = (article) => {
    if (!isOneArticleReady) return false;

    const {
      author, description, tagList, title, body,
    } = article;

    const isCurrentUserAuthor = (username === author.username);
    if (!isCurrentUserAuthor) redirectToHome();
    formik.setFieldValue('title', title);
    formik.setFieldValue('description', description);
    formik.setFieldValue('body', body);
    formik.setFieldValue('tagList', tagList);
    return true;
  };

  useEffect(() => {
    // запросить у сервера дату этого поста
    if (!isOneArticleReady) getOneArticle(queryParam);

    // изменить данные поста
    if (isOneArticleReady) setFormikValues(oneArticle);

    // редирект после изменения
    if (isArticleChanged) {
      redirectToHome();
    }
  }, [oneArticle, isArticleChanged]);

  const handleOnAddTag = () => {
    const { tagText, tagList } = formik.values;
    if (tagText.trim().length === 0) {
      formik.setFieldValue('tagText', '');
      return;
    }

    const initialNewTag = {
      id: uniqueId(),
      title: tagText,
    };

    const newTagsArray = [...tagList, initialNewTag];
    formik.setFieldValue('tagList', newTagsArray);
    formik.setFieldValue('tagText', '');
  };

  const handleOnRemoveTag = (id) => () => {
    const { tagList } = formik.values;

    const newTagsArray = tagList.filter((tag) => tag.id !== id);

    formik.setFieldValue('tagList', newTagsArray);
  };

  const handleOnClearTagInput = () => {
    formik.setFieldValue('tagText', '');
  };

  const renderTags = () => {
    const { tagList } = formik.values;
    if (tagList.length === 0) return null;

    return tagList.map((tag) => {
      const { id, title } = tag;

      return (
        <FormItemTag key={id}>
          <Input
            style={formAddTagInputStyles}
            onChange={formik.handleChange}
            value={title}
            disabled={isInputsDisabled}
          />
          <FormRemoveTagButton onClick={handleOnRemoveTag(id)}>Delete</FormRemoveTagButton>
        </FormItemTag>
      );
    });
  };

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
          disabled={isInputsDisabled}
        />
        {renderErrorMessage(formik, formItem.name)}
      </FormItem>
    ))
  );

  const renderForm = () => (
    <FormArticle onSubmit={formik.handleSubmit}>
      <FormTitle>Edit Article</FormTitle>

      {renderInputs()}

      <FormItem htmlFor="body" style={markdownStyles}>
        Text
        <Input.TextArea
          name="body"
          id="body"
          onChange={formik.handleChange}
          value={formik.values.body}
          rows={8}
          disabled={isInputsDisabled}
          allowClear
        />
        {renderErrorMessage(formik, 'body')}
      </FormItem>

      <FormItemTagsWrap>
        <FormItemTagsTitle>Tags</FormItemTagsTitle>
        {renderTags()}
        <FormItemTag>
          <Input
            name="tagText"
            id="tagText"
            placeholder="write tag"
            style={formAddTagInputStyles}
            onChange={formik.handleChange}
            value={formik.values.tagText}
            disabled={isInputsDisabled}
          />
          <FormRemoveTagButton onClick={handleOnClearTagInput}>Delete</FormRemoveTagButton>
          <FormAddTagButton onClick={handleOnAddTag}>Add tag</FormAddTagButton>
        </FormItemTag>
      </FormItemTagsWrap>

      <Button
        htmlType="submit"
        type="primary"
        onClick={formik.handleSubmit}
        style={formSubmitButtonStyles}
        disabled={isInputsDisabled}
      >
        Send
      </Button>
    </FormArticle>
  );

  return (!isOneArticleReady) ? renderLoader() : renderForm();
};

EditArticle.propTypes = {
  isArticleChanged: propTypes.bool,
  username: propTypes.string,
  getOneArticle: propTypes.func,
  oneArticle: propTypes.objectOf(propTypes.object),
  isOneArticleReady: propTypes.bool,
  editArticle: propTypes.func,
};

EditArticle.defaultProps = {
  isArticleChanged: false,
  username: null,
  getOneArticle: null,
  oneArticle: {},
  isOneArticleReady: false,
  editArticle: null,
};

export default connect(mapStateToProps, actionCreators)(EditArticle);
