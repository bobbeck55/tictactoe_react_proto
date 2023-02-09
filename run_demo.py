#
#
#  Run demo - cypress test of tictactoe react app
#  argv[1] - cypress o(pen) / r(un)
#  argv[2] - percy -> run with percy
#
#
import subprocess
import sys
import os

if len(sys.argv) != 2 and len(sys.argv) != 3:
    print("Unsupported number of arguments: ", len(sys.argv))
    sys.exit(-1)

subprocess.check_output("git checkout demo_v1", shell=True)

# spawn a new cmd prompt window with "npm start"
p = subprocess.Popen([r'start', r'cmd', '/k', r'npm', r'start'], shell=True)

subprocess.check_output("git checkout demo_cypress_v1", shell=True)

cypressCmd = r'cypress'
if sys.argv[1] == 'o':  
    cypressArg1 = r'open'
elif sys.argv[1] == 'r':
    cypressArg1 = r'run'
else:
    print("Invalid cypress option: ", sys.argv[1])
    sys.exit(-1)

if len(sys.argv) == 3 and sys.argv[2] == 'percy':
    cmd = r'node_modules\\.bin\\percy'
    arg1 = r'exec'
    arg2 = r'--'
    arg3 = cypressCmd
    arg4 = cypressArg1

subprocess.Popen([cmd, arg1, arg2, cypressCmd, cypressArg1], shell=True)











