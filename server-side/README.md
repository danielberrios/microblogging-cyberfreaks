# Dependencies required to run or test project
<ul>
    <li>nodemon: Used to live reload application while in development.</li>
    <p>To install, run: npm install -g nodemon</p>
    <li>jest: Used to run test suites on application.</li>
    <p>To install, run: npm install -g jest</p>
</ul>

# Project Structure
<ul>
    <li>Main application is in app.js file.</li>
    <li>App routers are in routes directory.</li>
    <li>App models and controllers are in their respective directories.</li>
    <li>Test suites are stored in the __tests__ directory.</li>
</ul>

# Running app as Docker container
<span>From this directory run in terminal: (Assuming a Docker installation is present)</span>
<ul>
    <li>docker build -t "your DockerHub username"/db_project</li>
    <li>docker run -d --name db_server -p 5000:8083 "your DockerHub username"/db_project</li><br>
    <p>To run container in development mode:</p>
    <li>docker run -d --name db_server -p 5000:8083 -v $(pwd):/app "your DockerHub username"/db_project</li>
</ul>
<p>Project should now be running as Docker container.</p>
<p>Note: You may change the names db_project, db_server, and the port 5000 to your preference.</p>