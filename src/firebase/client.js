import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
// import { firestore } from '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyD6qcYOpfYtaQ6jN-Lgib90VAkFCFxShcM',
  authDomain: 'team-react-53-comfeco.firebaseapp.com',
  projectId: 'team-react-53-comfeco',
  storageBucket: 'team-react-53-comfeco.appspot.com',
  messagingSenderId: '528449037894',
  appId: '1:528449037894:web:040e77cd09933a55f9cc47',
};

firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();
const mapUserFromFirebaseAuth = (user) => {
  const { email, displayName, uid } = user;
  return {
    uid,
    name: displayName,
    email,
  };
};

export const onAuthStateChanged = (onchange) => {
  return firebase.auth().onAuthStateChanged((user) => {
    const normalizedUser = mapUserFromFirebaseAuth(user);
    onchange(normalizedUser);
  });
};

export const userActive = () => {
  return firebase.auth().currentUser;
};

export const signInWithEmail = (email, password) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password);
};
export const createUserWithEmail = (email, password) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password);
};

export const loginWithGoogle = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(googleProvider);
};

export const loginWithFacebook = () => {
  const facebookProvider = new firebase.auth.FacebookAuthProvider();
  return firebase.auth().signInWithPopup(facebookProvider);
  // .then(user =>{
  //   return mapUserFromFirebaseAuth(user)
  // });
};

export const createUserProfile = (uid, data) => {
  return firebase.firestore().collection('usuarios').doc(uid).set(data);
};
// export const getUserProfile = (uid) => {
//   return firebase.firestore().collection('usuarios').doc(uid).get();
// };

export const sendRecoverPassword = (email) => {
  return firebase.auth().sendPasswordResetEmail(email);
};

export const recoveryPass = (code, newPassword) => {
  return firebase.auth().confirmPasswordReset(code, newPassword);
};
export const verifyPasswordResetCode = (code) => {
  return firebase.auth().verifyPasswordResetCode(code);
};

export const dateCreateUserProfile = () => {
  return firebase.firestore.Timestamp.fromDate(new Date());
};

export const getEvents = (id) => {
  return firebase
    .firestore()
    .collection('eventos')
    .where('enrolled', 'array-contains', id)
    .get()
    .then((snapshot) => {
      return snapshot.docs.map((doc) => {
        const data = doc.data();
        const { id } = doc;
        return {
          ...data,
          id,
        };
      });
    })
    .catch((error) => {
      console.log('Error getting events', error);
    });
};

export const getWorkshopsToday = (startDay, endDay) => {
  return firebase
    .firestore()
    .collection('talleres')
    .where('hora', '>=', startDay)
    .where('hora', '<', endDay)
    .orderBy('hora', 'desc')
    .get()
    .then((snapshot) => {
      return snapshot.docs.map((doc) => {
        const data = doc.data();
        const { id } = doc;
        const { hora } = data;
        console.log(hora, 'horas');
        // const date = new Date(hora.seconds * 1000);
        // const normalizedCreateAt = new Intl.DateTimeFormat('es-ES').format(date);
        const normalizedCreateAt = new Date(hora.seconds * 1000).toString();
        console.log(normalizedCreateAt, 'horitas');
        return {
          ...data,
          id,
          hora: normalizedCreateAt,
        };

      });
    })
    .catch((error) => {
      console.log('Error getting documents: ', error);
    });

};

export const getWorkshopsFilterArea = (valueArea) => {
  return (
    firebase
      .firestore()
      .collection('talleres')
      .where('area', '==', valueArea)
      .get()
      .then((snapshot) => {
        return snapshot.docs.map((doc) => {
          const data = doc.data();
          const { id } = doc;
          const { hora } = data;
          const normalizedCreateAt = new Date(hora.seconds * 1000).toString();
          return {
            ...data,
            id,
            hora: normalizedCreateAt,
          };
        });
      })
      .catch((error) => {
        console.log('Error getting documents: ', error);
      })
  );
};

