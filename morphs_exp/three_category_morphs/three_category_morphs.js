// creates an image partway between two other images, as in the animations
// by Raphael.js
function intermediate(from, to, pos) {
  var fromCurve = Raphael.path2curve(from);
  var toCurve = Raphael.path2curve(to);
  var diff = [];
  var attr = "path";
  //compute difference between paths and store in diff
  for (i = 0, ii = fromCurve.length; i < ii; i++) {
    diff[i] = [0];
    for (var j = 1, jj = fromCurve[i].length; j < jj; j++) {
      diff[i][j] = (toCurve[i][j] - fromCurve[i][j]);
    }
  }
  var S = " ";
  now = [];
  //compute new path string for intermediate image
  for (var i = 0, ii = fromCurve.length; i < ii; i++) {
    now[i] = [fromCurve[i][0]];
    for (var j = 1, jj = fromCurve[i].length; j < jj; j++) {
      now[i][j] = +fromCurve[i][j] + pos * diff[i][j];
    }
    now[i] = now[i].join(S);
  }
  return now.join(S);
}

function uniformAroundMean(mean, radius) {
  var radius = radius || 0.2;
  if (mean + radius < 1) {
    var upper = mean + radius;
  } else {
    var upper = 1;
  }
  if (mean - radius > .1) {
    var lower = mean - radius;
  } else {
    var lower = .1;
  }
  var interval = upper - lower;
  return Math.random() * interval + lower;
}

function myColor(meanColor, hVar, sVar, vVar) {
  var hVar = hVar || 0.01;
  var sVar = sVar || 0.1;
  var vVar = vVar || 0.1;
  var c = Raphael.color(meanColor);
  if (c.h<0.1 || c.h>0.9) { hVar = hVar*0.6; }
  var hMin = c.h - hVar;
  var hMax = c.h + hVar;
  if (hMin < 0) {hMin = 0;}
  var hue = uniform(hMin, hMax);
  if (hue >= 1) { hue = hue-1; }
  var saturation = uniformAroundMean(c.s, sVar);
  var value = uniformAroundMean(c.v, vVar);
  var newColor = Raphael.hsb2rgb(hue, saturation, value);
  return newColor.hex;
}

function posify(pathString, xpos, ypos) {
  var segments = pathString.split(" ");
  var ret_string = segments[0]; //M
  var type = "x";
  for (var i=1; i<(segments.length); i++) {
    var seg = segments[i];
    if (type == "x") {
      if (seg == "Q" || seg == "L" || seg == "C" || seg == "Z" || seg == "z") {
        ret_string += (" " + seg);
        type = "x"
      } else {
        var x = (((parseFloat(seg)-150)*0.2)+xpos).toString();
        ret_string += (" " + x);
        type = "y";
      }
    } else if (type == "y") {
      var y = (((parseFloat(seg)-150)*0.2)+ypos).toString();
        ret_string += (" " + y);
      type = "x";
    }
  }
  return ret_string;
}

function uniform(a, b) { return ( (Math.random()*(b-a))+a ); }
function showSlide(id) { $(".slide").hide(); $("#"+id).show(); }
function shuffle(v) { newarray = v.slice(0);for(var j, x, i = newarray.length; i; j = parseInt(Math.random() * i), x = newarray[--i], newarray[i] = newarray[j], newarray[j] = x);return newarray;} // non-destructive.

//distributions
var peakedDown = [ 0.1503, 0.808, 0.008998, 0.1865, 0.6968,
                   0.08414, 0.5298, 0.04401, 0.08997, 0.1155,
                   0.9365, 0.1723, 0.02402, 0.09271, 0.2748,
                   0.04575, 0.3631, 0.06981, 0.7915, 0.1422 ];
var peakedMid = [ 0.4483, 0.5501, 0.5131, 0.4047, 0.5896,
                  0.4675, 0.4634, 0.6999, 0.8629, 0.6108,
                  0.3966, 0.6713, 0.5004, 0.5445, 0.5838,
                  0.333, 0.571, 0.7091, 0.2747, 0.4224 ];
var peakedUp = [ 0.5187, 0.696, 0.9059, 0.5085, 0.06499,
                 0.9219, 0.8298, 0.9483, 0.6705, 0.9913,
                 0.999, 0.7982, 0.8714, 0.406, 0.5344,
                 1, 0.4055, 0.8554, 0.7807, 0.9755 ];

