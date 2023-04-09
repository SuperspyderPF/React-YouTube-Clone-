import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './App.css'
const API_KEY = 'API KEY HERE';

const App = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async (event) => {
    event.preventDefault();
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&part=snippet&q=${searchTerm}&maxResults=10&type=video`
    );
    const data = await response.json();
    setVideos(data.items);
    setSelectedVideo(data.items[0]);
  };

  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
  };

  const renderVideoList = () => {
    if (videos.length === 0) {
      return <div>No videos found</div>;
    }

    return videos.map((video) => {
      const imageUrl = video.snippet.thumbnails.medium.url;
      const title = video.snippet.title;

      return (
        <div key={video.id.videoId} className="my-3" onClick={() => handleVideoSelect(video)}>
          <Row>
            <Col md={4}>
              <img src={imageUrl} alt={title} className="img-fluid" />
            </Col>
            <Col md={8}>
              <h5>{title}</h5>
            </Col>
          </Row>
        </div>
      );
    });
  };

  const renderSelectedVideo = () => {
    if (!selectedVideo) {
      return <div>No video selected</div>;
    }

    const videoSrc = `https://www.youtube.com/embed/${selectedVideo.id.videoId}`;

    return (
      <Row>
        <Col md={8}>
          <div className="embed-responsive embed-responsive-16by9">
            <iframe className="embed-responsive-item" src={videoSrc} title={selectedVideo.snippet.title} allowFullScreen />
          </div>
          <h2>{selectedVideo.snippet.title}</h2>
          <p>{selectedVideo.snippet.description}</p>
        </Col>
      </Row>
    );
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <h1 className="text-center mb-5">React Bootstrap YouTube Clone</h1>
          <Form onSubmit={handleSearch}>
            <Row>
              <Col md={8}>
                <Form.Control type="text" placeholder="Search for videos" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} />
              </Col>
              <Col md={4}>
                <Button type="submit" className="w-100">
                  Search
                </Button>
              </Col>
            </Row>
          </Form>
          <hr />
          <Row>
            <Col md={4}>{renderVideoList()}</Col>
            <Col md={8}>{renderSelectedVideo()}</Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default App;
