const { initializeApp, applicationDefault} = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');

initializeApp({
    credential: applicationDefault(),
    databaseURL: 'https:/awsauth.firebaseio.com'
});

const listAllUsers =  (nextPageToken) => {
    // List batch of users, 1000 at a time.
    let users = [];
    return new Promise((resolve, reject) => {
        getAuth()
        .listUsers(1000, nextPageToken)
        .then((listUsersResult) => {
          listUsersResult.users.forEach((userRecord, index) => {
            users.push({userRec: userRecord.providerData, uid: userRecord.uid});
          });
          if (listUsersResult.pageToken) {
            // List next batch of users.
            listAllUsers(listUsersResult.pageToken);
          }
        })
        .then(() => resolve(users))
        .catch((error) => {
          console.log('Error listing users:', error);
        });
    })
};

const editUser = (name, email, uid) => {
  return new Promise((resolve, reject) => {
    getAuth()
    .updateUser(uid, {
      email,
      displayName: name,
    })
    .then((userRecord) => {
      // See the UserRecord reference doc for the contents of userRecord.
      console.log('Successfully updated user', userRecord.toJSON());
      resolve(userRecord);
    })
    .catch((error) => {
      console.log('Error updating user:', error);
      reject();
    });
  })
}

const deleteUser = (uid) => {
  console.log('admin dal hit');
  return new Promise((resolve, reject) => {
    if(uid === 'ms9rj3n9vVXDmkxFa5hHb2Go4Tx1') {
      reject();
    }
    else {
      getAuth()
      .deleteUser(uid)
      .then(() => {
        resolve('Successfully deleted user');
      })
      .catch((error) => {
        console.log('Error deleting user:', error);
        reject();
      });
    }
  })
}
  

module.exports = { deleteUser, editUser, listAllUsers }