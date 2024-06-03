/* eslint-disable react/prop-types */
import { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';

import Avatar from './Avatar';
import Button from './Button';
import { Context } from '../context/Context';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';

const Form = ({ placeholder, isComment, postId }) => {
  const { currentUser, openLoginModal, openRegisterModal, getPosts, getFetchedPost } = useContext(Context);

  const [body, setBody] = useState('');
  const [image, setImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      if (isComment) {
        await addDoc(collection(db, 'comments'), {
          tweet: body,
          createdAt: Date.now(),
          postId: postId,
          userId: currentUser.id,
          username: currentUser.username,
          name: currentUser.name
        });
        toast.success('Comment Posted');
        getFetchedPost(postId);
      } else {
        await addDoc(collection(db, 'posts'), {
          tweet: body,
          createdAt: Date.now(),
          userId: currentUser.id,
          username: currentUser.username,
          name: currentUser.name
        });
        toast.success('Tweet created');
        getPosts();
      }
      setBody('');
      setImage('');
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="border-b-[1px] dark:border-neutral-800 px-5 py-2">
      {currentUser ? (
        <div className="flex flex-row gap-4">
          <div>
            <Avatar userId={currentUser?.id} />
          </div>
          <div className="w-full">
            <textarea
              disabled={isLoading}
              onChange={(event) => setBody(event.target.value)}
              value={body}
              className="
                disabled:opacity-80
                peer
                resize-none 
                mt-3 
                w-full  
                ring-0 
                outline-none 
                text-[20px] 
                bg-transparent
                placeholder-neutral-500 
              "
              placeholder={placeholder}>
            </textarea>
            {
              !isComment &&
              <div className={`mt-1 mb-1 ${body === "" ? "hidden" : "inline"}`}>
                {/* <PostImage value={image} disabled={isLoading} onChange={(image) => setImage(image)} label="Upload any image" /> */}
              </div>
            }
            <hr
              className={`
                opacity-0 
                peer-focus:opacity-100 
                ${body !== "" && "opacity-100"}
                h-[1px] 
                w-full 
                dark:border-neutral-800 
                transition
                `}
            />
            <div className="mt-4 flex flex-row justify-end">
              <Button disabled={isLoading || !body} onClick={onSubmit} label="Tweet" />
            </div>
          </div>
        </div>
      ) : (
        <div className="py-8">
          <h1 className="text-2xl text-center mb-4 font-bold">Welcome to Twitter</h1>
          <div className="flex flex-row items-center justify-center gap-4">
            <Button label="Login" fullWidth onClick={openLoginModal} />
            <Button label="Register" fullWidth onClick={openRegisterModal} secondary />
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
