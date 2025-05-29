import React, { useState } from "react";
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Alert,
  FormErrorMessage,
  Text,
  InputGroup,
  InputRightElement,
  Link,
} from "@chakra-ui/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useFormik } from "formik";
import validationSchema from "./validations";
import { fetchLogin } from "../../../api";
import { useAuth } from "../../../contexts/AuthContext";
import { Link as RouterLink, useNavigate } from "react-router-dom";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showErrorIndicator, setShowErrorIndicator] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, bag) => {
      if (!values.email || !values.password) {
        setShowErrorIndicator(true);
      } else {
        setShowErrorIndicator(false);
      }

      try {
        const loginResponse = await fetchLogin({
          email: values.email,
          password: values.password,
        });
        login(loginResponse);
        navigate("/profile");
      } catch (e) {
        bag.setErrors({ general: e.response?.data?.message || "Đăng nhập thất bại" });
      }
    },
  });

  return (
    <Flex align="center" width="full" justifyContent="center">
      <Box pt={10} width="md">
        <Box textAlign="center">
          <Heading>Đăng nhập</Heading>
        </Box>

        <Box my={5}>
          {formik.errors.general && (
            <Alert status="error">{formik.errors.general}</Alert>
          )}
        </Box>

        <Box my={5} textAlign="left">
          <form onSubmit={formik.handleSubmit}>
            <FormControl isInvalid={formik.touched.email && formik.errors.email}>
              <FormLabel>
                E-mail
                {showErrorIndicator && !formik.values.email && (
                  <Text as="span" color="red.500"> *</Text>
                )}
              </FormLabel>
              <Input
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
            </FormControl>

            <FormControl mt={4} isInvalid={formik.touched.password && formik.errors.password}>
              <FormLabel>
                Mật khẩu
                {showErrorIndicator && !formik.values.password && (
                  <Text as="span" color="red.500"> *</Text>
                )}
              </FormLabel>
              <InputGroup>
                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                <InputRightElement width="4.5rem">
                  <Button
                    h="2rem"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
            </FormControl>

            <Box mt={2} textAlign="right">
              <Link as={RouterLink} to="/forgot-password" color="teal.500">
                Quên mật khẩu?
              </Link>
            </Box>

            <Button
              mt={4}
              width="full"
              type="submit"
              colorScheme="teal"
              isLoading={formik.isSubmitting}
              disabled={!(formik.dirty && formik.isValid) || formik.isSubmitting}
            >
              Đăng nhập
            </Button>
          </form>
        </Box>
      </Box>
    </Flex>
  );
}

export default Login;
