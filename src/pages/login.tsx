import React from 'react';
import { Form, Formik } from 'formik';
import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import Wrapper from '../components/Wrapper';
import InputField from '../components/InputField';
import { toErrorMap } from '../utils/toErrorMap';
import { useLoginMutation } from '../generated/graphql';
import { useRouter } from 'next/router';

interface loginProps {}

const Login: React.FC<loginProps> = ({}) => {
	const router = useRouter();
	const [, login] = useLoginMutation();

	return (
		<Wrapper variant='small'>
			<Formik
				initialValues={{ username: '', password: '' }}
				onSubmit={async (values, { setErrors }) => {
					const response = await login(values);
					if (response.data?.login.errors) {
						setErrors(toErrorMap(response.data.login.errors));
					} else if (response.data?.login.user) {
						router.push('/');
					}
				}}
			>
				{({ isSubmitting }) => (
					<Form>
						<InputField name='username' label='Username' />
						<Box mt={4}>
							<InputField name='password' label='Password' type='password' />
						</Box>
						<Button
							mt={4}
							type='submit'
							colorScheme='teal'
							isLoading={isSubmitting}
						>
							Login
						</Button>
					</Form>
				)}
			</Formik>
		</Wrapper>
	);
};

export default Login;
