import React from "react";
import { useFormik } from "formik";
import { editScheme } from "./validation"; 
import styled from "@emotion/styled";

const FormContainer = styled.div`
  max-width: 500px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #0066cc;
  }
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

const SubmitButton = styled.button`
  background: #0066cc;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  width: 100%;
  
  &:hover {
    background: #0052a3;
  }
`;

const YourForm = () => {
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
    },
    validationSchema: editScheme, 
    onSubmit: (values) => {
      console.log("Form data", values);
    },
  });

  return (
    <FormContainer>
      <form onSubmit={formik.handleSubmit}>
        <FormGroup>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
          />
          {formik.errors.title && formik.touched.title && (
            <ErrorMessage>{formik.errors.title}</ErrorMessage>
          )}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            name="description"
            type="text"
            as="textarea"
            rows="4"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
          />
          {formik.errors.description && formik.touched.description && (
            <ErrorMessage>{formik.errors.description}</ErrorMessage>
          )}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            name="price"
            type="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.price}
          />
          {formik.errors.price && formik.touched.price && (
            <ErrorMessage>{formik.errors.price}</ErrorMessage>
          )}
        </FormGroup>

        <FormGroup>
          <SubmitButton type="submit">Submit</SubmitButton>
        </FormGroup>
      </form>
    </FormContainer>
  );
};

export default YourForm;