export const getBadge = () => {
  return firebase.firestore()
    .collection('insignias')
    .get()
    .then((snapshot) => {
      return snapshot.docs.map((doc) => {
        const data = doc.data();
        const { id } = doc;
        return {
          ...data,
          id,
        };
      });
    })
    .catch((error) => {
      console.log('Error getting documents: ', error);
    });
};
export const getBadgeSpecific = (idBadge) => {
  return firebase.firestore().collection('insignias')
    .where('id', '==', idBadge)
    .get()
    .then((snapshot) => {
      return snapshot.docs.map((doc) => {
        const data = doc.data();
        const { id } = doc;
        return {
          ...data,
          id,
        };
      });
    })
    .catch((error) => {
      console.log('Error getting documents: ', error);
    });

};

export const getCommunities = () => {
  return firebase
    .firestore()
    .collection('comunidades')
    .get()
    .then((snapshot) => {
      return snapshot.docs.map((doc) => {
        const data = doc.data();
        const { id } = doc;
        return {
          ...data,
          id,
        };

      });
    })
    .catch((error) => {
      console.log('Error getting documents: ', error);
    });

};
export const setWorkshopStatus = (idWorkshop, estadoWorkshop) => {
  return firebase.firestore().collection('talleres').doc(idWorkshop).set({
    estado: estadoWorkshop,
  }, { merge: true });
};

export const updatePasword = (newPassword) => {
  const user = firebase.auth().currentUser;
  return user.updatePassword(newPassword);
};

export const uploadProfilePicture = (imagenFile, updateProfileImage, id) => {
  const storageRef = firebase.storage().ref(`images/${imagenFile.name}`).put(imagenFile);
  return storageRef.on('state_changed', (snapshot) => { }, (error) => {
    console.log(error);
  }, () => {
    firebase.storage().ref('images').child(imagenFile.name).getDownloadURL()
      .then((url) => {
        updateProfileImage(url, id);
      });
  });
};

export const updateProfile = (data, id) => {
  return firebase.firestore().collection('usuarios').doc(id).update({
    name: data.name,
    email: data.email,
    gender: data.gender,
    birth: data.birth,
    country: data.country,
    area: data.area,
    facebook: data.facebook,
    github: data.github,
    linkedin: data.linkedin,
    twitter: data.twitter,
    bibliography: data.bibliography,
  });
};

export const updateProfileImage = (url, id) => {
  return firebase.firestore().collection('usuarios').doc(id).update({
    photoUrl: url,
  });
};

// Seteamos cada actividad a registrar, en orden debe estar el estado previo, el tipo, el mensaje, el título, el color (good, bad) del titulo y el id
export const setActivity = async (type, message, title, color, id) => {
  const timeElapsed = new Date();
  const data = {
    type,
    message,
    title,
    color,
    time: timeElapsed.getTime(),
  };
  const doc = await db.collection('usuarios').doc(id);
  await doc.update({
    activity: firebase.firestore.FieldValue.arrayUnion(data),
  });
};
export const addBadgeProfile = (id, insignia) => {
  return firebase.firestore().collection('usuarios').doc(id).update({
    badge: firebase.firestore.FieldValue.arrayUnion(insignia),
  });
};

export const getGroup = (setGroupList) => {
  return firebase.firestore()
    .collection('grupos')
    .onSnapshot((querySnapshot) => {
      const groupList = [];
      querySnapshot.forEach((doc) => {
        groupList.push(doc.data());
      });
      setGroupList(groupList);
    });
};

export const getGroupsFilterLanguage = (valueLanguage, groupList) => {
  return firebase.firestore()
    .collection('grupos').where('programmingLanguage', '==', valueLanguage)
    .onSnapshot((querySnapshot) => {
      const listGroupsLanguage = [];
      querySnapshot.forEach((doc) => {
        listGroupsLanguage.push(doc.data());
      });
      groupList(listGroupsLanguage);
    });
};
export const updateStatusprofile = (id, state) => {
  return firebase.firestore().collection('usuarios').doc(id).update({
    state,
  });
};

export const logOut = () => {
  return firebase.auth().signOut();
};
