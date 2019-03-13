function add_video() {
    // body...
    var marker_video = L.marker(
            [45, -75.621562],
            {
                icon: new L.Icon.Default()
                }
            ).addTo(main_map);
        
    

     var icon_fd6df06ccdfb4bb89fd3b07b01e1a6a0 = L.AwesomeMarkers.icon({
                    icon: 'video',
                    iconColor: 'white',
                    markerColor: 'red',
                    prefix: 'fa',
                    extraClasses: 'fa-rotate-0'
                    });
    marker_video.setIcon(icon_fd6df06ccdfb4bb89fd3b07b01e1a6a0);
            
    
    var popup_a931dc205b904e72baa4c8dc9eb3dbe9 = L.popup({maxWidth: '300'
            
            });
    popup_a931dc205b904e72baa4c8dc9eb3dbe9.setContent('<video width="300" src="https://magmageopark.no/wp-content/uploads/2018/05/Magma-Webside-test2.mp4" type="video/mp4" controls></video>')    
    //popup_a931dc205b904e72baa4c8dc9eb3dbe9.setContent('<p>Hello world!<br />This is a nice popup.</p>');
    marker_video.bindPopup(popup_a931dc205b904e72baa4c8dc9eb3dbe9);
}

function add3d() {
    // body...
    var marker_3d = L.marker(
            [45, -75.621562],
            {
                icon: new L.Icon.Default()
                }
            ).addTo(main_map);
        
    

     var icon_3d = L.AwesomeMarkers.icon({
                    icon: 'video',
                    iconColor: 'white',
                    markerColor: 'red',
                    prefix: 'fa',
                    extraClasses: 'fa-rotate-0'
                    });
    marker_3d.setIcon(icon_3d);
            
    
    var popup_3d = L.popup({maxWidth: '300'
            
            });
    popup_3d.setContent('<iframe src="http://localhost:8080/test3D"></iframe>')    
    //popup_a931dc205b904e72baa4c8dc9eb3dbe9.setContent('<p>Hello world!<br />This is a nice popup.</p>');
    marker_3d.bindPopup(popup_3d);
}

function createPopup(feature_properties) {
    /*
    table='<p>'+feature_properties.Description+'</p><br>\
    <table class="table" style="width:100%" >\
        <tr><th>Main Economic Sector</th><td>'+feature_properties.MainEconomicSector+'</td></tr>\
        <tr><th>Ageing</th><td id="1">'+feature_properties.Ageing+'</td></tr>\
        <tr><th>Immigrant</th><td id="2">'+feature_properties.Immigrant+'</td></tr>\
        <tr><th>Depopulation</th><td id="3">'+feature_properties.Depopulation+'</td></tr>\
        <tr><th>Unemployment</th><td id="4">'+feature_properties.Unemployment+'</td></tr>\
        <tr><th>Poverty</th><td id="5">'+feature_properties.Poverty+'</td></tr>\
    </table>'

    */

    var table='<h4 id="title">'+feature_properties.Name+'</h4> <br><font size="2"><div id="extra"><font size="2"><br><b>Description</b><p>'+feature_properties.Description+'</p>';
    if (feature_properties.Role=='RM') {
        table+='<br><b>Main Economic Sector</b><br>'+feature_properties.MainEconomicSector+'<br>'
        table+='<br><b>Challenges</b><br><table class="table" style="width:100%" >';

        toavoid=['Description','Role','Name','SIA','MainEconomicSector'];
        for (item in feature_properties) {
            if (toavoid.indexOf(item)==-1) {
                if (feature_properties[item]) {
                    row='<tr><th>'+ item.toString()+'</th>'
                    if (feature_properties[item].startsWith("YES")) {
                        row+='<td style="background-color:yellow">'+feature_properties[item]+'</td></tr>';
                    }
                    else{
                        row+='<td>'+feature_properties[item]+'</td></tr>';
                    }
                }
                table+=row;
            }
        }
        table+='</table></font></div>';
    }
    return table

}

