
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { GoVerified } from 'react-icons/go';
import axios from 'axios';

import VideoCard from '../../components/VideoCard';
import NoResults from '../../components/NoResults';
import { IUser, Video } from '../../types';
import { BASE_URL } from '../../utils';

interface IProps {
    data: {
        user: IUser;
        userVideos: Video[];
        userLikedVideos: Video[];
    };
}

//1:46:00
const Profile = ( { data } : IProps) => {

    const [ showUserVideos, setShowUserVideos] = useState<Boolean>(true);
    const [ videoList, setVideoList ] = useState<Video[]>([]); 

    const { user, userVideos, userLikedVideos } = data;

    console.log("User : ", data);
    const videos = showUserVideos ? 'border-b-2 border-black' : 'text-gray-400';
    const liked = !showUserVideos ? 'border-b-2 border-black' : 'text-gray-400';

    useEffect(() => {
        const fetchVideos = async () => {
            if (showUserVideos) {
                setVideoList(userVideos);
            } else {
                setVideoList(userLikedVideos);
            }
        };

        fetchVideos();
    }, [showUserVideos, userLikedVideos, userVideos]);


        return (
            <div className='w-full'>
      <div className='flex gap-6 md:gap-10 mb-4 bg-white w-full'>
      <div className='w-8 h-8'>
                <Image
                  width={34}
                  height={34}
                  className='rounded-full'
                  src={user?.image}
                  alt='user-profile'
                  layout='responsive'
                />
              </div>

              <div className='hidden xl:block'>
                <p className='flex gap-1 items-center text-md font-bold text-primary lowercase'>
                  {user?.userName?.replace(/\s+/g, '')}{' '}
                  <GoVerified className='text-blue-400' />
                </p>
                <p className='capitalize text-gray-400 text-xs'>
                  {user?.userName}
                </p>
              </div>
      </div>
      <div>
        <div className='flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full'>
          <p className={`text-xl font-semibold cursor-pointer ${videos} mt-2`} onClick={() => setShowUserVideos(true)}>
            Videos
          </p>
          <p className={`text-xl font-semibold cursor-pointer ${liked} mt-2`} onClick={() => setShowUserVideos(false)}>
            Liked
          </p>
        </div>
        <div className='flex gap-6 flex-wrap md:justify-start'>
        {videoList.length > 0 ? (
            videoList.map((post: Video, idx: number) => (
              <VideoCard key={idx} post={post} />
            ))
          ) : (
            <NoResults
              text={`No ${showUserVideos ? '' : 'Liked'} Videos Yet`}
            />
          )}
        </div>
      </div>
    </div>
        )
}

export const getServerSideProps = async ({
    params: { userId },
} : {
    params: { userId: string};
}) => {
    const res = await axios.get(`${BASE_URL}/api/profile/${userId}`);

    return {
        props: { data : res?.data},
    };
}

export default Profile;