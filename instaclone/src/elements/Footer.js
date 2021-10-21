import React from "react";

const Footer = (props) => {
    return (
        <React.Fragment>
            <footer>
                <div className="container">
                    <nav className="footer-nav">
                        <ul>
                            <li>
                                <a href="#">소개</a>
                            </li>
                            <li>
                                <a href="#">블로그</a>
                            </li>
                            <li>
                                <a href="#">도움말</a>
                            </li>
                            <li>
                                <a href="#">Api</a>
                            </li>
                            <li>
                                <a href="#">개인정보처리방침</a>
                            </li>
                            <li>
                                <a href="#">약관</a>
                            </li>
                            <li>
                                <a href="#">인기 계정</a>
                            </li>
                            <li>
                                <a href="#">해시태그</a>
                            </li>
                            <li>
                                <a href="#">위치</a>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="container">
                    <nav className="footer-nav">
                        <div className="copyright-notice">
                            © 2021 Instagram from Facebook
                        </div>
                    </nav>
                </div>
            </footer>
        </React.Fragment>
    )
}

export default Footer;