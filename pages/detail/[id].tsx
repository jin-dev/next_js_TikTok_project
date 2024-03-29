import React, { useState, useEffect, useRef} from 'react'
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';
import { MdOutlineCancel } from 'react-icons/md';
import { BsFillPlayFill } from 'react-icons/bs';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import axios from 'axios';
import { Video } from '../../types';
import useAuthStore from '../../store/authStore';
import LikeButton from '../../components/LikeButton';
import Comments from '../../components/Comments';


export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;


interface IProps {
  postDetails : any,
}

const Detail = ({ postDetails} : IProps ) => {
  const { userProfile} : any  = useAuthStore();
  const [ isVideoMuted, setIsVideoMuted] = useState(false);
  const [ post, setPost ] = useState(postDetails);
  const [ playing, setPlaying ] = useState(false);

  const router  = useRouter();

  const videoRef = useRef<HTMLVideoElement>(null);
  const [ comment, setComment ] = useState('');
  const [ isPostingComment, setIsPostingComment ] = useState(false);

  const onVideoClick = () => {

    if(playing) {
      videoRef?.current?.pause();
      setPlaying(false);
    } else {
      videoRef?.current?.play();
      setPlaying(true);
    }

  }




  useEffect(() => {
    if( post && videoRef?.current) {
      videoRef.current.muted = isVideoMuted;
    }
  }, [post, isVideoMuted])


  if(!post) return null;

  const handleLikes = async (like: boolean) => {
    console.log("handleLike : " , like);
    if (userProfile) {
      const res = await axios.put(`${BASE_URL}/api/like`, {
        userId: userProfile._id,
        postId: post._id,
        like
      });
      setPost({ ...post, likes: res?.data?.likes });
    }
  }

  const addComment = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log("add Comment API");
    if (userProfile) {
     
        setIsPostingComment(true);
        const { data } = await axios.put(`${BASE_URL}/api/post/${post._id}`, {
          userId: userProfile._id,
          comment,
        });

        setPost({ ...post, comments: data?.comments });
        setComment('');
        setIsPostingComment(false);
      }
    
  };


  return (
    <div className="flex w-full absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap">
      <div className="relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-black">
        <div className="absolute top-6 left-2 lg:left-6 flex gap-6 z-50">
          <p className="cursor-pointer" onClick={() => router.back()}> <MdOutlineCancel className="text-white text-[35px]" /></p>
        </div>
        <div className="relative">
          <div className="lg:h-[100vh]">
            <video ref = {videoRef} loop onClick={onVideoClick} src={post?.video?.asset?.url} className="h-full cursor-pointer">

            </video>

          </div>

  

          <div className="absolute top-[45%] left-[45%] cursor-pointer" >
          {!playing && (
      <button onClick={onVideoClick}>
          <BsFillPlayFill className="text-white text-6xl lg:text-8xl"/>
      </button>
    )}
          </div>

        </div>

        <div className="absolute bottom-5 lg:bottom-10 right5 lg:right-10 cursor-pointer">

        {isVideoMuted ? (
                <button onClick={ () => setIsVideoMuted(false)}>
                  <HiVolumeOff
                  className="text-white text-2xl lg:text-4xl" />
                </button>
              ) : (                
              <button onClick={ () => setIsVideoMuted(true)}>
                <HiVolumeUp
                 className="text-white text-2xl lg:text-4xl" />
              </button>)}
        </div>

      </div>

      <div className="relative w-[1000px] md:w-[900px] lg:w-[700px]" >
                <div className="lg:mt-10">


                <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded">
      <div className="md:w-20 md:h-20 w-16 h-16 ml-4">
      <Link href="/">
        <>
          <Image
          width={62}
          height={62}
          className="rounded-full"
          src={post?.postedBy?.image }
          alt="profile photo"
          layout="responsive"
          />
        </>
      </Link>

      </div>
     

        </div>

        <div>
          <Link href="/">
            <div className="mt-3 flex flex-col px-10  gap-2 " >
            <p className="flex gap-2 md:text-md font-bold text-primary">{post.postedBy?.userName || post?.userName}
        <GoVerified className="text-blue-400 text-md" />
        </p>

        <p className="capitalize font-medium text-xs text-gray-500 hidden md:block">
        {post.postedBy.userName}
        </p>

            </div>

          </Link>


        </div>

                </div>

                <p className="px-10 text-lg text-gray-600">{post?.caption}</p>

                <div className="mt-10 px-10">
                  {userProfile && (
                    <LikeButton likes={post?.likes} handleLike={() => handleLikes(true)} handleDisLike={() => handleLikes(false)} />
                  )}
                </div>

                <Comments comment={comment}
                setComment={setComment}
                addComment={addComment}
                comments ={post?.comments}
                isPostingComment={isPostingComment} />

      </div>
      </div>
  )
}


export const getServerSideProps = async({ params: { id } } : {
  params : { id: string}
}) => {

  const { data } = await axios.get(`${BASE_URL}/api/post/${id}`)


  return {
    props: { postDetails: data}
  }


}






export default Detail;
/*
{!userProfile && (
    <div className="px-2 py-4 hidden xl:block"> 
      <p className="text-gray-400">Log in to like and comment on videos</p>
      <div className="pr-4">
        <GoogleLogin
        clientId=""
        render={(renderProps) => (
          <button
          className="cursor-pointer bg-white text-lg text-[#F51997] border-[1px] border-[#F51997] font-semibold px-6 py-3 rounded-md outline-none w-full mt-3 hover:text-white hover:bg-[#F51997]"
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            >
              Log in
              </button> 
        )}
        onSuccess={() => {}}
        onFailure={() => {}}
        cookiePolicy='single_host_origin'
        />
      </div>
      </div>
)} */