function onEachEntity(feature, layer) {

        layer.bindTooltip(feature.properties.Name);
        content=createPopup(feature.properties);
        layer.bindPopup(content,{maxHeight:200,maxWidth:400});
        layer.on('click', function(e){
            main_map.setView(e.latlng, 9);
            $('#lateral').html('<font size="2"><u onClick="hideDescription()" style="cursor: pointer;">Minimize/Expand</u>&ensp;<u style="cursor: pointer;" onClick="closeLateral()">Close</u></font>'+layer.getPopup().getContent())

        });

}
function RMStyle(feature,latlng){
    switch (feature.properties["SIA"]){
        case "SustainableFoodProduction":
            var SIA2Icon = L.AwesomeMarkers.icon({
                    icon: 'trophy',
                    iconColor: 'lightgreen',
                    markerColor: 'white',
                    prefix: 'fa',
                    extraClasses: 'fa-rotate-0'
                    });
        return L.marker(latlng, {icon: SIA2Icon, riseOnHover: true});
        case "Pilgrimage":
            var SIA1Icon = L.AwesomeMarkers.icon({
                    icon: 'trophy',
                    iconColor: '#633d03',
                    markerColor: 'white',
                    prefix: 'fa',
                    extraClasses: 'fa-rotate-0'
                    });
        return L.marker(latlng, {icon: SIA1Icon, riseOnHover: true});
        case "Migration":
            var SIA3Icon = L.AwesomeMarkers.icon({
                    icon: 'trophy',
                    iconColor: '#a8a8a8',
                    markerColor: 'white',
                    prefix: 'fa',
                    extraClasses: 'fa-rotate-0'
                    });
        return L.marker(latlng, {icon: SIA3Icon, riseOnHover: true});
        case "ArtAndFestival":
            var SIA4Icon = L.AwesomeMarkers.icon({
                    icon: 'trophy',
                    iconColor: 'yellow',
                    markerColor: 'white',
                    prefix: 'fa',
                    extraClasses: 'fa-rotate-0'
                    });
        return L.marker(latlng, {icon: SIA4Icon, riseOnHover: true});
        case "Resilience":
            var SIA5Icon = L.AwesomeMarkers.icon({
                    icon: 'trophy',
                    iconColor: '#c68c53',
                    markerColor: 'white',
                    prefix: 'fa',
                    extraClasses: 'fa-rotate-0'
                    });
        return L.marker(latlng, {icon: SIA5Icon, riseOnHover: true});
        case "IntegratedLandscapeManagement":
            var SIA6Icon = L.AwesomeMarkers.icon({
                    icon: 'trophy',
                    iconColor: 'green',
                    markerColor: 'white',
                    prefix: 'fa',
                    extraClasses: 'fa-rotate-0'
                    });
        return L.marker(latlng, {icon: SIA6Icon, riseOnHover: true});               
    }
}
function RMStyle2(feature,latlng){
    switch (feature.properties["SIA"]){
        case "SustainableFoodProduction":
            var SIA2Icon=L.icon({
                iconUrl: 'static/img/LocalFoodIcon.png',
                iconSize:     [40,24], // size of the icon
            });
        return L.marker(latlng, {icon: SIA2Icon, riseOnHover: true});
        case "Pilgrimage":
            var SIA1Icon = L.icon({
                iconUrl: 'static/img/PilgrimageIcon.png',
                iconSize:     [40,24], // size of the icon
            });
        return L.marker(latlng, {icon: SIA1Icon, riseOnHover: true});
        case "Migration":
            var SIA3Icon = L.icon({
                iconUrl: 'static/img/MigrationIcon.png',
                iconSize:     [40,24], // size of the icon
            });
        return L.marker(latlng, {icon: SIA3Icon, riseOnHover: true});
        case "ArtAndFestival":
            var SIA4Icon = L.icon({
                iconUrl: 'static/img/ArtAndFestIcon.png',
                iconSize:     [40,24], // size of the icon
            });
        return L.marker(latlng, {icon: SIA4Icon, riseOnHover: true});
        case "Resilience":
            var SIA5Icon = L.icon({
                iconUrl: 'static/img/ResilienceIcon.png',
                iconSize:     [40,24], // size of the icon
            });
        return L.marker(latlng, {icon: SIA5Icon, riseOnHover: true});
        case "IntegratedLandscapeManagement":
            var SIA6Icon = L.icon({
                iconUrl: 'static/img/LandscapeIcon.png',
                iconSize:     [40,24], // size of the icon
            });
        return L.marker(latlng, {icon: SIA6Icon, riseOnHover: true});               
    }
}
function ReplicatorStyle(feature,latlng){
    switch (feature.properties["SIA"]){
        case "SustainableFoodProduction":
            var SIA2Icon = L.AwesomeMarkers.icon({
                    icon: 'user',
                    iconColor: 'lightgreen',
                    markerColor: 'white',
                    prefix: 'fa',
                    extraClasses: 'fa-rotate-0'
                    });
        return L.marker(latlng, {icon: SIA2Icon, riseOnHover: true});
        case "Pilgrimage":
            var SIA1Icon = L.AwesomeMarkers.icon({
                    icon: 'user',
                    iconColor: '#633d03',
                    markerColor: 'white',
                    prefix: 'fa',
                    extraClasses: 'fa-rotate-0'
                    });
        return L.marker(latlng, {icon: SIA1Icon, riseOnHover: true});
        case "Migration":
            var SIA3Icon = L.AwesomeMarkers.icon({
                    icon: 'user',
                    iconColor: '#a8a8a8',
                    markerColor: 'white',
                    prefix: 'fa',
                    extraClasses: 'fa-rotate-0'
                    });
        return L.marker(latlng, {icon: SIA3Icon, riseOnHover: true});
        case "ArtAndFestival":
            var SIA4Icon = L.AwesomeMarkers.icon({
                    icon: 'user',
                    iconColor: 'yellow',
                    markerColor: 'white',
                    prefix: 'fa',
                    extraClasses: 'fa-rotate-0'
                    });
        return L.marker(latlng, {icon: SIA4Icon, riseOnHover: true});
        case "Resilience":
            var SIA5Icon = L.AwesomeMarkers.icon({
                    icon: 'user',
                    iconColor: 'orange',
                    markerColor: 'white',
                    prefix: 'fa',
                    extraClasses: 'fa-rotate-0'
                    });
        return L.marker(latlng, {icon: SIA5Icon, riseOnHover: true});
        case "IntegratedLandscapeManagement":
            var SIA6Icon = L.AwesomeMarkers.icon({
                    icon: 'user',
                    iconColor: 'green',
                    markerColor: 'white',
                    prefix: 'fa',
                    extraClasses: 'fa-rotate-0'
                    });
        return L.marker(latlng, {icon: SIA6Icon, riseOnHover: true});               
    }
}
function updateMap() {
    var roles=[]
    var sias=[]
    
    checkboxesRole=document.getElementById('roles');
    for (i=0;i<checkboxesRole.children.length;i++){
        if (checkboxesRole.children[i].type=="checkbox")
        {
            if (checkboxesRole.children[i].checked)
            {
                roles.push(checkboxesRole.children[i].value)}
            }
        }

    checkboxesSIA=document.getElementById('sias');
    for (i=0;i<checkboxesSIA.children.length;i++){
        if (checkboxesSIA.children[i].type=="checkbox")
        {
            if (checkboxesSIA.children[i].checked)
            {
                sias.push(checkboxesSIA.children[i].value)}
            }
        }
    var queryResult=$.ajax({
        method: 'GET',      
        url: "/querySIA",
        data: {Roles:JSON.stringify(roles), SIAs:JSON.stringify(sias)},
        dataType: 'json',

        success: function(response) {
            x=response;
            console.log(x);
            if (roles.length==0) {
                populateMap(x,roles);
            }
            else
            {
                for (var i = 0; i < roles.length; i++) {
                    
                    populateMap(x,roles);
                  }
            } 
            //populateMap(x,roles);
            //console.log(x);
            
    }});
    
}
function initialMap(rm_r) {
    var queryResult=$.ajax({
        method: 'GET',      
        url: "/initialMap",
        data: {Role:JSON.stringify(rm_r)},
        dataType: 'json',

        success: function(response) {
            x=response;
            populateMap(x,rm_r);
            
    }});
    console.log('DONE')
}
function populateMap(result,roles) {

    main_map.eachLayer(function (layer){
    if (layer.feature) {
        if(layer.feature.properties.Role=='RM' || layer.feature.properties.Role=='R' ){
            main_map.removeLayer(layer);
        }
    }
    });

    roleModelsJson={"type": "FeatureCollection","features": []};
    for (var i = 0; i < result.features.length; i++) {
        if (result.features[i].properties.Role=="RM")
        {   
            roleModelsJson.features.push(result.features[i]);
        }
    }
    var geo_json_RoleModels = L.geoJson(roleModelsJson,{pointToLayer: RMStyle2, onEachFeature:onEachEntity}).addTo(main_map);
    geo_json_RoleModels.setStyle(function(feature) {return feature.properties.style;}); 

    replicatorJson={"type": "FeatureCollection","features": []};
    for (var i = 0; i < result.features.length; i++) {
        if (result.features[i].properties.Role=='R')
        {
            replicatorJson.features.push(result.features[i]);
        }
    }
    var geo_json_Replicators = L.geoJson(replicatorJson,{pointToLayer: ReplicatorStyle, onEachFeature:onEachEntity}).addTo(main_map);
    geo_json_Replicators.setStyle(function(feature) {return feature.properties.style;}); 
   
}
function selectall() {
    checkboxes=document.getElementById('sias');
    for (i=0;i<checkboxes.children.length;i++){
        if (checkboxes.children[i].type=="checkbox")
        {
            checkboxes.children[i].checked=true;
        }
    }
    updateMap();
}

