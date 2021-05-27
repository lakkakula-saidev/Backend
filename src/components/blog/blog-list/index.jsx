import React, { Component } from "react";
import { Row, Col, Spinner, Button } from "react-bootstrap";
import BlogItem from "../blog-item";
import Get from "../../Get.js";
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

        fetch(endpoint, {
            method: "GET",
            headers: {
                "Content-Type": "application/pdf",
                Origin: "http://localhost:3000"
            }
        })
            .then((stream) => new Response(stream))
            .then((response) => response.blob())
            .then((blob) => URL.createObjectURL(blob))
            .then((url) => console.log(url))
            .catch((err) => console.error(err));
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
