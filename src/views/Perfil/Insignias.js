import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import insignia_perfil from '../../assets/img/icon/insignia_perfil.svg';
import insignia_social from '../../assets/img/icon/insignia_social.svg';
import insignia_intelectual from '../../assets/img/icon/insignia_intelectual.svg';
import insignia_solidario from '../../assets/img/icon/insignia_solidario.svg';
import { getBadge } from '../../firebase/client';
import '../../assets/styles/components/insignias.css';
// import Card from 'react-bootstrap/Card';
// import CardDeck from 'react-bootstrap/CardDeck';

const Insignias = () => {

  const [listBadge, setListBadge] = useState([]);

  useEffect(() => {
    getBadge()
      .then((res) => {
        setListBadge(res);
      })
      .catch((error) => {
        console.log(error, 'error al mostrar insignias');
      });

  }, []);

  return (
    <div className='fade-in animated container__badge'>
      <h2 className='container__badge-title'>Insignias</h2>
      <Container>
        <Row>
          {
            listBadge.map((badge) => (
              <Col xs={12} sm={6} md={4} lg={3} xl={3} key={badge.id}>
                <Card>
                  <Card.Img variant='top' src={badge.image} />
                  <Card.Body>
                    <Card.Title>
                      {badge.name}
                    </Card.Title>
                    <h5 className='text-center'>Descripción</h5>
                    <Card.Text>
                      {badge.description}
                    </Card.Text>
                    <hr />
                    <h5 className='text-center'>¿Como ganarla?</h5>
                    <Card.Text>
                      {badge.instructions}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))
          }

        </Row>
      </Container>
    </div>
  );
};

export default Insignias;
