import React from 'react';
import homes  from '../data/dummy';
import { Card, Col, Row, Button, Text } from "@nextui-org/react";

export default function Home() {
  return (
    <div className='w-full h-screen flex flex-col items-center justify-evenly px-10 -mt-10'>
        <div className='text-center'>
            <h1 className='text-4xl font-bold tracking-widest'>LATEST HOMES</h1>
            <p className='italic font-thin text-md mt-2'>Welcome to BnB Homes.</p>
        </div>
        <div className="flex max-w-[85%] bg-white overflow-x-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-primary">
            {homes.map((home) => (
                <div key={home.id} className="min-w-80 flex-shrink-0 mx-2">
                  <Card css={{ w: "100%", h: "400px" }}>
                  <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
                    <Col>
                      <Text size={12} weight="bold" transform="uppercase" color="#ffffffAA">
                        New
                      </Text>
                      <Text h3 color="black">
                          {home.title}
                      </Text>
                    </Col>
                  </Card.Header>
                  <Card.Body css={{ p: 0 }}>
                    <div className='w-[300px] h-[300px]'>
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
                      position: "absolute",
                      bgBlur: "#ffffff66",
                      borderTop: "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
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
                          <Button flat auto rounded color="secondary">
                            <Text
                              css={{ color: "inherit" }}
                              size={12}
                              weight="bold"
                              transform="uppercase"
                            >
                              Notify Me
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
  )
}
