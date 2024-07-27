import routes from '@/navigation/routes';
import { initialValues, RegisterFormValues } from '@/types/register';
import { useNavigate } from 'react-router-dom';
import { Form, Formik } from 'formik';
import RegisterValidationSchema from '@/formik-validation/register-validation-schema';
import { useEffect } from 'react';
import useRegister from '@/store/use-register';
import useAuth from '@/store/use-auth';
import Container from '../container/container';
import FormikInput from '../formik-input/formik-input';
import styles from './styles.module.scss';

const RegisterForm = () => {
  const { register, error } = useRegister();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (values: RegisterFormValues) => {
    await register(values.name, values.email, values.password);
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
            validationSchema={RegisterValidationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className={styles.form} noValidate>
                <h2 className={styles.title}>Create an account</h2>
                <FormikInput
                  name='name'
                  type='name'
                  placeholder='Name'
                />
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
                <FormikInput
                  name='confirmPassword'
                  type='password'
                  placeholder='Confirm password'
                />

                <button
                  className={styles.button}
                  type='submit'
                  disabled={isSubmitting}
                >
                  Create account
                </button>
                {error && <div className={styles.error}>{error}</div>}
              </Form>
            )}
          </Formik>
        </div>
      </Container>
    </div>

  );
};

export default RegisterForm;