//randomized particulars
var shapePairs = [ { cloud: "M 221.7571575320564,150 Q 235.33250039697197,183.56816372052631 178.66709439959914,176.68337715408177 Q 189.77066884863115,237.34425189457463 152.67669302195748,230.2622947355221 Q 106.18824144458648,263.08315106222085 87.34457613025721,214.28222693427597 Q 37.157650543250696,192.13597105007403 71.60876085378497,143.4415297870395 Q 69.50098674009855,101.76184621474493 130.13572530091528,119.31686876482323 Q 139.68495874592924,60.558577755087825 174.01994490949298,83.1415789427852 Q 238.04234639979444,88.07874811311186 221.7571575320564,150",
                     spikey: "M 227.1753318214803,150 Q 230.34329245027482,184.3396911320814 234.17184931397168,238.03432938679111 Q 176.1471395867638,223.02310266966794 145.67111361016336,207.3901616410368 Q 120.60272053801536,208.7539431935977 76.15756846740022,214.53454863270557 Q 70.15797594245315,176.3162788336788 56.02099517470542,142.32813486378728 Q 83.51403297621943,109.59015621330471 104.56308657027593,77.5248400718606 Q 136.0595742073103,58.977915925262366 181.11244904919704,31.15287588330574 Q 219.58206251754342,96.28873096172566 227.1753318214803,150"} ];
var nouns = ["wug", "tig", "bonk"];
var colors = ["ff0000", "0000ff", "#00ff00"];
var adjectives = ["feppy"];
var distributions = [peakedDown, peakedMid, peakedUp];
var grey = "#e0e0e0";

var nComparison = 3;
var nArtifacts = 3;
var nClassifications = 9;
var toClassify = [];
for (var i=0; i<nClassifications; i++) {
  toClassify.push(i/(nClassifications - 1));
}
var compareQns = nComparison * nArtifacts;
var classifyQns = nClassifications;
var totQns = (nArtifacts * nComparison) + nClassifications + 9 + 1;

$(document).ready(function() {
  experiment.compare(0, "start");
  //showSlide("consent");
  //$("#mustaccept").hide();
});

