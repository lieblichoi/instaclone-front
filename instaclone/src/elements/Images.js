import React from "react"
import styled from "styled-components"

const Images = (props) => {
  const { profileImg, postSrc, profileSrc, size, bg } = props

  const styles = {
    profileImg,
    postSrc,
    profileSrc,
    size,
    bg,
  }

  if (profileImg) {
    return <ProfileImg {...styles}></ProfileImg>
  }

  return <PostImg {...styles}></PostImg>
}

Images.defaultProps = {
  postSrc: "https://www.codingfactory.net/wp-content/uploads/abc.jpg",
  profileSrc: "https://www.codingfactory.net/wp-content/uploads/abc.jpg",
  profileImg: false,
  size: 32,
  // bg: false,
}

const PostImg = styled.div`
  width: 100%;
  padding-top: 125%;
  background-image: url(${(props) => props.postSrc});
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
`
const ProfileImg = styled.div`
  --size: ${(props) => props.size}px;
  width: var(--size);
  height: var(--size);
  /* ${(props) => (props.bg ? `backgorundImage:url(${props.src})` : "")} */
  background-image: url(${(props) => props.profileSrc});
  border-radius: 50%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  margin: 8px;
`

export default Images;