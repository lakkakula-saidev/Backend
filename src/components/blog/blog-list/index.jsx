import React, { Component } from "react";
import { Row, Col, Spinner, Button } from "react-bootstrap";
import BlogItem from "../blog-item";
import Get from "../../Get.js";
import { saveAs } from "file-saver";
/* import download from "js-file-download";
import { axios } from "axios"; */

export default class BlogList extends Component {
    state = {
        posts: null,
        isLoading: true
    };

    async componentDidMount() {
        this.setState({ posts: await Get("blogPosts") });
        console.log(this.state.posts);
        this.setState({ isLoading: false });
    }

    async createPdf(e) {
        const apiUrl = process.env.REACT_APP_API_URL;
        const endpoint = `${apiUrl}/blogPosts/${e.target.id}/loadPdf`;

        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/pdf" },
            origin: "http//:localhost:3000"
        };

        /* 
        fetch(`${endpoint}`, requestOptions)
            .then((res) => {
                return res.blob();
            })
            .then((blob) => {
                const href = window.URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = href;
                console.log("I am here");
                link.setAttribute("download", "blogPost.pdf"); //or any other extension
                document.body.appendChild(link);
                link.click();
            })
            .catch((err) => {
                return Promise.reject({ Error: "Something Went Wrong", err });
            }); */

        try {
            const response = await fetch(endpoint, requestOptions);

            if (!response.ok) {
                throw new Error(response);
            }

            // Extract filename from header
            /* const filename = response.headers
                .get("content-disposition")
                .split(";")
                .find((n) => n.includes("filename="))
                .replace("filename=", "")
                .trim(); */
            const blob = await response.blob();

            // Download the file
            saveAs(blob, "testing.pdf");
        } catch (error) {
            throw new Error(error);
        }
    }

    render() {
        return (
            <Row>
                {this.state.isLoading && <Spinner animation="border" variant="primary" />}
                {!this.state.isLoading && (
                    <>
                        {this.state.posts !== null
                            ? this.state.posts.map((post) => (
                                  <Col md={4} style={{ marginBottom: 50 }}>
                                      <BlogItem key={post.title} {...post} />
                                      <Button id={post._id} onClick={(e) => this.createPdf(e)} variant="secondary" size="sm" style={{ marginTop: "10px", marginBottom: "50px" }}>
                                          Download PDF {/* <a href={`http://localhost:3001/blogPosts/${post._id}/loadPdf`}>Download PDF </a> */}
                                      </Button>
                                  </Col>
                              ))
                            : ""}
                    </>
                )}
            </Row>
        );
    }
}
