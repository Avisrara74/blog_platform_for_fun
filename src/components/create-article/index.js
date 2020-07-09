import React, { useEffect } from 'react';
import { uniqueId } from 'lodash';
import { connect } from 'react-redux';
import { useFormik } from 'formik';
import { useHistory } from 'react-router';
import { Button, Input } from 'antd';
import propTypes from 'prop-types';
import * as Yup from 'yup';
import { renderErrorMessage } from '../../helper';
import { mainUrl } from '../../routes';
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

const formikInicialValues = {
  title: '',
  description: '',
  body: '',
  tagText: '',
  tagList: [],
};

const formItems = [
  {
    id: uniqueId(), title: 'Title', name: 'title', placeholder: 'Title', type: 'text',
  },
  {
    id: uniqueId(), title: 'Short description', name: 'description', placeholder: 'Description', type: 'text',
  },
];

const formikValidationSchema = Yup.object({
  title: Yup.string()
    .required('required'),
  description: Yup.string()
    .required('required'),
  body: Yup.string()
    .required('required'),
});

const mapStateToProps = (state) => {
  const { createArticleState } = state;
  return {
    isArticlePublished: createArticleState === 'finished',
    isInputsDisabled: createArticleState === 'requested',
  };
};

const actionCreators = {
  createArticle: actions.createArticle,
};

const CreateArticle = (props) => {
  const { isArticlePublished, isInputsDisabled } = props;
  const history = useHistory();
  const redirectToHome = () => {
    history.push(mainUrl);
  };

  const handleOnCreateArticle = async (formik) => {
    const { createArticle } = props;
    const {
      title, description, body, tagList,
    } = formik.values;
    const tags = tagList.map((tag) => tag.value);

    const articleBody = {
      article: {
        title, description, body, tagList: tags,
      },
    };
    createArticle(articleBody, formik);
  };

  const formik = useFormik({
    initialValues: formikInicialValues,
    validationSchema: formikValidationSchema,
    onSubmit: () => {
      handleOnCreateArticle(formik);
    },
  });

  const handleOnAddTag = () => {
    const { tagText, tagList } = formik.values;
    if (tagText.trim().length === 0) {
      formik.setFieldValue('tagText', '');
      return;
    }

    const initialNewTag = {
      id: uniqueId(),
      value: tagText,
    };

    const newTagsArray = [...tagList, initialNewTag];
    formik.setFieldValue('tagList', newTagsArray);
    formik.setFieldValue('tagText', '');
  };

  const handleOnRemoveTag = (id) => () => {
    const { tagList } = formik.values;

    const newTagsArray = tagList.filter((tag) => tag.id !== id);

    formik.setFieldValue('tags', newTagsArray);
  };

  const handleOnClearTagInput = () => {
    formik.setFieldValue('tagText', '');
  };

  const renderTags = () => {
    const { tagList } = formik.values;
    if (tagList.length === 0) return null;

    return tagList.map((tag) => {
      const { id, value } = tag;

      return (
        <FormItemTag key={id}>
          <Input
            style={formAddTagInputStyles}
            onChange={formik.handleChange}
            value={value}
            disabled={isInputsDisabled}
          />
          <FormRemoveTagButton onClick={handleOnRemoveTag(id)}>Delete</FormRemoveTagButton>
        </FormItemTag>
      );
    });
  };

  useEffect(() => {
    if (isArticlePublished) {
      redirectToHome();
    }
  }, [isArticlePublished]);

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

  return (
    <FormArticle onSubmit={formik.handleSubmit}>
      <FormTitle>Create new article</FormTitle>

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
};

CreateArticle.propTypes = {
  isArticlePublished: propTypes.bool,
  createArticle: propTypes.func,
  isInputsDisabled: propTypes.bool,
};

CreateArticle.defaultProps = {
  isArticlePublished: false,
  createArticle: null,
  isInputsDisabled: false,
};

export default connect(mapStateToProps, actionCreators)(CreateArticle);
