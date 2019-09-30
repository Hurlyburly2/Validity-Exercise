<h1>Setup:</h1>
<ul>
  <li>Clone the repo locally and navigate to it</li>
  <li>From the main directory run: npm install (you may need to use node v12.6.0, if you have a different version you can get node version manager)</li>
  <li>Navigate to the client directory, then run: yarn install</li>
  <li>Inside the main directory run: 'node server.js'</li>
  <li>In another terminal window in the client directory run: npm start'</li>
  <li>Navigate to http://localhost:3000/. You can now use the app!</li>
</ul>

<h1>Usage:</h1>
I attempted to make using the app is self-explanatory! All you have to do is upload a csv to the component on the React from end's landing page. It will send the csv to the back end, parse your results, and display them back for you.
The uploader restricts you from uploading files other than CSV's (though more guards could be put in place for this for people determined to trick it), and if you upload a CSV that doesn't correspond to Validity's exercise (based on matching the headings on line 1) you will receive an error and be told to upload a correct file.
