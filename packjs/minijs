#!/usr/bin/python
#
# This a js compressor
# You can use it as a single command or import into your project as a library
#
#
#
#
#
from sys import argv
import os
import re


YUI = "/lib/yuicompressor-2.4.2.jar"
LIB =  os.path.dirname(__file__) + YUI

if len(argv) < 2 :
	print "input file is need !"
	exit()
else:
	infile = argv[1]

if len(argv) < 3 :
	outfile,number = re.subn('.[Jj][Ss]$','.min.js',infile)
else:
	outfile = argv[2]

cmdline = ("java -jar %s --type js --charset utf-8 -o %s %s") % ( LIB ,outfile,infile )

os.system(cmdline)

print "Success ! The desinate file this " + outfile

