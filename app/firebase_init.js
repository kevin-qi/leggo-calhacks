import * as firebase  from 'firebase';

const firebaseConfig = {
	apiKey: "AIzaSyDxT9RBvf_6_8RgjxakVOVDA5kTRXVOGwM",
	authDomain: "trackmydrinks.firebaseapp.com",
	databaseURL: "https://trackmydrinks.firebaseio.com/",
	storageBucket: "gs://trackmydrinks.appspot.com",
}

firebase.initializeApp(firebaseConfig)

export default firebase;