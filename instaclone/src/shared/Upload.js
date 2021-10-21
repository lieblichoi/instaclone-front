import React from "react";
import { Button } from "../elements";
import { storage } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as imageActions } from "../redux/modules/image";
import AWS from "aws-sdk";

const Upload = (props) => {
  AWS.config.update({
    region: "ap-northeast-2", // 버킷이 존재하는 리전을 문자열로 입력합니다. (Ex. "ap-northeast-2")
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: "ap-northeast-2:33058db0-ec41-4d9b-a944-96abf751b882",
    }),
  });

  const fileInput = React.useRef();
  const uploading = useSelector((state) => state.image.uploading);

  const selectFile = () => {
    const reader = new FileReader();
    const file = fileInput.current.files[0];
    reader.readAsDataURL(file);
    const upload = new AWS.S3.ManagedUpload({
      params: {
        Bucket: "s3imagehyun", // 업로드할 대상 버킷명
        Key: file.name + ".jpg", // 업로드할 파일명 (* 확장자를 추가해야 합니다!)
        Body: file, // 업로드할 파일 객체
      },
    });

    const promise = upload.promise();
    promise.then(
      function (data) {
        alert("이미지 업로드에 성공했습니다.");
      },
      function (err) {
        return alert("오류가 발생했습니다: ", err.message);
      }
    );
  };

  return (
    <React.Fragment>
      <input
        type="file"
        ref={fileInput}
        onChange={selectFile}
        disabled={uploading}
      />
    </React.Fragment>
  );
};

export default Upload;
