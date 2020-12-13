import NavBar from '../components/NavBar';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { usePostsQuery } from '../generated/graphql';
import NextLink from 'next/link';
import Layout from '../components/Layout';
import { Link } from '@chakra-ui/react';

const Index = () => {
	const [{ data }] = usePostsQuery();

	return (
		<Layout>
			<NextLink href='/create-post'>
				<Link>Create a Post</Link>
			</NextLink>
			{!data ? (
				<div>Loading...</div>
			) : (
				data.posts.map(post => (
					<div key={post.id}>
						{post.title} {post.text}
					</div>
				))
			)}
		</Layout>
	);
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
