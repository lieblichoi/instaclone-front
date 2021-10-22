import React, { useState } from "react"
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"
import { BsChat, BsBookmark } from "react-icons/bs"
import { BiHeart } from "react-icons/bi";
import {FiBookmark} from "react-icons/fi";
import { RiSendPlaneLine } from "react-icons/ri"
import { HiOutlinePaperAirplane } from "react-icons/hi";
import {RiChat3Line} from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux"
import { Buttons, Texts } from "../elements"
import { actionsCreators as postActions } from "../redux/modules/post"

export const Icon = (props) => {
  const { post } = props

  const dispatch = useDispatch()
  const [like, setLike] = useState(0)

  const likeUpdate = () => {
    setLike(!like)
    if (like) {
      setLike(like - 1)
      // dispatch(
      //   postActions.updateLikeMd({
      //     user_id: "asdasd",
      //     like: true,
      //     // })
      //   })
      // )
    } else {
      setLike(like + 1)
    }
  }

  console.log("좋아요 + 1", like)
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "8px",
        }}
      >
        {/* 아이콘 */}
        <div style={{ display: "flex" }}>
          {/* 좋아요 아이콘 */}
          <Buttons
            _onClick={() => {
              likeUpdate()
            }}
          >
            {like ? (
              <AiFillHeart
                style={{
                  width: "26px",
                  height: "26px",
                  color: "#ff0000ba",
                }}
              />
            ) : (
              <AiOutlineHeart
                style={{
                  width: "26px",
                  height: "26px",
                }}
              />
            )}
          </Buttons>
          {/* 채팅창 아이콘 */}
          <Buttons>
            <RiChat3Line
              style={{
                width: "24px",
                height: "24px",
                transform: "scaleX(-1)",
              }}
            />
          </Buttons>
          {/* 쪽지 아이콘 */}
          <Buttons>
            <HiOutlinePaperAirplane style={{ width: "26px", height: "26px" }} />
          </Buttons>
        </div>
        <div>
          <FiBookmark style={{ width: "24px", height: "24px" }} />
        </div>
      </div>
      <div style={{ margin: "0px 13px" }}>
        <Texts> 좋아요 {post.likeUser.length} 개</Texts>
      </div>
    </>
  )
}