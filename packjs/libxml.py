#!/usr/bin/python
#
#  Lib file for read and write xml of  packjs
#  Author : Darrel
#  msn   : xdarui@xdarui.com
#

from xml.dom import minidom
import toolbox
import re

class BuildXml:
	"""This a lib class for packjs 	"""
	def __init__(self,filename=None):
		if not filename :
			print "Error : filename is nessary"
		else:
			sock = toolbox.openAnything( filename )
			self.xml = minidom.parse( sock )
			sock.close()
			if not self.xml :
				print "Error : file is not exists"
				exit()
	def getProject(self):
		pj = self.getTag(self.xml,'project')
		if len(pj) == 0:
			print "Error : project is not defined in xml file !"
		else:
			self.projects = pj
			self.project = pj[0]
		        default = self.getTag(self.xml,'default')
			if not default :
				self.getTarget(pj[0])
				self.__p__ = 0
			else:
				self.target = default.attributes['target'].value      
				self.__p__ =  default.attributes['project'].value
		return pj
	def getTarget(self,pj):
		if not pj:
			print "Error : no project selected !"
		else:
			tg  = self.getTag(pj,'target')
			self.target = tg[0].attributes['name'].value
	def getTag(self,tag,name):
		if tag:
			return tag.getElementsByTagName(name) 
		else:
			return None
	def getDest(self):
		ct = self.getTag(self.project,'target')
		basedir = self.project.attributes['basedir'].value
		concat = self.getTag(ct[0],'concat')
		desc = concat[0].attributes['destfile'].value
		return desc.replace("${basedir}",basedir)
	def nextProject(self):
		if len(self.projects) < self.__p__ + 1:
			print "Error : Projects list out of bound"
		else:
			self.project = self.projects[self.__p__] 