function onEachArea(feature,layer) {
    id=feature.properties.ID
    main_map.eachLayer(function (livello){
        if (livello.feature) {
            if(livello.feature.properties.Role){
                if (livello.feature.properties.ID==id){
                    layer.bindPopup(livello.getPopup().getContent(),{maxHeight:200,maxWidth:400});
                }
            }
        }
        });
    layer.on('click', function(e){
            main_map.setView(e.latlng, 9);
            $('#lateral').html('<font size="2"><u onClick="hideDescription()" style="cursor: pointer;">Minimize/Expand</u>&ensp;<u style="cursor: pointer;" onClick="closeLateral()">Close</u></font>'+layer.getPopup().getContent())
        });
    //layer.bindTooltip(text,{sticky:true});
    
}

function drawArea(data) {
    for (var i = 0; i < data.data.length; i++) {
        x=data.data[i];
        var RMAreas=L.geoJson(x,{ onEachFeature:onEachArea}).addTo(main_map);
        //RMAreas.setStyle(function(feature) {return {color:'#472502'}});
        RMAreas.setStyle(function(feature) {
            switch (feature.properties["SIA"])
            {

                case "Sustainable food production":
                return {color:'#29e12c'};

                case "Pilgrimage":
                return {color:'#633d03'};

                case "Migration":
                return{color:'#a8a8a8'};

                case "Art and festival":
                return {color:'#f0b629'};

                case "Resilience":
                return {color:'#f07929'};

                case "Landscape":
                return {color:'#0d5c1e'};               
        }});
        Areas.addLayer(RMAreas);
    }
}

