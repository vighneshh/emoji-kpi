define( [ "qlik","jquery", "css!./style.css","css!./font-awesome.min.css"
],
function ( qlik, $) {
	'use strict';
	

	return {
		initialProperties: {
			qHyperCubeDef: {
				qMeasures: [],
				qInitialDataFetch: [{
					qWidth: 10,
					qHeight: 50
				}]
			}
		},
		definition: {
			type: "items",
			component: "accordion",
			items: {
				
				measures: {
					uses: "measures",
					min: 1,
					max: 1,
					items:{
							
								thresholdvalue:{
									type:"string",
									label:"Threshold Value",
									ref:"qDef.thresholdvalue",
									defaultValue:"1000",
									expression:"optional"
								},
					       },
				},
				sorting: {
					uses: "sorting"
				},
				settings: {
					uses: "settings",
					items: {
			        // Definition of the custom section header
			        kpiSettings: {
			            type: "items",
			            label: "KPI Settings",
			            items: {
			                bgcolor:{
								type:"string",
								label:"BG Color",
								ref:"prop.bgcolor",
								defaultValue:"#ccc",
								expression:"optional"
							},
							titlecolor:{
								type:"string",
								label:"Title Color",
								ref:"prop.titlecolor",
								defaultValue:"#fff",
								expression:"optional"
							},
							opacity:{
								type:"string",
								label:"Icon Opacity",
								ref:"prop.opacity",
								defaultValue:"7",
								expression:"optional"
							},
							titlefontsize:{
								type:"string",
								label:"Title Font Size",
								ref:"prop.titlefontsize",
								defaultValue:"20px",
								expression:"optional"
							},
							valuefontsize:{
								type:"string",
								label:"Value Font Size",
								ref:"prop.valuefontsize",
								defaultValue:"20px",
								expression:"optional"
							},
							emojisize:{
								type:"string",
								label:"Emoji Size",
								ref:"prop.emojisize",
								defaultValue:"70px"
							},
							positiveemoji:{
								type:"string",
								label:"Positive Emoji",
								ref:"positiveemoji",
								defaultValue:"128516",
								expression:"optional"
							},
							negativeemoji:{
								type:"string",
								label:"Negative Emoji",
								ref:"negativeemoji",
								defaultValue:"128532",
								expression:"optional"
							},
							
							
							sheetID:{
								type:"string",
								label:"Sheet ID",
								ref:"prop.sheetID",
								defaultValue:"",
								expression:"optional"
							},
							emojiicons:{
								type:"string",
								label:"Get More Emoji Codes Here",
								ref:"emojiicons",
								defaultValue:"https://www.w3schools.com/charsets/ref_emoji_smileys.asp"
							},

			            }
			        }
			    }


				},
				about: {
                            component: "kpi-about",
                            translation: "About",
                            label: "About"
                        }
			}
		},
		snapshot: {
			canTakeSnapshot: true
		},
		
		paint: function ($element,layout) {
			
			
			
			var qHyperCube = layout.qHyperCube;
		var qMatrix = layout.qHyperCube.qDataPages[0].qMatrix;
		var qMeasureInfo = qHyperCube.qMeasureInfo;


		
		

    // var emoji = layout.prop.positiveemoji; //happy face
    if(qMatrix[0][0].qNum >= qMeasureInfo[0].thresholdvalue){
    	// var emoji = "&#128516;"; //happy face
    	var emoji = '&#'+layout.positiveemoji+';'; //happy face
    }
    else{
    	// var emoji = "&#128532;"; // sad face
    	var emoji = '&#'+layout.negativeemoji+';' // sad face
    }
    
    

var htmltext = `
<div class="tile-box tile-box-shortcut " id="cont_`+layout.qInfo.qId+`" style="background: `+layout.prop.bgcolor+`; overflow:hidden;">
	
	
	<div class="tile-header" style="font-size:`+layout.prop.titlefontsize+` ;color: `+layout.prop.titlecolor+`;">`+qMeasureInfo[0].qFallbackTitle+`</div>
	<span class="bs-badge badge-absolute primary" style="font-size:`+layout.prop.valuefontsize+`">`+qMatrix[0][0].qText+`</span>
	
 	<div id="sheet1" class="tile-content-wrapper" >
 		<span class="icon" style="font-size:`+layout.prop.emojisize+`">`+emoji+`</span>
 		 	</div>
</div>
`
			$element.html( htmltext );
			
			$("#sheet1").click(function(){
			  qlik.navigation.gotoSheet(layout.prop.sheetID);
			});

			return qlik.Promise.resolve();
		}
	};

} );

