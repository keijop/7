import React from 'react'
import { useSelector } from 'react-redux'
import LinkStyled from './styledComponents/LinkStyled'
import BlogListStyled from './styledComponents/BlogList'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)
  return (
    <BlogListStyled>
      {blogs.map(blog => {
        return (
          <LinkStyled key={blog.id} to={`/blogs/${blog.id}`}>
            {blog.title}
          </LinkStyled>
        )
      })}
    </BlogListStyled>
  )
}

export default BlogList