var experiment = { data: {"classificationWarmup":{}},
                   least: shapePairs[0].cloud,
                   most: shapePairs[0].spikey,
                   toClassify: shuffle(toClassify),

                   instructions: function() {
                     if (turk.previewMode) {
                         $("#instructions #mustaccept").show();
                     } else {
                         showSlide("instructions");
                     }
                   },
                   compare: function(artifactIndex, stage, qNumber) {
	                   $('.bar').css('width', ( (100*(artifactIndex*nComparison + qNumber)/totQns) + "%"));
                     if (stage == 'start') {
                       //draw all the wugs (or tigs or bonks)
                       if (artifactIndex == 0) {
                         var firstWord = "One";
                       } else {
                         var firstWord = "Another";
                       };
                       $("#artifactText").html("pictures of 20 "+nouns[artifactIndex]+"s<br/>"+firstWord+" kind of alien artifact are called "+nouns[artifactIndex]+"s. Some of the "+nouns[artifactIndex]+"s are more "+adjectives[0]+" than others. Please take a moment to study these "+nouns[artifactIndex]+"s. When you're ready, click the 'Continue' button below.");
                       showSlide("compare");
                       $("#artifactMoveon").click(function() {
                         $("#artifactMoveon").unbind("click");
                         experiment.compare(artifactIndex, 'least-most');
                       });
                     } else if (stage == 'least-most') {
                       $("#artifactText").html("The "+nouns[artifactIndex]+" on the left is the most feppy "+nouns[artifactIndex]+" we know of and the "+nouns[artifactIndex]+" on the right is the least feppy one. Please take a look at these two objects and then click 'Continue' when you are ready to go on.");
                       //animation to show most and least feppy wugs
                       $("#artifactMoveon").click(function() {
                         $("#artifactMoveon").unbind("click");
                         experiment.compare(artifactIndex, 'comparison', 0);
                       });
                     } else if (stage == 'comparison') {
                       $("#artifactText").html("Click on the "+nouns[artifactIndex]+" that is the most feppy.");
                       //practice with feppiness scale
                       $("#artifactMoveon").click(function() {
                         $("#artifactMoveon").unbind("click");
                         if (qNumber + 1 < nComparison) {
                           experiment.compare(artifactIndex, 'comparison',
                                               qNumber + 1);
                         } else if (artifactIndex + 1 < nArtifacts) {
                           experiment.compare(artifactIndex + 1, 'start');
                         } else {
                           experiment.classify('start');
                         }
                       });
                     } else {
                       console.log('ERROR unrecognized input for variable ' +
                                   '"stage" in function compare: ' + stage);
                     }
                   },
                   classify: function (stage, qNumber, classifyPaper) {
                     if (stage == 'start') {
	                   $('.bar').css('width', ( (100*(compareQns)/totQns) + "%"));
                       var allIndices = [];
                       for (var i=0; i<20; i++) {allIndices.push(i);}
                       for (var i=0; i<nouns.length; i++) {
                         displayShapes(i, allIndices);
                       }
                       showSlide("classify");
                       $("#classifyError").hide();
                       $("#classification").hide();
                       //allArtifacts
                       //show wugs, tigs, and bonks, in seperate categories
                       var classifyText = "<p>Now we need your help to sort " +
                                          "some new artifacts. The new " +
                                          "artifacts have lost their original " +
                                          "colors, but each is either a " +
                                          nouns[0] + ", a " + nouns[1] + 
                                          ", or a " + nouns[2] + ".</p><p>Click" +
                                          " continue when you are ready to " +
                                          "start sorting the new artifacts.</p>"
                       $("#classifyText").html(classifyText);
                       $("#classifyMoveon").click(function() {
                         $("#classifyMoveon").unbind("click");
                         var classifyPaper = Raphael("classifyShape",100,100);
                         experiment.classify('question', 0, classifyPaper);
                       });
                     } else if (stage == 'question') {
	                     $('.bar').css('width', ( (100*(compareQns + qNumber)/totQns) + "%"));
                       $("#classifyError").hide();
                       var selector = document.getElementById('choice');
                       selector.value = "";
                       //show a new shape
                       var morphProp = experiment.toClassify[qNumber];
                       var inter = intermediate(experiment.least, experiment.most, morphProp);
                       var tmpPath = posify(inter, 50, 50);
                       var tmpObj = classifyPaper.path(tmpPath);
                       tmpObj.attr({fill: makeGradient("r", grey)});
                       $("#classifyText").hide();
                       $("#classification").show();
                       //what to put in the dropdown menu:
                       $("#noun0").html(nouns[0]);
                       $("#noun1").html(nouns[1]);
                       $("#noun2").html(nouns[2]);
                       //drop menu for which shape
                       $("#classifyMoveon").click(function() {
                         var responseRaw = $("#classification").serialize();
                         console.log(responseRaw);
  		                   if (responseRaw.length < 8) {
                           $("#classifyError").show();
                         } else {
                           $("#classifyMoveon").unbind("click");
				                   //endTime = (new Date()).getTime(); 
				                   //trialparameters.q1rt = endTime - startTime;
				                   var response = responseRaw.split("=");
				                   var choice = nouns[parseInt(response[1])];
				                   experiment.data["classificationWarmup"][morphProp] = choice;
                           //Thanks!
                           $("#classification").show();
                           $("#classifyText").html("Thanks!");
                           $("#classifyText").show();
                           if (qNumber + 1 < nClassifications) {
                             classifyPaper.clear();
                             experiment.classify('question', qNumber + 1,
                                                 classifyPaper);
                           } else {
                             experiment.target();
                           }
                         }
                       });
                     } else {
                       console.log('ERROR unrecognized input for variable '+
                                   '"stage" in function classify');
                     }
                   },
                   target: function() {
	                   $('.bar').css('width', ( (100*(classifyQns+compareQns)/totQns) + "%"));
                     $("#targetError").hide();
                     showSlide("target");
                     //randomize target phrase order
                     var targetPhrases = [];
                     for (var i=0; i<nouns.length; i++) {
                       targetPhrases.push(nouns[i]);
                       targetPhrases.push(adjectives[0] + " " + nouns[i]);
                       targetPhrases.push("very " + adjectives[0] + " " + 
                                          nouns[i]);
                     }
                     
                     //stupid for-loop closure bullshit (!!!!!)
                     var shapes = [];
                     var responses = {};
                     var nResponses = 0;
                     var firstPath = posify(intermediate(experiment.least,
                                                         experiment.most, 0.5),
                                            20, 50);
                     for (var i=0; i<9; i++) {
                       var paper = Raphael("canvas"+i, 60, 100);
                       shapes.push(paper.path(firstPath));
                     }
                     function animCreator(index) {
                       return function(x) {
                         var currentPath = posify(intermediate(experiment.least, experiment.most, x), 20, 50);
                         var shape = shapes[index];
                         shape.attr({path: currentPath,
                                     fill: makeGradient("r",grey)});
                       }
                     }
                     function callCreator(index) {
                       return function(x) {
                         if (responses[targetPhrases[index]] == null) {
                           nResponses++;
	                         $('.bar').css('width', ( (100*(compareQns + classifyQns + nResponses)/totQns) + "%"));
                         }
                         responses[targetPhrases[index]] = x;
                       }
                     }
                     //end stupid for-loop closure bullshit (!!!!!)
                     
                     for (var i=0; i < 9; i++) {
                       $("#targetText"+i).html("...what you think a <b>" + 
                                               targetPhrases[i] +
                                               "</b> would look like:");
                       var caseLabel = "sliderCase" + i;
                       var sliderLabel = "slider" + i;
                       $("#"+caseLabel).html('<div id="'+sliderLabel+
                                             '" class="dragdealer"><div class='+
                                             '"red-bar handle"></div></div>');
                       var slider = new Dragdealer(sliderLabel, {
                         x: 0.5,
                         animationCallback: animCreator(i),
                         callback: callCreator(i)
                       });
                     }
                     
                     $("#targetMoveon").click(function() {
                       /*var nFail = 0;
                       for (phrase in responses) {
                         if (responses[phrase] == null) { nFail ++; }
                       }*/
                       if ( nResponses < 9 ) {
                         $("#targetError").show();
                       } else {
                         $("#targetMoveon").unbind("click");
                         experiment.data["targetQns"] = responses;
                         for (phrase in responses) {
                           console.log(phrase + " - " + responses[phrase]);
                         }
                         experiment.language();
                       }
                     });
                   },
                   language: function() {
	                   $('.bar').css('width', ( "100%"));
                    showSlide("language");
                    $("#lgerror").hide();
                    $("#lgsubmit").click(function(){
                    lang = $("#lgform").serialize();
                      if (lang.length > 5) {
                          lang = lang.slice(3,lang.length);
                          experiment.data["language"] = lang;
                          showSlide("finished");
                          setTimeout(function() { turk.submit(experiment.data) }, 1000);
                      }
                    });
                   }
                 };

