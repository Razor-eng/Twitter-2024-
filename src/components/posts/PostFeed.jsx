/* eslint-disable react/prop-types */

import { useContext } from 'react';
import PostItem from './PostItem';
import { Context } from '../../context/Context';

const PostFeed = ({ fetchedUser, isHome, isProfile }) => {
  const { currentUser, posts } = useContext(Context);

  return (
    <>
      {isProfile ?
        posts.map((post, id) => fetchedUser.id === post.postData.userId && (
          <PostItem fetchedUser={fetchedUser} key={id} data={post} />
        ))
        :
        (isHome ?
          (
            currentUser ?
              (
                posts.map((post, id) => (currentUser.followingIds?.includes(post.postData.userId) || post.postData.userId === currentUser.id) && (
                  <PostItem key={id} data={post} />
                ))
              ) : (
                posts.map((post, id) => (
                  <PostItem key={id} data={post} />
                ))
              )
          ) : (
            posts.map((post, id) => (
              <PostItem key={id} data={post} />
            ))
          )
        )
      }
    </>
  );
};

export default PostFeed;
