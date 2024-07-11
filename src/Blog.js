import React, { useState } from 'react';
import './Blog.css';

function Blog({ language }) {
  const initialPosts = [
    {
      title: "Check Out My Volleyball Skills!",
      content: "Hey everyone! I've been practicing my volleyball skills and I wanted to share a video with you all. Please check it out and let me know what you think. I'm looking for tips to improve my game. Thanks!\n\nhttps://www.youtube.com/watch?v=xvFZjo5PgG0",
      author: "John Doe",
      comments: [
        { author: "Jane Smith", content: "Great skills, John! Try working on your serve, it could use a bit more power." },
        { author: "Coach Mike", content: "Nice video! Make sure to bend your knees more during blocks to improve your stability." }
      ]
    },
    {
      title: "Looking for Players for Recreational Team",
      content: "Hi everyone! We're looking for more players to join our recreational volleyball team. We play every Monday and Wednesday evening. If you're interested, please leave a comment or contact me directly.",
      author: "Emily Johnson",
      comments: [
        { author: "Sarah Lee", content: "I'm interested! When and where do you practice?" },
        { author: "Emily Johnson", content: "You can reach me at 613-437-3278 for more details!" }
      ]
    }
  ];

  const [posts, setPosts] = useState(initialPosts);
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [postAuthor, setPostAuthor] = useState('');

  const translations = {
    en: {
      blog: "Blog",
      titlePlaceholder: "Title",
      namePlaceholder: "Your Name",
      postPlaceholder: "Write your post...",
      postButton: "Post",
      commentNamePlaceholder: "Your Name",
      commentPlaceholder: "Write a comment...",
      commentButton: "Comment"
    },
    fr: {
      blog: "Blogue",
      titlePlaceholder: "Titre",
      namePlaceholder: "Votre nom",
      postPlaceholder: "Écrivez votre publication...",
      postButton: "Publier",
      commentNamePlaceholder: "Votre nom",
      commentPlaceholder: "Écrire un commentaire...",
      commentButton: "Commentaire"
    }
  };

  const t = translations[language];

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (postTitle && postContent && postAuthor) {
      setPosts([...posts, { title: postTitle, content: postContent, author: postAuthor, comments: [] }]);
      setPostTitle('');
      setPostContent('');
      setPostAuthor('');
    }
  };

  const handleCommentSubmit = (e, postIndex, commentAuthor, commentContent) => {
    e.preventDefault();
    if (commentAuthor && commentContent) {
      const newPosts = [...posts];
      newPosts[postIndex].comments.push({ author: commentAuthor, content: commentContent });
      setPosts(newPosts);
    }
  };

  const createMarkup = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const replacedText = text.replace(urlRegex, (url) => {
      return `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`;
    });
    return { __html: replacedText };
  };

  return (
    <div className="blog-page">
      <h1>{t.blog}</h1>
      <form className="post-form" onSubmit={handlePostSubmit}>
        <input
          type="text"
          placeholder={t.titlePlaceholder}
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder={t.namePlaceholder}
          value={postAuthor}
          onChange={(e) => setPostAuthor(e.target.value)}
          required
        />
        <textarea
          placeholder={t.postPlaceholder}
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          required
        ></textarea>
        <button type="submit">{t.postButton}</button>
      </form>
      <div className="posts">
        {posts.map((post, index) => (
          <div key={index} className="post">
            <h2>{post.title}</h2>
            <p><strong>{post.author}</strong></p>
            <p dangerouslySetInnerHTML={createMarkup(post.content)}></p>
            <div className="comments">
              {post.comments.map((comment, commentIndex) => (
                <div key={commentIndex} className="comment">
                  <p><strong>{comment.author}</strong>: {comment.content}</p>
                </div>
              ))}
              <form
                className="comment-form"
                onSubmit={(e) =>
                  handleCommentSubmit(
                    e,
                    index,
                    e.target.commentAuthor.value,
                    e.target.commentContent.value
                  )
                }
              >
                <input
                  type="text"
                  name="commentAuthor"
                  placeholder={t.commentNamePlaceholder}
                  required
                />
                <textarea
                  name="commentContent"
                  placeholder={t.commentPlaceholder}
                  required
                ></textarea>
                <button type="submit">{t.commentButton}</button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Blog;