function addRMArea() {
    var queryResult=$.ajax({
        method: 'GET',      
        url: "/RMAreas",
        dataType: 'json',

        success: function(response) {
            x=response;
            drawArea(x);
            
    }})
}

function onEachPath(feature,layer) {
    layer.bindTooltip(feature.properties.name,{sticky:true});
}

function drawPaths(data) {
    for (var i = 0; i < data.data.length; i++) {
        x=data.data[i];
        var RMPaths=L.geoJson(x,{ onEachFeature:onEachPath,pane:'Paths'}).addTo(main_map);
        RMPaths.setStyle(function(feature) {return {color:'#472502',dashArray:'5 5'}});
        Paths.addLayer(RMPaths);

    }
}

function addRMPath() {
    var queryResult=$.ajax({
        method: 'GET',      
        url: "/RMPath",
        dataType: 'json',

        success: function(response) {
            x=response;
            drawPaths(x);
            
    }})
}



function onEachBuilding(feature, layer) {  
    if(feature.properties.Tipo){
        if (feature.properties.Tipo=='Localidad') {
            layer.bindTooltip(feature.properties.Localidad);
        }
        else{
            layer.bindTooltip(feature.properties.Recurso);
        }
    }
    else{
        layer.bindTooltip(feature.properties.name)
    }
    
    layer.bindPopup(feature.properties.description,{autoPan:false, closePopupOnClick:false});
    layer.on('click', function(e){
        //main_map.setView(e.latlng);
        $('#lateral').html(layer.getPopup().getContent())

    });

}

