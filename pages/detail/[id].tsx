import React from 'react'

const Detail = () => {
  return (
    <div>Detail</div>
  )
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