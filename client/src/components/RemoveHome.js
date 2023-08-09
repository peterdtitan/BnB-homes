import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Card, Col, Row, Button, Text,
} from '@nextui-org/react';
import { deleteHome, fetchAllHomes } from '../redux/homesSlice';

const RemoveHome = () => {
  const dispatch = useDispatch();
  const homes = useSelector((state) => state.homes.homes);

  useEffect(() => {
    // Fetch all homes when the component mounts
    dispatch(fetchAllHomes());
  }, [dispatch]);

  const handleDelete = (homeId) => {
    try {
      // Dispatch the deleteHome action with the homeId
      dispatch(deleteHome(homeId));
    } catch (error) {
      console.error('Error deleting home:', error);
      // Handle error if necessary
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-evenly px-10 -mt-10">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-widest">
          Remove your Listed HOME
        </h1>
        <p className="italic font-thin text-md mt-2">manage your listings.</p>
      </div>
      <div className="flex max-w-[85%] bg-white overflow-x-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-primary">
        {homes.map((home) => (
          <div key={home.id} className="min-w-80 flex-shrink-0 mx-2">
            <Card css={{ w: '100%', h: '400px' }}>
              <Card.Header css={{ position: 'absolute', zIndex: 1, top: 5 }}>
                <Col>
                  <Text
                    size={12}
                    weight="bold"
                    transform="uppercase"
                    color="#ffffffAA"
                  >
                    New
                  </Text>
                  <Text h3 color="black">
                    {home.title}
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
                  bgBlur: '#ffffff66',
                  borderTop:
                    '$borderWeights$light solid rgba(255, 255, 255, 0.2)',
                  bottom: 0,
                  zIndex: 1,
                }}
              >
                <Row>
                  <Col>
                    <Text color="#000" size={12}>
                      Available soon.
                    </Text>
                    <Text color="#000" size={12}>
                      Get notified.
                    </Text>
                  </Col>
                  <Col>
                    <Row justify="flex-end">
                      <Button
                        flat
                        auto
                        rounded
                        color="secondary"
                        onClick={() => handleDelete(home.id)}
                      >
                        <Text
                          css={{ color: 'inherit' }}
                          size={12}
                          weight="bold"
                          transform="uppercase"
                        >
                          Delete
                        </Text>
                      </Button>
                    </Row>
                  </Col>
                </Row>
              </Card.Footer>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RemoveHome;
