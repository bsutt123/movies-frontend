# Sr Full-stack Engineer Take Home Test


## Description

The test is to implement both a front-end application and a back-end service for
a simple movie title search using IMDB's data. It should not take more than a
few hours so a simple approach is recommended.

You'll find a skeleton single page application in index.html which you are to
complete.


### Functional Requirements

As text is entered into the form, requests should be made to your service to
fetch movies whose title matches all or part of the text entered. Results
should be used to populate the list below the form. Responsiveness and request
throttling should be considered. You're welcome to implement any additional
features provided these requirements are met.

### Frontend

Edit moviesearch.js to complete the front-end application. No libraries should
be used here. There's no need to set up a build. You can use any JS syntax
supported by recent versions of Chrome so no transpiling is necessary.

### Back-end
Please download and use [IMDb's title.basics.tsv.gz](https://datasets.imdbws.com/title.basics.tsv.gz)
file as the data source for your solution. A subset of the data is included
in the file `title.basics.first1000.tsv`. The title string to search by is the
field `originalTitle`.

The back-end should be written in NodeJS or Ruby. Which library or framework to use here,
if any, is your choice. What approach you use to implement the search is your
choice also, for example whether to work with the text file directly or
pre-load into an index of some sort.
