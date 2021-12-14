import React, { useEffect, useState } from 'react';
import { db } from '../../firebase/client';
import Modal from '../Portals/Modal';
import Unsubscribe from '../Portals/Unsubscribe';
import SeeGroup from '../Portals/SeeGroup';

const MyGroup = (id) => {

  const [group, setGroup] = useState(false);
  const [members, setMembers] = useState([]);
  const [unsubscribe, setUnsubscribe] = useState(false);
  const [seeGroup, setSeeGroup] = useState(false);

  console.log(members);

  useEffect(() => {
    const arrayOfMembers = [];
    db.collection('usuarios').where('group', '==', id.id).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        arrayOfMembers.push(doc.data());
      });
      setMembers(arrayOfMembers);
    });
  }, []);

  if (id.id !== '' && !group) {
    const docRef = db.collection('grupos').doc(id.id);
    docRef.get().then((doc) => {
      if (doc.exists) {
        setGroup(doc.data());
      } else {
        // doc.data() will be undefined in this case
        console.log('Qué haces bucando cosas que no existen!?');
      }
    }).catch((error) => {
      console.log('Error getting document:', error);
    });
  }

  const handleUnsubscribe = () => {
    setUnsubscribe(true);
  };

  const onClose = () => {
    setUnsubscribe(false);
  };

  const onCloseGroup = () => {
    setSeeGroup(false);
  };

  const handleGroup = () => {
    setSeeGroup(true);
  };

  if (group !== false && id !== '') {
    return (
      <>
        <div className='my-group'>
          <div className='My-group-title'>
            <h5>Mi Equipo</h5>
            <button type='button' className='btn btn-outline-primary btn-sm' onClick={handleGroup}>ver grupo</button>
            <Modal isOpen={seeGroup} onClose={onCloseGroup}>
              <SeeGroup members={members} group={group} />
            </Modal>
          </div>
          <div className='row'>
            <div className='box-integrant-photo col-4'>
              <img src={group.image} alt='' />
            </div>
            <div className='col-8'>
              <h3 className='my-group-name'>{group.name}</h3>
              <span className='text-muted'>{group.programmingLanguage}</span>
            </div>
          </div>
          <div className='box-all-integrants'>
            <div className='box-one-integrants'>
              <div>
                <p>{group.description}</p>
              </div>
              <div>
                <button type='button' className='btn d-inline-block btn-outline-secondary btn-evento' onClick={handleUnsubscribe}>Salir del grupo</button>
                <Modal isOpen={unsubscribe} onClose={onClose}>
                  <Unsubscribe onClose={onClose} />
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className='Nogroup'>
      <i className='far fa-frown-open fa-5x' />
      <h4 className='text-muted'>
        Parece que no tienes grupo 😥
        <br />
        <br />
        <br />
        ¿Qué tal si buscas algún grupo interesante?
      </h4>
    </div>
  );
};

export default MyGroup;
