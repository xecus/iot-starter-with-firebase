'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase)
const ref = admin.database().ref()

exports.alert_on = functions.https.onRequest((req, res) => {
  const ssr_module = ref.child('/ssr_module')
  ssr_module.set({stat: '1'})
  res.status(200).send('ok');
});

exports.alert_off = functions.https.onRequest((req, res) => {
  const ssr_module = ref.child('/ssr_module')
  ssr_module.set({stat: '0'})
  res.status(200).send('ok');
});