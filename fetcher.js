/**
 * ---- Page Downloader ----
 * M2/W5/HTTP & NodeJS/Page Downloader:
 * https://flex-web.compass.lighthouselabs.ca/workbooks/flex-m02w5/activities/418?journey_step=34
 * /lighthouse/page-fetcher/fetcher.js
 *
 * ---- CHALLENGE ----
 * Implement a node app called fetcher.js.

It should take two command line arguments:

a URL
a local file path
It should download the resource at the URL to the local path on your machine. Upon completion, it should print out a message like Downloaded and saved 1235 bytes to ./index.html.

> node fetcher.js http://www.example.edu/ ./index.html
Downloaded and saved 3261 bytes to ./index.html
Asynchronous Operations
There are two operations in this problem which will take an unknown amount of time:

You need to make an http request and wait for the response.
After the http request is complete, you need to take the data you receive and write it to a file in your local filesystem.
When you're trying to control the order of asynchronous operations, you can use nested callbacks.

Reading Documentation
This challenge requires you to search for some answers online. The Node.js official API docs are a valuable resource, but they can feel overwhelming at first. Luckily, the Node.js team has also provided a friendlier guide focused on people who are learning. Here's an example: Writing files with Node.js.

Warning
You may find a function in the Node documentation called writeFileSync. It is considered bad practice to use sync versions of functions that ought to be async. Please avoid it.

Question
How can you get the file size?

There are a couple of ways. If you dig into Node's documentation, you'll find there is a way to get statistics about a file that is sitting on your file system. However, you may not need to do that if you think about the fact that 1 character is equal to 1 byte.

Tips
Install and use the request library to make the HTTP request (We know this library is deprecated but it is still ok to use for our purposes.)
Use Node's fs (file system) module to write the file
Use the callback based approach we've been learning so far
Do not use the pipe function
Do not use synchronous functions (see warning above)

 */



//command line arguments
// 1. a URL
// 2. a local file path

const args = (process.argv).slice(2);
const argURL = args[0];
const argLocalFilePath = args[1];

//write a file with Node.js
const fs = require('fs');

// http request
const request = require('request');
request(argURL, function(error, response, body) {
  if (error) {
    console.error('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  }

  fs.writeFile(argLocalFilePath, body, err => {
    if (err) {
      console.error(err);
    }
    // file written successfully
    //find bytes
    
    const stats = fs.statSync('./index.html');
    const bytes = stats.size;
    console.log(`Downloaded and saved ${bytes} bytes to ${argLocalFilePath}`);
  });
});




