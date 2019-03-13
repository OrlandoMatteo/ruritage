from flask import Flask, render_template, request, redirect, Response, jsonify,send_file
import base64
import random, json
import mysql.connector
from mySQLaddons import *
from pymongo import MongoClient
import gridfs
import io


app = Flask(__name__)
with open('dbCredentials.json') as f:
	dbCredential = json.load(f)['dbCredential']
	client=MongoClient()
	griddb = client.gridfs_example
	fs = gridfs.GridFS(griddb)
	rm=client.ruritage.roleModels
	r=client.ruritage.replicators
	rmAreas=client.ruritage.rmAreas
	rmPath=client.ruritage.rmPath
	rmBuildings=client.ruritage.rmBuildings
	rmTowns=client.ruritage.rmTowns
	photos=client.ruritage.images

@app.route('/')
def index():
	return render_template('testindex.html')

@app.route('/test')
def test():
	return render_template('test.html')

@app.route('/bestpractices')
def bestpractices():
	return render_template('bestpractices.html')

# @app.route('/initialMap',methods=['GET','POST'])
# def initialMap():
# 	# read json + reply
# 	request_arg=request.args.get('Role').replace('"','')

# 	cnx = connectToDB(dbCredential)

# 	cursor = cnx.cursor()

# 	query="SELECT * FROM ruritage_schema.%s;"%request_arg

# 	cursor.execute(query)

# 	row_headers=[x[0] for x in cursor.description]
# 	rv=cursor.fetchall()
# 	geojson=queryToGeoJSON(row_headers,rv)
# 	#print geojson
# 	return json.dumps(geojson)

@app.route('/querySIA',methods=['GET','POST'])
def querySIA():
	Roles=request.args.get('Roles').replace('"','')[1:-1].split(',')
	SIAs=request.args.get('SIAs').replace('"',"'")[1:-1].split(',')
	Roles=[x.encode('UTF8') for x in Roles]
	SIAs=[x.encode('UTF8') for x in SIAs]


	# SIAsList=', '
	# SIAsList=SIAsList.join(SIAs)


	# cnx = connectToDB(dbCredential)
	# cursor = cnx.cursor()

	# #Different type of query if we want both RM and R
	# if len(Roles)==1 and Roles[0]=='RoleModel':
	# 	#query="SELECT * FROM ruritage_schema.%s WHERE SIA IN (%s);"%(Roles[0],SIAsList)
	# 	query_template="SELECT %(x)s.Name, %(x)s.Role, %(x)s.Description, %(x)s.X, %(x)s.Y, %(x)s.MainEconomicSector, %(x)s.Ageing,\
	# 	%(x)s.Immigrant, %(x)s.Depopulation, %(x)s.Unemployment, %(x)s.Poverty , SIA.SIA FROM %(x)s INNER JOIN SIA ON %(x)s.SIA = SIA.idSIA WHERE SIA.SIA IN (%(y)s)"
	# 	query=query_template%{"x":Roles[0],"y":SIAsList}

	# elif len(Roles)==1 and Roles[0]=='Replicator':
	# 	query_template="SELECT %(x)s.Name, %(x)s.Role, %(x)s.Description, %(x)s.X, %(x)s.Y, null,null,\
	# 	null,null, null, null ,SIA.SIA FROM %(x)s INNER JOIN SIA ON %(x)s.SIA = SIA.idSIA\
	# 	WHERE SIA.SIA IN (%(y)s)"
	# 	query=query_template%{"x":Roles[0],"y":SIAsList}

	# if len(Roles)==2:
	# 	query_template1="SELECT %(x)s.Name, %(x)s.Role, %(x)s.Description, %(x)s.X, %(x)s.Y,%(x)s.MainEconomicSector,%(x)s.Ageing,\
	# 	%(x)s.Immigrant, %(x)s.Depopulation, %(x)s.Unemployment, %(x)s.Poverty ,SIA.SIA FROM %(x)s INNER JOIN SIA ON %(x)s.SIA = SIA.idSIA\
	# 	WHERE SIA.SIA IN (%(y)s)"

	# 	query_template2="SELECT %(x)s.Name, %(x)s.Role, %(x)s.Description, %(x)s.X, %(x)s.Y, null,null,\
	# 	null,null, null, null ,SIA.SIA FROM %(x)s INNER JOIN SIA ON %(x)s.SIA = SIA.idSIA\
	# 	WHERE SIA.SIA IN (%(y)s)"

	# 	query=query_template1%{"x":Roles[0],"y":SIAsList}+' UNION '+query_template2%{"x":Roles[1],"y":SIAsList}
	# 	print query
	
	# #code to avoid error in case no RM/R or SIA are selected
	# if Roles[0]!='' and SIAsList:
	# 	cursor.execute(query)
	# 	row_headers=[x[0] for x in cursor.description]
	# 	rv=cursor.fetchall()
	# 	geojson=queryToGeoJSON(row_headers,rv)
	# 	#print json.dumps(geojson,indent=4)
	# else:
	# 	geojson={}
	# 	geojson['type']='FeatureCollection'
	# 	geojson['features']=[]

	geojson={}
	geojson['type']='FeatureCollection'
	geojson['features']=[]
	invalid={'_id'}
	SIAs=[x[1:-1] for x in SIAs]

	if 'RoleModel' in Roles:
		for place in rm.find({'properties.SIA':{'$in':SIAs}}):
			item={x: place[x] for x in place if x not in invalid}
			geojson['features'].append(item)
	if 'Replicator' in Roles:
		for place in r.find({'properties.SIA':{'$in':SIAs}}):
			item={x: place[x] for x in place if x not in invalid}
			geojson['features'].append(item)


	return json.dumps(geojson)

