import React from "react";
import axios from "axios";
import { api } from "../shared/api";

import {Button, Image, Input, Grid, Text} from "../elements";
import styled from "styled-components";
import { FiShare } from "react-icons/fi";

import {useSelector, useDispatch} from "react-redux";
import { actionsCreators as postActions } from "../redux/modules/post";
import { actionCreators as imageActions } from "../redux/modules/image";
// get localStorage userNickname
import { useLocalStorage } from "../shared/useLocalStorage";

const Posting = (props) => {
    const dispatch = useDispatch();
    const is_login = useSelector((state) => state.user.is_login);
    const preview = useSelector((state) => state.image.preview);
    const { history } = props;

    // 입력값 저장
    const [comment, setComment] = React.useState('');
    const author = localStorage.getItem('author');
    // const text = {
    //     postingAuthor: localStorage.getItem('author'),
    //     postingComment: comment
    // };

    const fileInput = React.useRef();

    // 미리보기 
    const filePreview = () => {
        const reader = new FileReader();
        const file = fileInput.current.files[0];
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            dispatch(imageActions.setPreview(reader.result));
        };
    };

    const changeComment = (e) => {
        setComment(e.target.value);
    }

    const addPost = () => {
        const file = fileInput.current.files[0];

        if (!file) {
            window.alert("이미지를 업로드 해주세요!");
            return;
        }

        if(
            comment === ""
        ) {
            window.alert("빈 칸을 모두 입력 해주세요!");
            return;
        }

        const formData = new FormData();
        formData.append("img", file);
        formData.append('postingAuthor', author);
        formData.append('postingComment', comment);
        console.log(file);
        api
            .post("post/posting", formData, {headers: { 'Content-Type': 'multipart/form-data' }})
            .then((res)=> {
                console.log(res.data);
                dispatch(postActions.addPostDB());
            })
            .catch((err)=> {
                console.log(err);
            })
    }

    return (
        <Container>
        <React.Fragment>
            
                <Grid margin="auto">
                    <Grid padding="14px 0px 5px 0px">
                        <Align>
                            <Text size="17px" bold>
                                새 게시물
                            </Text> 
                        </Align>                        
                    </Grid>
                <Align>
                    <div>
                        <Padding>
                            <Image
                                shape="rectangle"
                                src={preview ? preview : "https://colorate.azurewebsites.net/SwatchColor/E2E2E2"}
                            />
                        </Padding>
                        
                        <input
                            type="file"
                            name="img"
                            ref={fileInput}
                            onChange={filePreview}
                            id="fileUpload"
                        />
                    </div>
                    <Margin>
                        <div padding="70px 0px">
                        <Input
                        _onChange={changeComment}
                        placeholder="내용을 입력해주세요!"
                        />
                        </div>
                    </Margin>
                    <Grid padding="5px 0px 15px 0px">
                        <Button 
                        _onClick={addPost}
                        >upload</Button>
                    </Grid>
                </Align>
                    
                </Grid>
            
        </React.Fragment>
        </Container>

    );
};

const Container = styled.div`
  max-width: 350px;
  background-color: white;
  overflow-y: auto;
  margin: 65px auto;
  border: 1px solid #0000001f;
  box-sizing: border-box;
`
const Align = styled.div`
  text-align: center;
`
const Padding = styled.div`
  padding: 10px;
`
const Margin = styled.div`
    margin: 15px auto;
`

export default Posting;