//nArtifacts should be = distributions.length
//length of each distribution should be 20


function displayShapes(nounIndex, allIndices) {
  $("#n"+nounIndex).html(nouns[nounIndex] + "s");
  var myIndices = shuffle(allIndices);
  var nrows = 5;
  var ncols = 4;
  var space = 70;
  var paper = Raphael("allArts"+nounIndex, (ncols*space), (nrows*space));
  for (var row=0; row<nrows; row++) {
    for (var col=0; col<ncols; col++) {
      var index = myIndices[(row*ncols)+col];
      var morphProp = distributions[nounIndex][index];//nounIndices[index]/(nounIndices.length-1);
      var xpos = (col+0.5)*space;
      var ypos = (row+0.5)*space;
      var inter = intermediate(experiment.least, experiment.most, morphProp);
      var tmpPath = posify(inter, xpos, ypos);
      var tmpObj = paper.path(tmpPath);
      tmpObj.attr({fill: makeGradient("r", myColor(colors[nounIndex], 0.05, 0.1, 0.5))});
    }
  }
  //onScreenShapes.push([tmpObj,tmpPath,morphProp,posInOSS]);
}





  
  function lighten(origColor, saturation) {
    var saturation = saturation || false;
    var eps = 0.1;
    var c = Raphael.color(origColor);
    if (c.v + eps < 1) {
      var value = c.v + eps;
    } else {
      var value = 1;
    }
    if (saturation) {
      var saturationEps = 0.1;
      if (c.s - saturationEps > 0) {
        var sat = c.s - saturationEps;
      } else {
        var sat = 0;
      }
    } else {sat = c.s;}
    var newColor = Raphael.hsb2rgb(c.h, sat, value);
    return newColor.hex;
  }
  
  function darken(origColor) {
    var eps = 0.1;
    var c = Raphael.color(origColor);
    if (c.v - eps < 1) {
      var value = c.v - eps;
    } else {
      var value = 1;
    }
    var newColor = Raphael.hsb2rgb(c.h, c.s, value);
    return newColor.hex;
  }

  function makeGradient(intro, origColor) {
    var light = lighten(origColor);
    var grad = intro + light + "-" + origColor;
    return grad;
  }
