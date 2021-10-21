import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as commentActions } from "../redux/modules/comment";
import { actionCreators as postActions } from "../redux/modules/post";
import Modal from "react-modal";
import Input from "../elements/Input";
import { history } from "../redux/configStore";

// icon
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { FaRegComment } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";

function ModalContainer(props) {
  // modal
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const dispatch = useDispatch();
  // postdata
  const postData = useSelector((state) => state.post.postData);
  // comment list
  const commentList = useSelector((state) => state.comment.list);
  console.log(commentList);
  console.log(commentList[1]);

  // like
  const [isLike, setIsLike] = useState(false);
  // comment
  const [currentComment, setCurrentComment] = useState("");

  const clickHeart = () => {
    if (!isLike) {
      setIsLike(true);
    } else {
      setIsLike(false);
    }
  };

  const submitComment = (e) => {
    e.preventDefault();
    if (currentComment.trim() === "") {
      window.alert("공백을 제외하고 한 글자 이상 입력해주세요.");
      return;
    }
    const commentObj = {
      content: currentComment,
      postId: postData.postId,
    };
    dispatch(commentActions.addCommentDB(commentObj));
    setCurrentComment("");
  };

  const deleteComment = (postId) => {
    dispatch(commentActions.deleteCommentDB(postId));
  };

  const deletePost = (postId) => {
    dispatch(postActions.deletePostDB(postId));
  };

  console.log(modalIsOpen);
  console.log(modalIsOpen.id);

  return (
    <ModalContainers>
      <ImgContainer>
        <img src={`http://15.165.18.118${postData.image}`} alt="content_img" />
      </ImgContainer>
      <ContentContainer>
        <ModalHeader>
          <UserInfo>
            <img src={props.user_img} alt="user_profile" />
            <div>{postData.nickname}</div>
          </UserInfo>
          <UserSet
            onClick={() => {
              setModalIsOpen({ type: "post", id: postData.postId });
            }}
          >
            ...
          </UserSet>
        </ModalHeader>

        <ModalContents>
          <UserContents>
            <img
              src={`http://15.165.18.118${postData.image}`}
              alt="user_profile"
            />
            <Container>
              <div>{postData.nickname}</div>
              <div>{postData.content}</div>
            </Container>
          </UserContents>
          <div>
            {commentList.map((c) => (
              <UserContents
                key={c.postId}
                onClick={() => {
                  setModalIsOpen({ type: "comment", id: c.commentId });
                }}
              >
                <img src={props.user_img} alt="user_profile" />
                <Container>
                  <div>{c.nickname}</div>
                  <div>{c.content}</div>
                </Container>
              </UserContents>
            ))}
            <Modal
              onRequestClose={() => setModalIsOpen(false)}
              isOpen={modalIsOpen}
              style={{
                overlay: {
                  backgroundColor: "rgba(0,0,0,0.5)",
                  zIndex: "1000",
                },
                content: {
                  top: "50%",
                  left: "50%",
                  right: "auto",
                  bottom: "auto",
                  marginRight: "-50%",
                  transform: "translate(-50%, -50%)",
                  width: "400px",
                  height: "220px",
                  padding: "0px",
                  borderRadius: "12px",
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                },
              }}
            >
              <ModalBtnOne
                style={{ color: "#ed4956" }}
                onClick={() => {
                  if (modalIsOpen.type === "comment") {
                    deleteComment(postData.postId, modalIsOpen.id);
                    history.replace("/");
                  }
                  if (modalIsOpen.type === "post") {
                    deletePost(postData.postId);
                    history.replace("/");
                  }
                }}
              >
                삭제
              </ModalBtnOne>
              <ModalBtn onClick={() => setModalIsOpen(false)}>취소</ModalBtn>
            </Modal>
          </div>
        </ModalContents>

        <ModalLikeComment>
          <ModalIcon>
            <div isLike={isLike}>
              {isLike ? (
                <FavoriteIcon style={{ color: "red", fontSize: 30 }} />
              ) : (
                <FavoriteBorderIcon
                  onClick={clickHeart}
                  style={{ fontSize: 30 }}
                />
              )}
            </div>
            <div>
              <FaRegComment />
            </div>
            <div>
              <FiSend />
            </div>
            <div>
              <BookmarkBorderIcon style={{ fontSize: 30 }} />
            </div>
          </ModalIcon>
          <Like>좋아요 {postData.likeCount}개</Like>
          {/* <div>1일전</div> */}
        </ModalLikeComment>

        <ModalInput>
          <Input
            type="text"
            value={currentComment}
            placeholder="댓글 달기..."
            _onChange={(e) => {
              setCurrentComment(e.target.value);
            }}
          />
          <button onClick={submitComment}>게시</button>
        </ModalInput>
      </ContentContainer>
    </ModalContainers>
  );
}