@app.route('/queryBP',methods=['GET','POST'])
def queryBP():

	SIAs=request.args.get('SIAs').replace('"',"'")[1:-1].split(',')
	CCs=request.args.get('CCs').replace('"',"'")[1:-1].split(',')
	SIAs=[x.encode('UTF8') for x in SIAs]
	CCs=[x.encode('UTF8') for x in CCs]

	SIAsList=', '
	SIAsList=SIAsList.join(SIAs)
	CCsList=', '
	CCsList=CCsList.join(CCs)

	cnx = connectToDB(dbCredential)
	cursor = cnx.cursor()


	query_template="SELECT BestPractice.idBestPractice, BestPractice.BPName,RoleModel.Name, SIA.SIA, CrossCutting.CCName\
	FROM BestPractice\
	LEFT JOIN BPtoCC ON BestPractice.idBestPractice = BPtoCC.idBP\
	LEFT JOIN CrossCutting ON BPtoCC.idCC = CrossCutting.idCrossCutting\
	LEFT JOIN SIA ON BestPractice.idSIA = SIA.idSIA\
	LEFT JOIN RoleModel ON BestPractice.idRM = RoleModel.idRoleModel\
	where CrossCutting.idString in (%(x)s)\
	AND SIA.SIA IN (%(y)s) ;"
	query=query_template%{"x":CCsList,"y":SIAsList}

	cursor.execute(query)
	row_headers=[x[0] for x in cursor.description]
	rv=cursor.fetchall()
	BPJSON=queryToBPJSON(row_headers,rv)
	return json.dumps(BPJSON)

@app.route('/RMAreas',methods=['GET','POST'])
def RMAreas():
	#OLD FOR MYSQL
	# cnx = connectToDB(dbCredential)
	# cursor = cnx.cursor()
	# query="SELECT jsonpath from RMAreas"
	# cursor.execute(query)
	# row_headers=[x[0] for x in cursor.description]
	# rv=cursor.fetchall()


	# json_data=[]
	# for result in rv:
	# 	json_data.append(dict(zip(row_headers,result)))


	# output={}
	# output['data']=[]
	# for file in json_data:
	# 	with open(file['jsonpath'].encode('UTF8').replace("'",'')) as f:
	# 		geojson=json.load(f)
	# 		output['data'].append(geojson)



	#OLD FOR MONGO
	# json_data=None
	# for x in rmAreas.find({},no_cursor_timeout=True):
	# 	json_data=x['areasList']

	# print json_data
	# output={}
	# output['data']=[]
	# for j in json_data:
	# 	document=j['filename']
	# 	print document
	# 	for grid_out in fs.find({'filename':document},no_cursor_timeout=True):
	# 		output['data'].append(json.loads(grid_out.read()))

	output={}
	output['data']=[]
	document='LocalArea.json'
	for grid_out in fs.find({'filename':document},no_cursor_timeout=True):
		output['data'].append(json.loads(grid_out.read()))

	#output={}
	#output['data']=[]
	#document='LocalArea.json'
	#for grid_out in fs.find({},no_cursor_timeout=True):
	#	output['data'].append(json.loads(grid_out.read()))	

	return json.dumps(output)

@app.route('/RMPath',methods=['GET','POST'])
def RMPath():
	# cnx = connectToDB(dbCredential)
	# cursor = cnx.cursor()
	# query="SELECT jsonpath from RMPath"
	# cursor.execute(query)
	# row_headers=[x[0] for x in cursor.description]
	# rv=cursor.fetchall()
	# json_data=[]
	# for result in rv:
	# 	json_data.append(dict(zip(row_headers,result)))

	# output={}
	# output['data']=[]
	# for j in json_data:
	# 	document=j['jsonpath'].encode('UTF8').replace("'",'')
	# 	for grid_out in fs.find({'filename':document},no_cursor_timeout=True):
	# 		output['data'].append(json.loads(grid_out.read()))

	# output={}
	# output['data']=[]
	# for file in json_data:
	# 	with open(file['jsonpath'].encode('UTF8').replace("'",'')) as f:
	# 		geojson=json.load(f)
	# 		output['data'].append(geojson)

	json_data=None
	for x in rmPath.find({},no_cursor_timeout=True):
		json_data=x['pathsList']


	output={}
	output['data']=[]
	for j in json_data:
		document=j['filename']
		print document
		for grid_out in fs.find({'filename':document},no_cursor_timeout=True):
			output['data'].append(json.loads(grid_out.read()))

	return json.dumps(output)


