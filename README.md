
REACT prototype of a tictactoe game
with/without CYPRESS automated testing
======================================

2 windows - run REACT app in window 1 and
run cypress tests in window 2

Window 1) react app
cd tictactoe_react_proto
git checkout master
npm start

Window 2) REACT app with CYPRESS automated testing

cd tictactoe_react_proto
git checkout cypress

a. interactive testing

cypress open

b. batch testing

cypress run

c. REACT app with PERCY snapshots of CYPRESS automated
testing

percy exec -- cypress run (percy does not work with 'cypress open')

set PERCY_TOKEN=<token from percy.io>
set PERCY_BRANCH=master (not same as git branch 'master') | local

