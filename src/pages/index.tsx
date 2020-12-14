import NavBar from '../components/NavBar';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { usePostsQuery } from '../generated/graphql';
import NextLink from 'next/link';
import Layout from '../components/Layout';
import {
	Link,
	Stack,
	Box,
	Text,
	Heading,
	Flex,
	Button,
} from '@chakra-ui/react';
import React from 'react';

const Index = () => {
	const [page, setPage] = React.useState(1);

	const [{ data, fetching }] = usePostsQuery({
		variables: {
			page,
		},
	});

	if (!fetching && !data) {
		return <div>Your Query failed for some reason</div>;
	}

	return (
		<Layout>
			<Flex align='center' mb={5}>
				<Heading>LiReddit</Heading>
				<NextLink href='/create-post'>
					<Link ml='auto'>Create a Post</Link>
				</NextLink>
			</Flex>
			{!data && fetching ? (
				<div>Loading...</div>
			) : (
				<Stack spacing={8}>
					{data!.posts.map(post => (
						<Box key={post.id} p={5} shadow='md' borderWidth='1px'>
							<Heading fontSize='xl'>{post.title}</Heading>
							<Text>{post.text}</Text>
						</Box>
					))}
				</Stack>
			)}
			{data && (
				<Flex>
					{page > 1 && (
						<Button
							isLoading={fetching}
							m='auto'
							my={8}
							onClick={() => {
								setPage(page - 1);
							}}
						>
							Previous Page
						</Button>
					)}
					{data.posts.length > 0 && (
						<Button
							isLoading={fetching}
							m='auto'
							my={8}
							onClick={() => {
								setPage(page + 1);
							}}
						>
							Next Page
						</Button>
					)}
				</Flex>
			)}
		</Layout>
	);
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