@app.route('/buildings',methods=['GET','POST'])
def buildings():
	bounds=ast.literal_eval(request.args.get('bounds').encode('UTF8'))
	rectangle={
			"type": "Polygon",
			"coordinates": [
				[
	                [
	                    bounds['_southWest']['lng'],bounds['_northEast']['lat']
	                ],
	                [
	                    bounds['_northEast']['lng'],bounds['_northEast']['lat']
	                ],
	                [
	                    bounds['_northEast']['lng'],bounds['_southWest']['lat']
	                ],
	                [
	                    bounds['_southWest']['lng'],bounds['_southWest']['lat']
	                ],
	                [
	                    bounds['_southWest']['lng'],bounds['_northEast']['lat']
	                ]
	            ]
	        ]
	    }
	print rmBuildings.find({'coordinates':{ '$geoWithin': { '$geometry': rectangle } } },no_cursor_timeout=True).count()
	


	invalid={'_id'}
	output={ "type": "FeatureCollection", "features": []}

	for point in rmBuildings.find({'coordinates':{ '$geoWithin': { '$geometry': rectangle } } },no_cursor_timeout=True):
		building={x: point[x] for x in point if x not in invalid}
		output['features'].append(building)


	return json.dumps(output)

@app.route('/towns',methods=['GET','POST'])
def towns():
	bounds=ast.literal_eval(request.args.get('bounds').encode('UTF8'))
	rectangle={
			"type": "Polygon",
			"coordinates": [
				[
	                [
	                    bounds['_southWest']['lng'],bounds['_northEast']['lat']
	                ],
	                [
	                    bounds['_northEast']['lng'],bounds['_northEast']['lat']
	                ],
	                [
	                    bounds['_northEast']['lng'],bounds['_southWest']['lat']
	                ],
	                [
	                    bounds['_southWest']['lng'],bounds['_southWest']['lat']
	                ],
	                [
	                    bounds['_southWest']['lng'],bounds['_northEast']['lat']
	                ]
	            ]
	        ]
	    }
	#print rmTowns.find({'coordinates':{ '$geoWithin': { '$geometry': rectangle } } },no_cursor_timeout=True).count()
	


	invalid={'_id'}
	output={ "type": "FeatureCollection", "features": []}

	for point in rmTowns.find({'coordinates':{ '$geoWithin': { '$geometry': rectangle } } },no_cursor_timeout=True):
		town={x: point[x] for x in point if x not in invalid}
		output['features'].append(town)


	return json.dumps(output)

@app.route('/images',methods=['GET','POST'])
def images():
	bounds=ast.literal_eval(request.args.get('bounds').encode('UTF8'))
	rectangle={
			"type": "Polygon",
			"coordinates": [
				[
	                [
	                    bounds['_southWest']['lng'],bounds['_northEast']['lat']
	                ],
	                [
	                    bounds['_northEast']['lng'],bounds['_northEast']['lat']
	                ],
	                [
	                    bounds['_northEast']['lng'],bounds['_southWest']['lat']
	                ],
	                [
	                    bounds['_southWest']['lng'],bounds['_southWest']['lat']
	                ],
	                [
	                    bounds['_southWest']['lng'],bounds['_northEast']['lat']
	                ]
	            ]
	        ]
	    }
	#print images.find({'coordinates':{ '$geoWithin': { '$geometry': rectangle } } },no_cursor_timeout=True).count()
	


	invalid={'_id'}
	output={'images':[]}
	print 'pippo'
	for point in photos.find({'geometry.coordinates':{ '$geoWithin': { '$geometry': rectangle } } },no_cursor_timeout=True):
		for grid_out in fs.find({'filename':point['filename']},no_cursor_timeout=True):
			image_binary= grid_out.read()
			output['images'].append(base64.b64encode(image_binary))


	return json.dumps(output)


@app.route('/palestina',methods=['GET','POST'])
def palestina():
	with open('static/db/PalestinaBuilding.json') as f:
		geojson=json.load(f)
	return json.dumps(geojson)

if __name__ == '__main__':
    
    app.run(host='0.0.0.0')
    #app.run(host='127.0.0.2')