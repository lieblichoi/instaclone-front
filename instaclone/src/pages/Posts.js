import React from "react";
import {Button, Image, Input, Grid, Text} from "../elements";
import {actionsCreators as postActions} from "../redux/modules/post";
import {useSelector, useDispatch} from "react-redux";
import Upload from "../shared/Upload";


const PostWrite = (props) => {
    const dispatch = useDispatch();
    const preview = useSelector((state) => state.image.preview);
    const { history } = props;

    // 입력값 저장
    const [title, setTitle] = React.useState("");
    const [contents, setContents] = React.useState('');

    const is_login = useSelector((state) => state.user.is_login);

    

    const changeContents = (e) => {
        setContents(e.target.value);
    }

    const addPost = () => {
        dispatch(postActions.addPostDB(contents));
    }

    return (
        <React.Fragment>
            <Grid padding="50px 0px">
                <Grid padding="16px">
                    <Text margin="0px" size="36px" bold>
                        게시글 작성
                    </Text>
                    
                </Grid>

                <div>
                    <Image
                        shape="rectangle"
                        src={preview ? preview : "http://via.placeholder.com/400x300"}
                    />
                    <Upload/>
                </div>

                <div padding="50px 0px">
                    <Input _onChange={changeContents} label="게시글 내용" placeholder="게시글 작성" multiLine/>
                </div>

                <Grid padding="16px">
                    <Button _onClick={addPost} text="게시글 작성"></Button>
                </Grid>
            </Grid>
            
        </React.Fragment>

    );
}

export default PostWrite;