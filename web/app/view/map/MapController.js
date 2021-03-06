/*
 * Copyright 2015 Anton Tananaev (anton.tananaev@gmail.com)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

Ext.define('Traccar.view.map.MapController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.map',
    
    config: {
        listen: {
            controller: {
                '*': {
                    reportShow: 'reportShow',
                    reportClear: 'reportClear'
                }
            }
        }
    },

    getLineStyle: function(color) {
        return new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: color,
                width: 2
            })
        });
    },

    getMarkerStyle: function(color) {
        return new ol.style.Style({
            text: new ol.style.Text({
                text: '\uf041',
                font: 'normal 32px FontAwesome',
                textBaseline: 'Bottom',
                fill: new ol.style.Fill({
                    color: color
                }),
                stroke: new ol.style.Stroke({
                    color: 'black',
                    width: 2
                })
            })
        });
    },
    
    reportShow: function() {
        var vectorSource = this.getView().vectorSource;

        var data = Ext.getStore('Positions').getData().splice();
        data.sort(function(l, r) {
            if (l < r) return -1;
            if (r < l) return 1;
            return 0;
        });

        var positions = [];

        //for (let p of data)

        this.iconFeature = new ol.Feature({
            //geometry: new ol.geom.Point(ol.proj.fromLonLat([-1.257778, 51.751944]))
            geometry: new ol.geom.LineString([
                ol.proj.fromLonLat([-1.257778, 52.751944]),
                ol.proj.fromLonLat([-3.257778, 51.751944])
            ])
        });

        this.iconFeature.setStyle(this.getLineStyle('black'));

        vectorSource.addFeature(this.iconFeature);
    },

    reportClear: function() {
        //this.getView().vectorSource.clear();

        this.iconFeature.setGeometry(new ol.geom.Point(ol.proj.fromLonLat([-5.257778, 51.751944])));
        this.iconFeature.setStyle(this.getMarkerStyle('red'));
    }

});
