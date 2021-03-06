import React from 'react';
import {graphql, StaticQuery} from 'gatsby';

import BlogRoute from '../../components/pages/posts';
import Route from '../../components/common/route';
import {PostType} from '../../fragments/post';
import {extractNodesFromEdges} from '../../utils/helpers';

interface DataProps {
	latest: {
		edges: {
			node: PostType;
		}[];
	};
}

const Blog = () => {
	return <StaticQuery
		query={graphql`
			query {
				latest: allMarkdownRemark(
					sort: {fields: [frontmatter___created_at], order: DESC},
					filter: {
						fileAbsolutePath: {regex: "//static/content/collections/posts//"},
						frontmatter: {isPage: {ne: true}}
					},
					limit: 6
				) {
					edges {
						node {
							...postFragment
						}
					}
				}
			}
        `}

		render={(data: DataProps) => {
			return <Route
				component={BlogRoute}
				posts={data.latest ? extractNodesFromEdges(data.latest.edges) : []}
				path={'/'}
			/>;
		}}
	/>;
};

export default Blog;