function BuildingStyle(feature,latlng){
    switch(feature.type){
        case "Point":
            if(feature.properties.Tipo=='Localidad')
            {
                var TownIcon = L.AwesomeMarkers.icon({
                            icon: 'city',
                            iconColor: 'black',
                            markerColor: 'white',
                            prefix: 'fa',
                            extraClasses: 'fa-rotate-0'
                            });

                //return L.marker(latlng, {icon: TownIcon, riseOnHover: true});
                var marker=L.marker(latlng, {icon: TownIcon, riseOnHover: true});
            }
            if(feature.properties.Tipo=='Albergue')
            {
                var BuildingIcon = L.AwesomeMarkers.icon({
                            icon: 'landmark',
                            iconColor: 'black',
                            markerColor: 'white',
                            prefix: 'fa',
                            extraClasses: 'fa-rotate-0'
                            });
                //return L.marker(latlng, {icon: BuildingIcon, riseOnHover: true});
                 var marker= L.marker(latlng, {icon: BuildingIcon, riseOnHover: true});
             }
             if(feature.properties.Tipo=='Inmueble')
            {
                var BuildingIcon = L.AwesomeMarkers.icon({
                            icon: 'landmark',
                            iconColor: 'black',
                            markerColor: 'white',
                            prefix: 'fa',
                            extraClasses: 'fa-rotate-0'
                            });
                //return L.marker(latlng, {icon: BuildingIcon, riseOnHover: true});
                var marker =L.marker(latlng, {icon: BuildingIcon, riseOnHover: true});
            }
            return marker;

        case "Polygon":
            console.log('pippo');
            polygon=L.polygon(latlng);
            polygon.setStyle({fillColor: '#ff0000'});
            return polygon;

    }
}



function placeBuildings(data){
    for (var i = 0; i < data.features.length; i++) {
        x=data.features[i];
        //var geoJsonBuildings=L.geoJson(x,{onEachFeature:onEachBuilding}).addTo(main_map);
        var geoJsonBuildings=L.geoJson(x,{pointToLayer: BuildingStyle, onEachFeature:onEachBuilding,pane:'Buildings'}).addTo(main_map);
        //geoJsonBuildings.setStyle(function(feature) {if(feature.geometry.type!='Point'){return {color: "#472502"}}});
        Buildings.addLayer(geoJsonBuildings); 
    }
}

function addBuildings() {
    bounds=main_map.getBounds();
    var queryResult=$.ajax({
        method: 'GET',      
        url: "/buildings",
        data: {bounds:JSON.stringify(bounds)},
        dataType: 'json',

        success: function(response) {
            x=response;
            placeBuildings(x);
            
    }});
    
}

function TownStyle(feature,latlng) {
    /*var TownIcon = L.AwesomeMarkers.icon({
                            icon: 'city',
                            iconColor: 'black',
                            markerColor: 'white',
                            prefix: 'fa',
                            extraClasses: 'fa-rotate-0'
                            });*/
    var TownIcon = L.icon({
                iconUrl: 'static/img/town2.png',
                iconSize:     [42,42], // size of the icon
            });

                //return L.marker(latlng, {icon: TownIcon, riseOnHover: true});
    var marker=L.marker(latlng, {icon: TownIcon, riseOnHover: true});
    return marker
}

function onEachTown(feature, layer) {  
    layer.bindTooltip(feature.properties.TOWN_NAME)
    
    layer.bindPopup(feature.properties.DESCRIPTION,{autoPan:false, closePopupOnClick:false});
    layer.on('click', function(e){
        //main_map.setView(e.latlng);
        $('#lateral').html(layer.getPopup().getContent())

    });

}

