import { Box, Button, Flex, Link } from '@chakra-ui/react';
import React from 'react';
import NextLink from 'next/link';
import { useMeQuery } from '../generated/graphql';

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = ({}) => {
	const [{ data, fetching }] = useMeQuery();
	let body = null;

	if (fetching) {
	} else if (!data?.me) {
		body = (
			<>
				<NextLink href='/login'>
					<Link mr={2}>Login</Link>
				</NextLink>
				<NextLink href='/register'>
					<Link>Register</Link>
				</NextLink>
			</>
		);
	} else {
		body = (
			<Flex>
				<Box mr={2}>{data.me.username}</Box>
				<Button variant='link'>Logout</Button>
			</Flex>
		);
	}

	console.log(data?.me?.username);

	return (
		<Flex bg='tan' p={4}>
			<Box ml='auto'>{body}</Box>
		</Flex>
	);
};

export default NavBar;
