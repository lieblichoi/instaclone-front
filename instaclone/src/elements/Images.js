import React from "react"
import styled from "styled-components"

const Images = (props) => {
  const { profileImg, postSrc, profileSrc, size } = props

  if (profileImg) {
    return <ProfileImg src={profileSrc} size={size}></ProfileImg>
  }

  return <PostImg profileImg={profileImg} src={postSrc}></PostImg>
}

Images.defaultProps = {
  postSrc: "https://www.codingfactory.net/wp-content/uploads/abc.jpg",
  profileSrc: "https://www.codingfactory.net/wp-content/uploads/abc.jpg",
  profileImg: false,
  size: 32,
}

const PostImg = styled.div`
  width: 100%;
  padding-top: 125%;
  background-image: url(${(props) => props.src});
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
`
const ProfileImg = styled.div`
  --size: ${(props) => props.size}px;
  width: var(--size);
  height: var(--size);
  background-image: url(${(props) => props.src});
  border-radius: 50%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  margin: 8px;
`

export default Images;