import React, { useEffect, useRef } from 'react';
import {
  Card, Col, Row, Button, Text, Spinner,
} from '@nextui-org/react';
import { useDispatch, useSelector } from 'react-redux';
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { fetchAllHomes } from '../redux/homesSlice';

export default function Home() {
  const scrollContainerRef = useRef(null);
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300,
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300,
        behavior: 'smooth',
      });
    }
  };

  const dispatch = useDispatch();
  const homes = useSelector((state) => state.homes.homes);

  useEffect(() => {
    // Fetch all homes when the component mounts
    dispatch(fetchAllHomes());
  }, [dispatch]);

  const navigate = useNavigate();

  const handleCardClick = (homeId) => {
    navigate(`/Home/${homeId}`);
  };

  return (
    <div className="w-[100%] h-screen flex flex-col items-center justify-evenly -mt-10">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-widest mt-12">
          LATEST HOMES
        </h1>
        <p className="italic font-thin text-md mt-2">Welcome to BnB Homes.</p>
      </div>
      <div className="flex gap-8 w-full items-center">
        <button
          type="button"
          className="hidden md:flex bg-gray-600 p-4 -mx-4 rounded-r-full focus:outline-none"
          onClick={scrollLeft}
        >
          <AiFillCaretLeft className="ml-8 text-white" size={25} />
        </button>
        <div
          ref={scrollContainerRef}
          className="flex gap-4 bg-white overflow-x-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-primary"
        >
          {homes ? (
            homes.map((home) => (
              <div
                key={home.id}
                className="min-w-80 h-[500px] flex items-center flex-shrink-0 mx-2"
                onClick={() => handleCardClick(home.id)}
              >
                <Card
                  css={{ w: '100%', h: '300px' }}
                  className="transform hover:scale-110 transition-all duration-300"
                  key={home.id}
                >
                  <Card.Header
                    css={{ position: 'absolute', zIndex: 1, top: 5 }}
                  >
                    <Col>
                      <Text
                        size={12}
                        weight="bold"
                        transform="uppercase"
                        color="#ffffff"
                      >
                        <p className="rounded-full w-12 bg-green-300/90 px-2 py-1 text-green-700">
                          New
                        </p>
                      </Text>
                      <Text h3 color="#fffff">
                        <p className="p-2 bg-black/80 max-w-[60%] mt-2 text-white rounded-lg font-medium">
                          {home.name.toUpperCase()}
                        </p>
                      </Text>
                    </Col>
                  </Card.Header>
                  <Card.Body css={{ p: 0 }}>
                    <div className="w-[300px] h-[300px]">
                      <Card.Image
                        src={home.image}
                        width="100%"
                        height="100%"
                        objectFit="cover"
                        alt="Card example background"
                      />
                    </div>
                  </Card.Body>
                  <Card.Footer
                    isBlurred
                    css={{
                      position: 'absolute',
                      bgBlur: '#ffffff',
                      borderTop:
                        '$borderWeights$light solid rgba(255, 255, 255, 0.2)',
                      bottom: 0,
                      zIndex: 1,
                    }}
                  >
                    <Row>
                      <Col>
                        <Text color="#000" size={12}>
                          <p className="animate-pulse font-semibold px-2 py-1 rounded-md">
                            Holiday season!
                          </p>
                        </Text>
                        <Text color="#000" size={12}>
                          <p className="animate-pulse2 font-medium bg-yellow-200 px-2 py-1 rounded-md">
                            Discounts up to 50%
                          </p>
                        </Text>
                      </Col>
                      <Col>
                        <Row justify="flex-end">
                          <Button flat auto rounded color="primary">
                            <Text
                              css={{ color: 'inherit' }}
                              size={12}
                              weight="bold"
                              transform="uppercase"
                            >
                              View Home
                            </Text>
                          </Button>
                        </Row>
                      </Col>
                    </Row>
                  </Card.Footer>
                </Card>
              </div>
            ))
          ) : (
            <div className="w-full">
              <Spinner
                label="Primary"
                color="primary"
                labelColor="primary"
                className="text-6xl"
              />
            </div>
          )}
        </div>
        <button
          type="button"
          className="hidden md:flex bg-gray-600 p-4 -mx-4 rounded-l-full focus:outline-none"
          onClick={scrollRight}
        >
          <AiFillCaretRight className="mr-8 text-white" size={25} />
        </button>
      </div>
      <div className="md:hidden flex gap-10 -mt-16 items-center justify-center">
        <button
          type="button"
          className="bg-gray-600 p-4 -mx-4 rounded-l-full focus:outline-none"
          onClick={scrollLeft}
        >
          <AiFillCaretLeft className="ml-8 text-white" size={20} />
        </button>
        <button
          type="button"
          className="bg-gray-600 p-4 -mx-4 rounded-r-full focus:outline-none"
          onClick={scrollRight}
        >
          <AiFillCaretRight className="mr-8 text-white" size={20} />
        </button>
      </div>
    </div>
  );
}
