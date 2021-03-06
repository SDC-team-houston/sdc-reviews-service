<br />
<p align="center">
  <h1 align="center">System Design Capstone</h1>

  <p align="center">
    Custom-built RESTful API to support server and database operations for a high-end fashion website that can scale to meet the demands of production traffic.
    <br />
    <h3 align="center">
     <strong>Author »</strong>
    <br />
    <br />
    <a href="https://github.com/ChrisRPeterson">Christian Peterson</a>
     </h3>
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about">About The Project</a>
      <ul>
        <li><a href="#stack">Built With</a></li>
      </ul>
    </li>
    <li><a href="#api-server">API Server</a></li>
    <li><a href="#optimization">Optimization</a></li>
    <li><a href="#deployment">Deployment</a></li>
    <li><a href="#stress-testing">Stress Testing</a></li>
    <li>
     <a href="#workflow">Workflow</a>
     <ul>
      <li><a href="#trello">Trello</a></li>
      <li><a href="#version-control">Version Control</a></li>
     </ul>
    </li>
    <li>
     <a href="#development">Development</a>
     <ul>
      <li><a href="#repo">Repo</a></li>
      <li><a href="#install">Install</a></li>
      <li><a href="#start-scripts">Start Scripts</a></li>
     </ul>
    </li>
  </ol>
</details>

# About
I was tasked with re-engineering the backend of the "Questions and Answers" service of a mock fashion website frontend. I designed:
  * RESTful API to handle requests to a database system of my own choosing
  * ETL (Extract, Transform, Load) process on a raw, flawed data set consisting of over twelve million records
  * Design and build an API server to provide data to the client in the format specified by the API documentation
  * Optimize database and query methods for speed and response
  * Deploy to the cloud using AWS
  * Stress test all API routes, checking for RPS (requests per second), latency, and error rate

The final product, when tested with <a href="https://loader.io">loader.io</a> with a maximum of 667 users per second, registered an average response time of 5 ms with a 0.0% error rate.


# Stack

<table>
  <tbody>
    <tr>
      <th>Programming Languages</th>
      <td>
        <img alt="JavaScript" src="https://img.shields.io/badge/javascript%20-%23323330.svg?&style=for-the-badge&logo=javascript&logoColor=%23F7DF1E" />
        <img alt="NodeJS" src="https://img.shields.io/badge/node.js-%2343853D.svg?&style=for-the-badge&logo=node.js&logoColor=white"/>
      </td>
    </tr>
    <tr>
      <th>Tools & Technologies</th>
      <td>
        <img alt="Express.js" src="https://img.shields.io/badge/express.js-%23404d59.svg?&style=for-the-badge"/>
        <img alt="MongoDB" src ="https://img.shields.io/badge/MongoDB-%234ea94b.svg?&style=for-the-badge&logo=mongodb&logoColor=white"/>
      </td>
    </tr>
    <tr>
      <th>Utilities</th>
      <td>
        <img alt="ESLint" src="https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white" />
        <img alt="Postman" src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=red" />
        <img alt="Git" src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white" />
      </td>
    </tr>
     <tr>
      <th>Workflow</th>
      <td>
        <img alt="Github" src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white"/>
        <img alt="Trello" src="https://img.shields.io/badge/Trello-%23026AA7.svg?&style=for-the-badge&logo=Trello&logoColor=white"/>
        <img alt="Slack" src="https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=slack&logoColor=white"/>
        <img alt="Discord" src="https://img.shields.io/badge/Discord-7289DA?style=for-the-badge&logo=discord&logoColor=white"/>
        <img alt="Zoom" src="https://img.shields.io/badge/Zoom-2D8CFF?style=for-the-badge&logo=zoom&logoColor=white"/>
      </td>
    </tr>
    <tr>
      <th>Deployment</th>
      <td>
        <img alt="AWS" src="https://img.shields.io/badge/AWS-%23FF9900.svg?&style=for-the-badge&logo=amazon-aws&logoColor=white"/>
        <img alt="Docker" src="https://img.shields.io/badge/docker-%230db7ed.svg?&style=for-the-badge&logo=docker&logoColor=white"/>
      </td>
    </tr>
  </tbody>
</table>


## API Server

### List Reviews

Returns a list of reviews for a particular product. This list does not include any reported reviews.

`GET /reviews/`

Query Parameters
<table>
<thead>
  <tr>
    <th>Parameter</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>page</td>
    <td>integer</td>
    <td>Selects the page of results to return. Default 1.</td>
  </tr>
  <tr>
    <td>count</td>
    <td>integer</td>
    <td>Specifies how many results per page to return. Default 5.</td>
  </tr>
  <tr>
    <td>sort</td>
    <td>text</td>
    <td>Changes the sort order of reviews to be based on "newest" or "helpful".</td>
  </tr>
  <tr>
    <td>product_id</td>
    <td>integer</td>
    <td>Specifies the product for which to retrieve reviews.</td>
  </tr>
</tbody>
</table>

  ![](./client/data/gifs/related.gif)


## Optimization

The documents of the database are all denormalized as is reasonable to require as few queries as possible (usually one) to send a response to the client. This increases response time and reduces the amount of computation required by the server. Denormalizing data did not increase space required by the database, as all of the denormalized fields are only relevant to the reviews they are nested within and are never duplicated. 

Indexes are added to key fields such as product_id and review_id to allow the smallest time complexity possible with mongoDB on every read query the server is required to execute. The trade off is a marginal increase to write times, the client is expecting to run read queries much more often than write queries so this is an easily worthwhile compromise. For a standard query of a random product_id we reduced response times from over 10000 ms to under 10 ms. A 1000x speed improvement.

 ![](client/data/gifs/questions.gif)


## Deployment

Deployment was done using docker and two AWS EC2 instances. 

 ![](./client/data/gifs/reviews.gif)

# Workflow
Our team used Agile workflow for this project.

## Trello
A Trello board was used to create and track tickets. We held daily standup meetings to discuss accomplishments, challenges, and upcoming tickets. We utilitized Discord, Slack, and Zoom in order to maintain effective remote collaboration and allow for quick communication when necessary.

## Version Control
We utilized Git Feature Branch workflow. All pull requests in Github were reviewed by another team member before being merged into the main branch.
