import React from "react";

function UserPosts({ posts, id }) {
  console.log(posts);
  const renderedUserPosts = () => {
    return posts.map((post) => {
      return (
        <>
          <img src={post.postImage} alt={post._id} key={post._id} />
        </>
      );
    });
  };

  if (!posts) {
    return <div>Loading Posts</div>;
  }

  return (
    <div>
      <p>User Posts</p>
      {posts.map((post) => (
        <img src={post.postImage} alt={post._id} key={post._id} />
      ))}
    </div>
  );
}

export default UserPosts;
