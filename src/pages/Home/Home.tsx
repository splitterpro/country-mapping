import { useCallback, useEffect, useState } from 'react';
//bootstrap
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import { ChevronLeft, ChevronRight } from 'react-bootstrap-icons';
//style
import './Home.scss';
//utility
import { filterCountryList, getNextSlideIndex } from '../../utils/home';
//redux
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../store/hooks';
import { fetchCountries, setCountries } from '../../store/slices/countriesSlice';

const Home = () => {

  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentPage, setCurrenPage] = useState(1);
  const [coutryListInfo, setCountryListInfo] = useState<any>([]);
  const [currentFilterInfo, setCurrentFilterName] = useState<string>("All");
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch<any>();
  const countries  = useAppSelector((state: any) => state.countries.countries);

  const displayedCountries = coutryListInfo?.length && coutryListInfo?.slice(0, currentPage * 12);
  const hasMore = displayedCountries.length < coutryListInfo?.length;

  useEffect(() => {
    dispatch(fetchCountries());
    setLoading(true);
    return (() => {
      dispatch(setCountries([]));
    })

  }, []);

  useEffect(() => {
    if (countries?.length) {
      setCountryListInfo(countries);
      setLoading(false);
    }
  }, [countries]);

  const handleRegionChange = (region: string) => {
    if (region && countries?.length) {
      let updatedCountryInfo = region === "All" ? countries : countries?.filter((item: any) => item?.region === region);
      setCountryListInfo(updatedCountryInfo);
      setCurrentFilterName(region);
      setCurrentSlide(0);
      setCurrenPage(1);
    }
  };

  const handleImageSlider = useCallback((styleDirection: string, index?: number) => {
    setCurrentSlide(prev => {
      const totalSlides = Math.min(4, coutryListInfo?.length || 0);
      return getNextSlideIndex(prev, totalSlides, styleDirection, index);
    });
  }, [coutryListInfo]);


  return (
    <div className="home-page">
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', width: '100vw', position: 'fixed', top: 0, left: 0, zIndex: 1050, background: 'rgba(255,255,255,0.8)' }}>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <>
          {/* Header with Filter */}
          <header className="home-header">
            <Container>
              <Row className="align-items-center">
                <Col>
                  <h1 className="site-title">Countries</h1>
                </Col>
                <Col xs="auto" className="d-none d-md-block">
                  <div className="filter-section">
                    {filterCountryList?.length && filterCountryList?.map((item: any) => {
                      return (
                        <button
                          className={`filter-option ${currentFilterInfo === item?.name ? 'active' : ''}`}
                          onClick={() => handleRegionChange(item?.name)}
                        >
                          {item?.name}
                        </button>
                      )
                    })}
                  </div>
                </Col>
                <Col xs="auto" className="d-md-none">
                  <button className="hamburger-menu">
                    <span></span>
                    <span></span>
                    <span></span>
                  </button>
                </Col>
              </Row>
            </Container>
          </header>

          <Container className="mt-4">
            {/* WELCOME Section */}
            <Row className="mb-5">
              <Col className="text-center">
                <div className="welcome-section">
                  <div className="welcome-line left"></div>
                  <h2 className="welcome-title">WELCOME</h2>
                  <div className="welcome-line right"></div>
                </div>
              </Col>
            </Row>

            {/* Main Content Area - Slider and Frame */}
            {coutryListInfo.length > 0 && (
              <Row className="mb-5">
                <Col lg={8} className="mb-4 mb-lg-0">
                  <div className="main-slider">
                    <div className="slider-wrapper">
                      <div className="slider-content">
                        {coutryListInfo.slice(0, 4).map((country: any, index: number) => (
                          <div
                            key={country.name}
                            className={`slider-item ${index === currentSlide ? 'active' : ''}`}
                          >
                            <div className="slider-image-placeholder">
                              <img
                                src={country.flag}
                                alt={`${country.name} flag`}
                                className="slider-image frame-image"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Slider Navigation */}
                    <div className="slider-navigation">
                      <Button
                        variant="outline-secondary"
                        className="slider-nav prev"
                        onClick={() => handleImageSlider("previous")}
                      >
                        <ChevronLeft />
                      </Button>

                      <div className="slider-dots">
                        {coutryListInfo.slice(0, 4).map((_: any, index: number) => (
                          <button
                            key={index}
                            className={`dot ${index === currentSlide ? 'active' : ''}`}
                            onClick={() => handleImageSlider("select", index)}
                          />
                        ))}
                      </div>

                      <Button
                        variant="outline-secondary"
                        className="slider-nav next"
                        onClick={() => handleImageSlider("next")}
                      >
                        <ChevronRight />
                      </Button>
                    </div>
                  </div>
                </Col>
                <Col lg={4}>
                  <div className="side-frame">
                    <div className="frame-content">
                      <div className="frame-placeholder">
                        <img src={require('../../assests/images/image.png')} alt="Frame" className="frame-image" />
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            )}

            {/* Countries Grid */}
            <Row className="g-4 mb-4">
              {displayedCountries?.length && displayedCountries?.map((country: any) => (
                <Col key={country?.name} xs={12} md={6}>
                  <Card className="h-100 country-card">
                    <Row className="g-0">
                      <Col xs={4}>
                        <div className="flag-container">
                          <img
                            src={country?.flag}
                            alt={`${country?.name} flag`}
                            className="country-flag"
                          />
                        </div>
                      </Col>
                      <Col xs={8}>
                        <Card.Body>
                          <Card.Title className="country-name">{country?.name}</Card.Title>
                          <Card.Text className="country-region">{country?.region}</Card.Text>
                        </Card.Body>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              ))}
            </Row>

            {/* Load More Button */}
            {hasMore && (
              <Row className="mb-5">
                <Col className="text-center">
                  <Button
                    variant="secondary"
                    onClick={() => { setCurrenPage(prev => prev + 1) }}
                    className="load-more-btn"
                  >
                    Load more
                  </Button>
                </Col>
              </Row>
            )}
          </Container>

          {/* Footer */}
          <footer className="home-footer">
            <Container>
              <Row className="justify-content-center">
                <Col xs={12} className="text-center">
                  <div className="social-icons">
                    <Button variant="outline-dark" className="social-icon">
                      <i className="fab fa-facebook-f"></i>
                    </Button>
                    <Button variant="outline-dark" className="social-icon">
                      <i className="fab fa-twitter"></i>
                    </Button>
                    <Button variant="outline-dark" className="social-icon">
                      <i className="fab fa-linkedin-in"></i>
                    </Button>
                    <Button variant="outline-dark" className="social-icon">
                      <i className="fab fa-youtube"></i>
                    </Button>
                  </div>
                  <p className="contact-email">Example@email.com</p>
                  <p className="copyright">Copyright © 2020 Name. All rights reserved.</p>
                </Col>
              </Row>
            </Container>
          </footer>
        </>
      )}
    </div>
  );
};

export default Home;