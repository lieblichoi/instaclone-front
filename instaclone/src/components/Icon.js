import React, { useState } from "react"
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"
import { BsChat, BsBookmark } from "react-icons/bs"
import { RiSendPlaneLine } from "react-icons/ri"
import { useDispatch } from "react-redux"
import { Buttons, Texts } from "../elements"
import { actionsCreators as postActions } from "../redux/modules/post"

export const Icon = () => {
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
    // like ? setLike(like - 1) :
    //   setLike(like + 1)
  }
  console.log("좋아요 + 1", like)
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "0px 8px",
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
                  padding: "5px",
                  width: "26px",
                  height: "26px",
                  color: "#ff0000ba",
                }}
              />
            ) : (
              <AiOutlineHeart
                style={{
                  padding: "5px",
                  width: "26px",
                  height: "26px",
                }}
              />
            )}
          </Buttons>
          {/* 채팅창 아이콘 */}
          <Buttons>
            <BsChat
              style={{
                padding: "5px",
                width: "24px",
                height: "24px",
                transform: "scaleX(-1)",
              }}
            />
          </Buttons>
          {/* 쪽지 아이콘 */}
          <Buttons>
            <RiSendPlaneLine
              style={{ padding: "5px", width: "26px", height: "26px" }}
            />
          </Buttons>
        </div>
        <div>
          <BsBookmark
            style={{ padding: "8px", width: "24px", height: "24px" }}
          />
        </div>
      </div>
      <div style={{ margin: "0px 13px" }}>
        <Texts> 좋아요 {like} 개</Texts>
      </div>
    </>
  )
}