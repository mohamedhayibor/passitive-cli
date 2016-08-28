#!/usr/bin/env node
'use strict';
const meow = require('meow');
const Conf = require('conf');
const toClipboard = require('to-clipboard');
const jsonfile = require('jsonfile');

// The store is where our encrypted passwords are permanently stored (persistent).
const store = new Conf();

// ^^^^^^ For demo purpose only > you would want to put your key in you env variables or any other method to obfuscate it
var key = 'real secret keys should be long and random. Ours is the most private :)';

var encryptor = require('simple-encryptor')( key );

const cli = meow(`
  Usage:
  To set password:
    pass account password

  To get password:
    pass gmail
  `, {
  alias: {
    'v': 'version',
    'h': 'help',
    'j': 'json',
    'd': 'delete',
    'c': 'clear',
    'p': 'path'
  }
});


let input = cli.input;

// **************** Logic to decrypt and get the password on the clipboard
// when then user wants the password back only > 1 argument is needed

if (input.length == 1 && Object.keys(cli.flags).length == 0) {
  let account = input.join('').trim();

  if ( store.has(account) ) {
    let hashedPassword = store.get(account);

    // making sure that we the decrypted pass is a string
    let plainTextPassword = String( encryptor.decrypt( hashedPassword ) );

    // piping the plain password for only 5s
    toClipboard.sync( plainTextPassword );

    setTimeout( function() {
      toClipboard.sync( 'Nothing to copy really - rubish' );
    }, 5 * 1000);

   // toClipboard('Nothing to see really.', function () { } );
   console.log(`Your password is already on your clipboard!`);
  } else {
    // warn user then exit
    console.log(`
  Hey, it seems that you haven't set the password for that account yet.
  Do it like so:
  > pass gmail freakingStrongPasswordYaSee!
    `);
    process.exit(1);
  }
}


// *************** Logic to encrypt and store the password
// making sure that this part is only executed with intended number of args


if (input.length == 2 && Object.keys(cli.flags).length == 0) {
  let account = input[0];
  let plainPassword = input[1];

  // at this point we have to encrypt first then save
  let encryptedPassword = encryptor.encrypt( plainPassword );

  // storing encrypted pass
  store.set(account, encryptedPassword);

  console.log("encrypted: ", encryptedPassword);

}


// ************* Logic to encrypt and store all encrypted passwords from a file
// The different file processing is handled with flags
// All file processing follow the convention: > pass filepath (flags)
// We only care about the first flag in this case

// capturing and making the filepath a global variable
// To extend the logic for multiple files processing we'll just use .shift()
// on cli.input to get the filepaths in a FIFO style
// Because we are dealing with a small dataset we'll write in an async fashion

if ( Object.keys(cli.flags).length > 0) {
  let filepath = input[0];

  //  console.log('filepath provided: >', filepath); // prev debug purpose

  // logic for a json file
  // In this case we have exampleJson.json as demo file
  if ( cli.flags.j ) {
    console.log('Processing the json file');
    // at this point we'll suppose that the json is in the format
    // key: plain text password
    let passwordObject = jsonfile.readFileSync( filepath ); // for debugging

    // console.log('passowordObject: >', passwordObject);

    // acc means account
    for ( let acc in passwordObject) {
      let encryptedAcc = encryptor.encrypt(passwordObject[ acc ]);
      store.set( acc, encryptedAcc );
      // printing the encrypted version for demo purposes
      console.log(acc, ': ', encryptedAcc );
    }

    console.log('finished encrypting all passwords provided in json file');
  }

  // logic for an excel file > Screw it> abandonned it

  // Extra functionalities for ease of use at the entreprise level
  // > using .delete() to deleted an account + encrypted
  if ( cli.flags.d ) {
    let accountToDelete = input[0];

    if ( store.has(accountToDelete) ) {
      store.delete( accountToDelete );
      console.log(`Deleting ${ accountToDelete } and its encrypted password`);
    } else {
      console.log('There are no account with that name. Please double check the account.');
      process.exit(1);
    }
  }

  // > using .clear() to delete all encrypted passwords since the beg. of time
  if ( cli.flags.c) {
     console.log('Deleting all accounts and encrypted passwords');
     store.clear();
  }

  // > using .path to get file path (location) of the encrypted passwords
  if ( cli.flags.p ) {
    console.log('The location of the encrypted passwords is: ', store.path);
  }
}
