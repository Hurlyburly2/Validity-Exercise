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
<ul>
  <li>I attempted to make using the app self-explanatory!</li>
  <li>Upload a csv to the component on the React front-end's landing page. It will send the file to the back end, parse your results, and display them back for you.</li>
  <li>Results are also outputted to both the browser console and the terminal in which you're running the node server</li>
  <li>The uploader restricts you from uploading files other than CSV's (though more guards could be put in place for this for people determined to trick it)</li>
  <li>If you upload a CSV that doesn't correspond to Validity's exercise (based on matching the headings on line 1) you will receive an error and be told to upload a correct file</li>
</ul>

<h1>Current Areas for Improvement:</h1>
<ul>
  <li>I think I've found all duplicates, but there are cases that could cause mistakes in other datasets. For example, I currently do not account for similar company names that nevertheless have a large amount of different characters. (eg. "ABC" vs "ABC Corporation")</li>
  <li>Currently, tmp files generated from the upload do not clear after use.</li>
</ul>
