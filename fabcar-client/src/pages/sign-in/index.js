/* eslint-disable no-trailing-spaces */
import React, { useState } from 'react';
import useGlobal from 'src/stores';
import Section from 'src/components/Section';
import CustomLink from 'src/components/Link';
import Form from 'src/components/Form';
import Message from 'src/components/Message';
import Image from 'src/components/Image';
import logo from 'src/images/logo-2.png';
import staticFields from './static';
import './main.scss';

const { loginFields, signupFields, companyMap } = staticFields;
const Login = () => {
  const [, { login, signup }] = useGlobal();
  const [form, changeForm] = useState('log-in');
  const [fieldValues, updateFields] = useState({});
  const fields = form === 'log-in' ? loginFields : signupFields;
  fields.forEach(field => {
    field.value = fieldValues[field.key];
    field.onChange = newValue => {
      updateFields({ ...fieldValues, [field.key]: newValue });
    };
  });
  const submitForm = () => {
    if (form === 'log-in') {
      login({ ...fieldValues, owner: companyMap[fieldValues.owner] });
    } else {
      signup({ ...fieldValues, owner: companyMap[fieldValues.owner] });
    }
  };
  const submit = {
    name: form === 'log-in' ? 'Log In' : 'Sign Up',
    field: 'button',
    type: 'button',
    className: 'form-submit',
    onClick: submitForm
  };
  const linkClicked = () => {
    updateFields({});
    changeForm(form === 'log-in' ? 'sign-up' : 'log-in');
  };
  const getLinks = () => {
    let template = <></>;
    switch (form) {
      case 'log-in':
        template = (
          <>
            <CustomLink className="form-link" onClick={linkClicked}>
              sign up here
            </CustomLink>
          </>
        );
        break;
      case 'sign-up':
        template = (
          <>
            <CustomLink className="form-link" onClick={linkClicked}>
              Back
            </CustomLink>
          </>
        );
        break;
      default:
        template = <></>;
    }
    return template;
  };
  return (
    <>
      <Section className="intro float-left center">
        <Section className="logoContainer">
          <Image className="logo-2" src={logo} />
          <p className="welcome">
            Welcome to Cadena!
            <br />
            Helping Drive Automations for Automobiles
          </p>
        </Section>
      </Section>
      <Section className="login center">
        <Section className="form">
          <Form className="" data={[...fields, submit]} type="vertical" />
          {getLinks()}
          <Message />
        </Section>
      </Section>
    </>
  );
};

export default Login;
