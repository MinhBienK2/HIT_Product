import React from 'react'
import './Profile.scss'
import Header from '../../components/header/Header'
import ProfileHeader from './profileHeader/ProfileHeader'
import ProfileLeft from './profileLeft/ProfileLeft'
import ProfileCenter from './profileCenter/ProfileCenter'
import ProfileRight from './profileRight/ProfileRight'


function Profile() {
  return (
    <div className='profile'>
        <Header />
        <ProfileHeader />
        <div className="profile_bottom">
            <ProfileLeft />
            <ProfileCenter />
            <ProfileRight />
        </div>
    </div>
  )
}

export default Profile