function placeTowns(data){
    for (var i = 0; i < data.features.length; i++) {
        x=data.features[i];
        //var geoJsonBuildings=L.geoJson(x,{onEachFeature:onEachBuilding}).addTo(main_map);
        var geoJsonTowns=L.geoJson(x,{pointToLayer:TownStyle, onEachFeature:onEachTown,pane:'Towns'}).addTo(main_map);
        //geoJsonBuildings.setStyle(function(feature) {if(feature.geometry.type!='Point'){return {color: "#472502"}}});
        Towns.addLayer(geoJsonTowns); 
    }
}

function addTowns() {
    bounds=main_map.getBounds();
    var queryResult=$.ajax({
        method: 'GET',      
        url: "/towns",
        data: {bounds:JSON.stringify(bounds)},
        dataType: 'json',

        success: function(response) {
            x=response;
            placeTowns(x);
            
    }});
    
}

function hideOnZoom(areas,buildings){
    if (main_map.getZoom() <6){
        zoomflag=0;
        main_map.eachLayer(function (layer){
        if (layer.feature) {
            if(!layer.feature.properties.Role){
                main_map.removeLayer(layer);
            }
        }
        });
    }

    if (main_map.getZoom() >6 && main_map.getZoom()<12 ){
        if (areaLayer==false) {
            addRMPath();    
            addRMArea();
            areaLayer=true;
        }  
        }
    else{
        main_map.eachLayer(function (layer){
        if (layer.feature && !layer.feature.properties.Role) {
            if(layer.options.pane=='Paths' || layer.options.pane=='overlayPane'){
                main_map.removeLayer(layer);
                areaLayer=false;
            }
        }
        });
    }

    if (main_map.getZoom()>=10 ){
        if (townLayer==false) {
            addTowns();
            townLayer=true;
            $('#townButton').toggle();

        }
    }
    else{
        $('#townButton')[0].style.display='none'      
        main_map.eachLayer(function (layer){
            if (layer.feature && !layer.feature.properties.Role) {
                if(layer.options.pane=='markerPane'){
                    main_map.removeLayer(layer);
                    townLayer=false;    
                }
            }   
        });  
    }
}

function hideOnMove() {
    if (main_map.getZoom()>=10 ){
    main_map.eachLayer(function (layer){
    if (layer.feature) {
        if(!layer.feature.properties.Role){
            if(layer.options.pane=='markerPane'){
            main_map.removeLayer(layer);
        }
        }
    }
    });
    // Uncomment addBuildings() if you want to show an example of buildings
    //addBuildings();
    addTowns();
}
}


// Code just for the meeting of 15/02, used to demonstrate how images are shown in the platform
function PalestinaStyle(feature,latlng){
    var BuildingIcon = L.AwesomeMarkers.icon({
                            icon: 'landmark',
                            iconColor: 'black',
                            markerColor: 'white',
                            prefix: 'fa',
                            extraClasses: 'fa-rotate-0'
                            });
    var marker= L.marker(latlng, {icon: BuildingIcon, riseOnHover: true});
    return marker
}

function onEachPalestina(feature, layer){
    layer.bindTooltip(feature.properties.name);
    popup=L.popup({maxWidth: '300'});
    popup.setContent('<img class="resize" src=static/img/'+feature.properties.Photo+'>')
    layer.bindPopup(popup)

}


function addPalestina(){
    var queryResult=$.ajax({
        method: 'GET',      
        url: "/palestina",
        dataType: 'json',

        success: function(response) {
            x=response;
            var palestinaJson=L.geoJson(x,{pointToLayer:PalestinaStyle, onEachFeature:onEachPalestina}).addTo(main_map)
            
    }});
    
}

/// end of code for the meeting

function showTowns() {
    if (townLayer==true) {
        townLayer=false;
        main_map.eachLayer(function (layer){
            if (layer.feature && !layer.feature.properties.Role) {
                if(layer.options.pane=='markerPane'){
                    if (layer.feature.geometry.properties.TOWN_NAME) {
                    main_map.removeLayer(layer);
                    }
                }
            }
            });
    }
    else{
        addTowns();
        townLayer=true;
    }

}


function showActors() {
    $('#roles').toggle();
}
function showSIAs() {
    $('#sias').toggle();
}
function hideDescription() {
    $('#lateral').find('#extra').toggle();
}

function closeLateral() {
    $('#lateral').html('');
}