ModalContainer.defaultProps = {
  user_img: require("../assets/images/profile.jpg").default,
  userName: "Hyun",
  userNickName: "altere",
  contents_img: require("../assets/images/content.jpg").default,
  contents: "안녕하세요",
  comments: "좋아요!",
};

const ModalContainers = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImgContainer = styled.div`
  width: 60%;
  height: 100%;
`;

const ContentContainer = styled.div`
  width: 40%;
  height: 100%;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-height: 70px;
  border-bottom: 1px solid rgba(var(--ce3, 239, 239, 239), 1);
  padding: 10px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  div {
    font-weight: bold;
    font-size: 14px;
  }
  img {
    width: 11%;
    height: 50%;
    cursor: pointer;
    margin-right: 20px;
    margin-left: 20px;
    border-radius: 50%;
  }
`;

const UserSet = styled.div`
  width: auto;
  height: auto;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 30px;
  margin-right: 20px;
  cursor: pointer;
`;

const UserContents = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  div {
    font-weight: bold;
    font-size: 14px;
    display: flex;
    align-items: center;
  }
  div:last-child {
    width: 100%;
    padding-left: 5px;
  }
  img {
    width: 11%;
    height: 50%;
    cursor: pointer;
    margin-right: 10px;
    margin-left: 20px;
    border-radius: 50%;
  }
`;

const Container = styled.div``;

const ModalContents = styled.div`
  border-bottom: 1px solid rgba(var(--ce3, 239, 239, 239), 1);
  height: 55%;
  overflow: auto;
`;

const ModalLikeComment = styled.div`
  border-bottom: 1px solid rgba(var(--ce3, 239, 239, 239), 1);
  height: 20%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  padding: 10px;
`;

const ModalIcon = styled.div`
  display: flex;
  align-items: center;
  height: 20px;
  font-size: 30px;
  cursor: pointer;

  div {
    padding: 10px 10px 10px 0px;
  }
  div:last-child {
    padding-left: 150px;
  }
`;

const Like = styled.div`
  font-size: 14px;
  font-weight: bold;
`;

const ModalInput = styled.div`
  width: 100%;
  height: auto;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  input {
    border: none;
    width: 80%;
    min-height: 30px;
    outline: none;
  }
  button {
    border: none;
    color: #3badf8;
    background-color: unset;
    font-size: 16px;
    cursor: pointer;
  }
`;
const ModalBtnOne = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  font-size: 14px;
  margin-top: 16px;
  border-top: 1px solid rgba(var(--b6a, 219, 219, 219), 1);
  cursor: pointer;
  line-height: 1.5;
  padding: 4px 8px;
  margin: 0px;
  min-height: 48px;
`;

const ModalBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  font-size: 14px;
  margin-top: 16px;
  border-top: 1px solid rgba(var(--b6a, 219, 219, 219), 1);
  border-bottom: 1px solid rgba(var(--b6a, 219, 219, 219), 1);
  cursor: pointer;
  line-height: 1.5;
  padding: 4px 8px;
  margin: 0px;
  min-height: 48px;
`;

// const ModalCloseBtn = styled.button`
//   position: fixed;
//   top: 10px;
//   right: 0px;
//   z-index: 100000;
// `;

export default ModalContainer;
