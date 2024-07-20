import routes from '@/navigation/routes';
import { LoginFormValues } from '@/types/login-types';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Formik } from 'formik';
import loginValidationSchema from '@/formik-validation/login-validation-schema';
import { useEffect } from 'react';
import useAuth from '@/store/use-auth';
import Container from '../container/container';
import FormikInput from '../formik-input/formik-input';
import styles from './styles.module.scss';

const initialValues: LoginFormValues = {
  email: '',
  password: '',
};

const LoginForm = () => {
  const { login, error, user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (values: LoginFormValues) => {
    await login(values.email, values.password);
  };

  useEffect(() => {
    if (user !== null) {
      navigate(routes.HOME);
    }
  }, [user]);

  return (
    <div className={styles.content}>
      <Container>
        <div className={styles.formWrapper}>
          <Formik
            initialValues={initialValues}
            validationSchema={loginValidationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className={styles.form} noValidate>
                <h2 className={styles.title}>Login</h2>
                <FormikInput
                  name='email'
                  type='email'
                  placeholder='Email'
                />
                <FormikInput
                  name='password'
                  type='password'
                  placeholder='Password'
                />
                {error && <div className={styles.error}>{error}</div>}
                <button
                  className={styles.button}
                  type='submit'
                  disabled={isSubmitting}
                >
                  Login
                </button>
                <Link className={styles.link} to={routes.REGISTER}>
                  Don&#39;t have an account? Sign up
                </Link>
              </Form>
            )}
          </Formik>
        </div>
      </Container>
    </div>

  );
};

export default LoginForm;
