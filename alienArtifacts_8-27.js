// artifact vs. natural kinds? (probably not a problem)
// fix morph shapes
// find out whether we can accurately log window size inside mturk
// could have Ss click button to make array visible
// don't let the hit expire!!!
// make peakedMid centered at 0.5
// should each category have a shape close to each endpoint?


/*
var pairings = [ ["cloud", "squashedBoomarang"], ["fat", "flower"],
                 ["spikes", "choppyCircle"], ["circleSpikes", "oblongSpikes"],
                 ["bigCloud", "frillyCloud"], ["ghost", "s"], ["crown","cloudedMoon"] ];
*/
var pairings = [ ["crown", "cloudedMoon"], ["ghost", "s"], ["splat", "flyingSquirrel"], ["weirdPacman", "weirdHeart"]];

var expertNames = ["John", "David", "Sam", "Jason", "Steve", "Lawrence", "Colin",
                   "Sally", "Megan", "Tanya", "Elizabeth", "Mary", "Katy", "Laura"];
var expertName = shuffle(expertNames)[0];

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


function translate(pathString, xpos, ypos) {
  var segments = pathString.split(" ");
  var ret_string = segments[0]; //M
  var old_xpos = segments[1];
  var old_ypos = segments[2];
  var xdiff = xpos - old_xpos;
  var ydiff = ypos - old_ypos;
  var type = "x";
  for (var i=1; i<(segments.length); i++) {
    var seg = segments[i];
    if (type == "x") {
      if (seg == "Q" || seg == "L" || seg == "C" || seg == "Z" || seg == "z") {
        ret_string += (" " + seg);
        type = "x"
      } else {
        var x = (parseFloat(seg)+xdiff).toString();
        ret_string += (" " + x);
        type = "y";
      }
    } else if (type == "y") {
      var y = (parseFloat(seg)+ydiff).toString();
        ret_string += (" " + y);
      type = "x";
    }
  }
  return ret_string;
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

function caps(a) {return a.substring(0,1).toUpperCase() + a.substring(1,a.length);}
function uniform(a, b) { return ( (Math.random()*(b-a))+a ); }
function showSlide(id) { $(".slide").hide(); $("#"+id).show(); }
function shuffle(v) { newarray = v.slice(0);for(var j, x, i = newarray.length; i; j = parseInt(Math.random() * i), x = newarray[--i], newarray[i] = newarray[j], newarray[j] = x);return newarray;} // non-destructive.

function numeric(a,b) {return a-b;};

//distributions
/*var peakedDown = [ 0.1503, 0.808, 0.008998, 0.1865, 0.6968,
                   0.08414, 0.5298, 0.04401, 0.08997, 0.1155,
                   0.9365, 0.1723, 0.02402, 0.09271, 0.2748,
                   0.04575, 0.3631, 0.06981, 0.7915, 0.1422 ].slice(0,nExamples).sort(function(a,b){return a-b;});
var peakedMid = [ 0.4483, 0.5501, 0.5131, 0.4047, 0.5896,
                  0.4675, 0.4634, 0.6999, 0.8629, 0.6108,
                  0.3966, 0.6713, 0.5004, 0.5445, 0.5838,
                  0.333, 0.571, 0.7091, 0.2747, 0.4224 ].slice(0,nExamples).sort(function(a,b){return a-b;});
var peakedUp = [ 0.5187, 0.696, 0.9059, 0.5085, 0.06499,
                 0.9219, 0.8298, 0.9483, 0.6705, 0.9913,
                 0.999, 0.7982, 0.8714, 0.406, 0.5344,
                 1, 0.4055, 0.8554, 0.7807, 0.9755 ].slice(0,nExamples).sort(function(a,b){return a-b;});
                 */
var peakedDown = [  0.04583, 0.003231, 0.07391, 0.01884, 0.00003024, 0.04158,
                    0.09081, 0.06746, 0.01949, 0.1007, 0.1633, 0.1441, 0.1655,
                    0.2697, 0.2161 ].sort(numeric);
/*var peakedMid = [  0.2489, 0.2908, 0.3173, 0.3717, 0.3857, 0.4729, 0.4959,
                   0.4051, 0.4168, 0.492, 0.5714, 0.5028, 0.5001, 0.6427,
                   0.6147 ].sort(numeric);*/
var peakedMid = [ 0.31404, 0.30456, 0.39520, 0.56064, 0.49728, 0.53187, 0.55993,
                  0.47519, 0.54332, 0.48362, 0.51678, 0.44763, 0.68272, 0.61375,
                  0.69832 ].sort(numeric);
/*var peakedUp = [ 0.98453, 0.94511, 0.98374, 0.99169, 0.95354, 0.99290, 0.90903,
                 0.93163, 0.97849, 0.82958, 0.81623, 0.85902, 0.83160, 0.76648,
                 0.73325 ].sort(numeric);*/
var unif = [ 0.9730805, 0.0589135, 0.1332413, 0.5568001, 0.6201130, 0.4243146,
             0.4176713, 0.2215742, 0.6778150, 0.6834636, 0.8716204, 0.5641932,
             0.3503760, 0.9606276, 0.0048311].sort(numeric);


//randomized particulars
//var shapePairs = [ { cloud: "M 221.7571575320564,150 Q 235.33250039697197,183.56816372052631 178.66709439959914,176.68337715408177 Q 189.77066884863115,237.34425189457463 152.67669302195748,230.2622947355221 Q 106.18824144458648,263.08315106222085 87.34457613025721,214.28222693427597 Q 37.157650543250696,192.13597105007403 71.60876085378497,143.4415297870395 Q 69.50098674009855,101.76184621474493 130.13572530091528,119.31686876482323 Q 139.68495874592924,60.558577755087825 174.01994490949298,83.1415789427852 Q 238.04234639979444,88.07874811311186 221.7571575320564,150",
//                     spikey: "M 227.1753318214803,150 Q 230.34329245027482,184.3396911320814 234.17184931397168,238.03432938679111 Q 176.1471395867638,223.02310266966794 145.67111361016336,207.3901616410368 Q 120.60272053801536,208.7539431935977 76.15756846740022,214.53454863270557 Q 70.15797594245315,176.3162788336788 56.02099517470542,142.32813486378728 Q 83.51403297621943,109.59015621330471 104.56308657027593,77.5248400718606 Q 136.0595742073103,58.977915925262366 181.11244904919704,31.15287588330574 Q 219.58206251754342,96.28873096172566 227.1753318214803,150"} ];
var colorBank = [ {word: "red", hex: "ff0000"},
                  {word: "blue", hex: "0000ff"} ];
                  //{word: "green", hex: "#00ff00"}];
var nonceWords = ["fep", "wug", "tig", "dax", "blick", "speff", "zib", "gub",
                  "bort"]
var nounify = { "feppy": "feppiness",
                "wuggy": "wugginess",
                "tiggy": "tigginess",
                "daxy": "daxiness",
                "blicky": "blickiness",
                "speffy": "speffines",
                "zibby": "zibbiness",
                "gubby": "gubbiness",
                "borty": "bortiness" };
var adjify = { "fep": "feppy",
               "wug":"wuggy",
               "tig": "tiggy",
               "blick": "blicky",
               "dax": "daxy",
               "speff": "speffy",
               "zib": "zibby",
               "gub": "gubby",
               "bort": "borty"};
var plural = { "fep": "feps",
               "wug":"wugs",
               "tig": "tigs",
               "blick": "blicks",
               "dax": "daxes",
               "speff": "speffs",
               "zib": "zibs",
               "gub": "gubs",
               "bort": "borts" }
console.log(nonceWords.length == Object.keys(adjify).length);
console.log(Object.keys(adjify).length == Object.keys(nounify).length);
console.log(Object.keys(nounify).length == Object.keys(plural).length);
for (var i=0; i<nonceWords.length; i++) {
  var noun = nonceWords[i];
  var adj = adjify[noun];
  if (adj == null) { console.log("ERROR: no entry in adjify for noun " + noun); }
  var plur = plural[noun];
  if (plur == null) { console.log("ERROR: no entry in plural for noun " + noun); }
  var adjnoun = nounify[adj];
  if (adjnoun == null) { console.log("ERROR: no entry in nounify for adj " + adj); }
}
var distMap = {"down":peakedDown, "mid":peakedMid, "unif":unif};
var distPairs = shuffle([["down", "mid"], ["down", "unif"], ["mid", "unif"]]);
var distNames = distPairs[0];
var distributions = distNames.map(function(n) {return distMap[n]});

var nExamples = 15;
for (var i=0; i<distributions.length; i++) {
  var dist = distributions[i];
  console.log(dist.length == nExamples);
}
var grey = "#e0e0e0";

//as many compare as classify, should be roughly half easy half difficult
var nArtifacts = 2;
var nTargets = nArtifacts * 3;

/*subjects will have to compare objects with these levels of feppiness in the
warmups. they'll get two obvious questions 0.4 apart, and three non-obvious 
questions 0.2 apart*/
var compareParams = [ [0.15, 0.55], [0.45, 0.85], [0.1, 0.3], [0.7, 0.9], [0.4, 0.6] ];

/*subjects will have to classify objects with these levels of feppiness in the
warmups. points are taken from where the *kernel densities* of peakedDown and 
peakedMid intersect with each other, the higher point where peakedMid and unif
intersect with each other, the max of peakedMid, the max of peakedDown, and
1-max(peakedDown)*/
var classifyParams = [0.8, 0.29, 0.52, 0.74, 0.92];

var nComparisons = compareParams.length;//2;
var nClassifications = classifyParams.length;//2;
var nWarmups = nComparisons + nClassifications;
console.log( nComparisons == nClassifications );
var nQns = nWarmups + nTargets + 2; //plus 1 for language, one for sliderPractice
warmupStagesBank = [];
for (var i=0; i<nComparisons; i++) { warmupStagesBank.push("compare"); }
for (var i=0; i<nClassifications; i++) { warmupStagesBank.push("classify"); }
var shuffledCompare = shuffle(compareParams);
var shuffledClassify = shuffle(classifyParams);
var parameters = {"compare": shuffledCompare,
                  "classify": shuffledClassify };
var conds = ["speech-act", "non-speech-act"];


/*var nComparison = 3;
var nArtifacts = 3;
var nClassifications = 9;
var toClassify = [];
for (var i=0; i<nClassifications; i++) {
  toClassify.push(i/(nClassifications - 1));
}
var compareQns = nComparison * nArtifacts;
var classifyQns = nClassifications;
var totQns = (nArtifacts * nComparison) + nClassifications + 9 + 1;
*/

$(document).ready(function() {
  //experiment.questionaire();
  //experiment.sliderPractice();
  //experiment.warmup("start");
  //experiment.compare("start");
  //experiment.classify("start");
  showSlide("consent");
  $("#mustaccept").hide();
});

//parameters randomized for each subject
var shuffledNonce = shuffle(nonceWords);
var nouns = shuffledNonce.slice(0,2);
var adjective = adjify[ shuffledNonce[4] ];
var colors = getColors();
var shuffledPairings = shuffle(pairings);
var unshuffledPair = shuffledPairings[0];
var pair = shuffle(unshuffledPair);
var leastLabel = pair[0];
var mostLabel = pair[1];
var least = shapes[ leastLabel ];
var most = shapes[ mostLabel ];

//order in which categories are displayed in warmup from top to bottom
var warmupIndices = shuffle([0, 1]);
var experiment = {
  data: {nouns:nouns,
         adjective:adjective,
         colors:colors,
         least:{label: leastLabel, path:least},
         most:{label:mostLabel, path:most},
         windowWidth:window.innerWidth,
         windowHeight:window.innerHeight,
         warmupIndices:warmupIndices, warmups:[],
         expertName:expertName,
         browser: BrowserDetect.browser,
         distNames: distNames,
         distributions: distributions},
  warmupStages: getWarmupStages(),
  cond: 'speech-act',

  instructions: function() {
    if (turk.previewMode) {
      $("#instructions #mustaccept").show();
    } else {
      showSlide("instructions");
      //$("#begin").click(function() { experiment.warmup('start'); })
      $("#begin").click(function() { experiment.sliderPractice(); })
    }
  },
  
  sliderPractice: function() {
    $("#sliderText").html("<p>You will learn about two kinds of alien artifacts" +
                          " that differ in color and <b>" +
                          nounify[adjective] + "</b>.</p><p>" +
                          caps(nounify[adjective]) + " is an important " +
                          "property, so please take a moment to understand " +
                          "a bit about it. You can adjust the slider below " +
                          "to vary the " + nounify[adjective] +
                          " of this shape.<p>");
    var interactivePaper = Raphael("interactiveCanvas", 300, 300);
    $("#leftTag").html("least " + adjective);
    $("#rightTag").html("most " + adjective);
    var halfway = intermediate(least, most, 0.5);
    var interactiveShape = interactivePaper.path(halfway);
    interactiveShape.attr({fill: makeGradient("r", grey)});
    showSlide("sliderPractice");
    var maxRange = 0.5;
    var minRange = 0.5;
    var visitedPositions = [];
    var practiceSlider = new Dragdealer("introSlider", {
      x: 0.5,
      speed: 50,
      animationCallback: function(x) {
        var inter = intermediate(least, most, x);
        interactiveShape.attr({path: inter});
        if ( x>maxRange ) { maxRange=x; }
        if ( x<minRange ) { minRange=x; }
      },
      callback: function(x) { visitedPositions.push(x); }
    });
    $("#sliderMoveon").click(function() {
      $("#sliderMoveon").unbind("click");
      experiment.data["sliderPractice"] = { "min": minRange, "max": maxRange,
                                            "positions": visitedPositions };
      experiment.warmup('start');
    })
  },
 
  warmup: function(stage, qNumber) {
    if (stage == "start") {
      $('.bar').css('width', ( (100/nQns) + "%"));
      function buttonSide(side) { return "The artifact on the " + side + " is " +
                                         "more " + adjective + "."; }
      $("#leftButton").html(buttonSide("left"));
      $("#rightButton").html(buttonSide("right"));
      var top = warmupIndices[0];
      var bottom = warmupIndices[1];
      $("#introObjs").html("<p>Here are examples of the two different " +
                           "kinds of alien" +
                           " artifacts.<br/>The " + colors[top].word + 
                           " ones  are called <b>" + plural[nouns[top]] + "</b>" +
                           " and the " + colors[bottom].word + 
                           " ones are called <b>" + plural[nouns[bottom]] +
                           "</b>.</p><p>Some of the " + "artifacts are more <b>" +
                           adjective +
                           "</b> than others. Within each category, we" +
                           " have lined the objects up in order from least " +
                           "to most " + adjective + ".</p>");
      $("#adjLeft").html("less " + adjective);
      $("#adjRight").html("more " + adjective);
      $("#warmupText").html("We need your help to sort and describe some" +
                            " new artifacts. These new artifacts " +
                            "have lost their original colors, but each is " +
                            "either a " + nouns[top] + " or a " +
                            nouns[bottom] + ".");
      $("#compare").hide();
      $("#classify").hide();
      for (var pos=0; pos<nArtifacts; pos++) {
        displayStuff(pos);
      }
      showSlide("warmup");
      $("#warmupMoveon").click(function() {
        $("#warmupMoveon").unbind("click");
        var next = experiment.warmupStages[0];
        experiment.warmup(next.stage, 0);
      });
    } else {
      $('.bar').css('width', ( (100*(qNumber+1)/nQns) + "%"));
      $("#warmupMoveon").hide();
      $("#introObjs").html("<p><br/><br/></p><p><br/></p>");
      $("#warmupContinueText").hide();
      var startTime = (new Date()).getTime();
      if (stage == "compare") {
        $("#compare").show();
        $("#classify").hide();
        $("#warmupText").html("Which of the two artifacts below is more " +
                              adjective + "?");
        var pair = shuffle(experiment.warmupStages[qNumber].params);
        var left = pair[0];
        var right = pair[1];
        drawWhite("left", left);
        drawWhite("right", right);
        $("#leftButton").click(function() {
          $("#leftButton").unbind("click");
          $("#rightButton").unbind("click");
          compareResponse("left", {left: left, right:right}, qNumber, startTime)
        });
        $("#rightButton").click(function() {
          $("#rightButton").unbind("click");
          $("#leftButton").unbind("click");
          compareResponse("right", {left: left, right:right}, qNumber, startTime)
        });
      } else if (stage == "classify") {
        $("#compare").hide();
        $("#classify").show();
        $("#warmupText").html("The object below is an example of which kind of" +
                              " artifact?");
        var morphProp = experiment.warmupStages[qNumber].params;
        drawWhite("classify", morphProp);
        var buttonOrder = shuffle([0, 1]);
        var n0 = nouns[buttonOrder[0]];
        var n1 = nouns[buttonOrder[1]];
        $("#noun0").html(n0);
        $("#noun1").html(n1);
        $("#noun0").click( function() {
          $("#noun0").unbind("click");
          $("#noun1").unbind("click");
          classifyResponse(n0, qNumber, startTime, morphProp, buttonOrder)
        });
        $("#noun1").click( function() {
          $("#noun0").unbind("click");
          $("#noun1").unbind("click");
          classifyResponse(n1, qNumber, startTime, morphProp, buttonOrder)
        });
      } else {
        console.log("ERROR unrecognized input for " +
                    "variable 'stage' in function 'warmup'");
      }
    }
  },

  target: function() {
    if (experiment.cond == 'speech-act') {
    /*
      var prompt = "<p>" + expertName + " is an expert on these alien " +
                   "artifacts.</p><p>Imagine that " + expertName + " describes" +
                   " an object with each phrase below. What do you think the " +
                   "object looks like? Adjust the slider to give us your guess." +
                   "</p>";
      */
      var prompt = "<p>" + expertName + " is an expert on these alien " +
                   "artifacts.</p><p>For each of the phrases below, imagine " +
                   " that " + expertName + " sees an object which he knows is " +
                   "from that category" +
                   " and describes it using that phrase. What do you think " +
                   "each object looks like? Adjust the slider to give us your" +
                   " guess.</p>";
      var targetBegin = 'John says, "';
      var targetEnd = '"';
    } else if (experiment.cond == 'non-speech-act') {
      var prompt = "Please use the sliders below each of the phrases to indicate...";
      var targetBegin = '... what you think ';
      var targetEnd = ' would look like.';
    } else {
      console.log("ERROR: unrecognized input for experiment.cond: " + experiment.cond);
    }
    $("#targetIntro").html(prompt)
    $('.bar').css('width', ( (100*(nWarmups+1)/nQns) + "%"));
    $("#targetError").hide();
    showSlide("target");
    //randomize target phrase order
    var targetPhrases = [ [], [] ];
    var phrasesOrder = shuffle([0,1,2]);
    for (var i=0; i<nouns.length; i++) {
      //if need to switch rows and columns, do that here by switching i and phrasesOrder[#]
      targetPhrases[i][phrasesOrder[0]] = nouns[i];
      targetPhrases[i][phrasesOrder[1]] = adjective + " " + nouns[i];
      targetPhrases[i][phrasesOrder[2]] = "very " + adjective + " " + nouns[i];
    }
    var targetPhrases = shuffle(targetPhrases);
    
    function row(index) {
      return Math.floor(index / 3);
    }
    function col(index) {
      return (index % 3);
    }

    var nTargets = nArtifacts*3;
    var maxRange = 0.5;
    var minRange = 0.5;
    //stupid for-loop closure bullshit (!!!!!)
    var shapes = [];
    var responses = {"targetOrder":phrasesOrder};
    var nResponses = 0;
    var firstPath = posify(intermediate(least,
                                       most, 0.5),
                          30, 50);
    for (var i=0; i<nTargets; i++) {
     var paper = Raphael("canvas"+i, 70, 100);
     shapes.push(paper.path(firstPath));
    }
    function animCreator(index) {
     return function(x) {
       var currentPath = posify(intermediate(least, most, x), 30, 50);
       var shape = shapes[index];
       shape.attr({path: currentPath,
                   fill: makeGradient("r",grey)});
     }
    }
    function callCreator(index) {
     return function(x) {
       if (responses[targetPhrases[row(index)][col(index)]] == null) {
         nResponses++;
         responses[targetPhrases[row(index)][col(index)]] = [];
         $('.bar').css('width', ( (100*(nWarmups + 1 + nResponses)/nQns) + "%"));
       }
       responses[targetPhrases[row(index)][col(index)]].push(x);
     }
    }
    //end stupid for-loop closure bullshit (!!!!!)

    for (var i=0; i < nTargets; i++) {
     $("#targetText"+i).html(targetBegin + "a <b>" + 
                             targetPhrases[row(i)][col(i)] +
                             "</b>" + targetEnd);
     var caseLabel = "sliderCase" + i;
     var sliderLabel = "slider" + i;
     $("#"+caseLabel).html('<div id="'+sliderLabel+
                           '" class="dragdealer"><div class='+
                           '"red-bar handle"></div></div>');
     var slider = new Dragdealer(sliderLabel, {
       x: 0.5,
       speed: 50,
       animationCallback: animCreator(i),
       callback: callCreator(i)
     });
    }
    var startTime = (new Date()).getTime();

    $("#targetMoveon").click(function() {
     /*var nFail = 0;
     for (phrase in responses) {
       if (responses[phrase] == null) { nFail ++; }
     }*/
     if ( nResponses < nTargets ) {
       $("#targetError").show();
     } else {
       $("#targetMoveon").unbind("click");
       var endTime = (new Date()).getTime();
       responses["rt"] = endTime - startTime;
       experiment.data["target"] = responses;
       experiment.questionaire();
     }
    });
  },

  questionaire: function() {
    $(document).keypress( function(event){
     if (event.which == '13') {
        event.preventDefault();
      }
    });
    $('.bar').css('width', ( "100%"));
    showSlide("questionaire");
    $("#lgerror").hide();
    $("#formsubmit").click(function(){
    rawResponse = $("#questionaireform").serialize();
    pieces = rawResponse.split("&");
    var age = pieces[0].split("=")[1];
    var lang = pieces[1].split("=")[1];
    var comments = pieces[2].split("=")[1];
    if (lang.length > 0) {
        experiment.data["language"] = lang;
        experiment.data["comments"] = comments;
        experiment.data["age"] = age;
        showSlide("finished");
        setTimeout(function() { turk.submit(experiment.data) }, 1000);
    }
    });
  }
};

//nArtifacts should be = distributions.length
//length of each distribution should be 20 = nExamples

  
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

  function makeGradient(intro, origColor) {
    var light = lighten(origColor);
    var grad = intro + light + "-" + origColor;
    return grad;
  }
  
function getColors() {
  var shuffledColors = shuffle(colorBank);
  var variedColors = [ {}, {} ]
  for (var i=0; i<nArtifacts; i++) {
    var latentMean = shuffledColors[i].hex;
    var word = shuffledColors[i].word;
    variedColors[i] = {mean: latentMean, tokenColors: [], word: word};
    for (var j=0; j<nExamples; j++) {
      var variedColor = myColor(latentMean, 0.05, 0.1, 0.5);
      variedColors[i].tokenColors.push(makeGradient("r", variedColor));
    }
  }
  return variedColors;
}


function displayStuff(position) {
  var artifact = warmupIndices[position];
  var nrows = Math.ceil( nExamples / 15 );
  var ncols = Math.ceil( nExamples / nrows );
  var space = 70;
  var sep = 80;
  var leftSpace = 10;
  var above = 0;
  $("#n"+position).html(plural[nouns[artifact]]);
  var warmupPaper = Raphael("orderedArts"+position, ncols*space, nrows*space);
  for (var row=0; row<nrows; row++) {
    for (var col=0; col<ncols; col++) {
      var i = (row*ncols)+col;
      var color = colors[artifact].tokenColors[i];
      var morphProp = distributions[artifact][i];
      var xpos = (col+0.5)*space;
      var ypos = (row+0.5)*space;
      var inter = intermediate(least, most, morphProp);
      var tmpPath = posify(inter, xpos, ypos);
      var tmpObj = warmupPaper.path(tmpPath);
      tmpObj.attr({fill: color});
    }
  }
}

function drawWhite(label, morphProp) {
  var space = 70;
  $("#"+label+"Holder").html('<div id="' + label + 'Canvas"></div>');
  var onePaper = Raphael(label+"Canvas", space, space);
  var color = makeGradient("r", grey);
  var xpos = 0.5*space;
  var ypos = 0.5*space;
  var inter = intermediate(least, most, morphProp);
  var tmpPath = posify(inter, xpos, ypos);
  var tmpObj = onePaper.path(tmpPath);
  tmpObj.attr({fill: color});
}

function warmupNext(qNumber) {
  if (qNumber + 1 < nWarmups) {
    var next = experiment.warmupStages[qNumber + 1];
    experiment.warmup(next.stage, qNumber + 1);
  } else {
    experiment.target();
  }
}

function compareResponse(choice, morphProps, n, startTime) {
  //choice should be either left or right
  //experiment.data moreSide choice correctness rt
  var endTime = (new Date()).getTime();
  var rt = endTime - startTime;
  if (morphProps.left > morphProps.right) {
    var moreSide = "left";
    var order = "ML"; //from left to right: more then less
  } else {
    var moreSide = "right";
    var order = "LM"; //from left to right: less then more
  }
  if (choice == moreSide) {
    var correctness = "correct";
  } else {
    var correctness = "incorrect";
  }
  var trialData = 
  experiment.data["warmups"].push({"qNumber":n,
                                    "qType":"compare",
                                    "rt":rt,
                                    "response":choice,
                                    "correctness":correctness,
                                    "morphProps":morphProps,
                                    "order":order});
  warmupNext(n);
}

function classifyResponse(noun, n, startTime, morphProp, order) {
  //experiment.data noun
  var endTime = (new Date()).getTime();
  var rt = endTime - startTime;
  experiment.data["warmups"].push({"qNumber":n,
                                   "qType":"classify",
                                   "rt":rt,
                                   "response":noun,
                                   "correctness":"N/A",
                                   "morphProp(s)":morphProp,
                                   "order":order});
  warmupNext(n);
}

function getWarmupStages() {
  var warmStages = [];
  var shuffledWarmupStages = shuffle(warmupStagesBank); //compare and classify repeated
  var stageSpecificIndices = {"classify": 0, "compare": 0};
  for (var i=0; i<shuffledWarmupStages.length; i++) {
    var stage = shuffledWarmupStages[i];
    var stageSpecificIndex = stageSpecificIndices[stage];
    var params = parameters[stage][stageSpecificIndex];
    warmStages.push({stage: stage, params: params});
    stageSpecificIndices[stage]++;
  }
  return warmStages;
}

/* octave sampling funciton
function a = sampleDown()
  a = unifrnd(0, 0.1, 1, 9);
  a = [a unifrnd(0.1, 0.2, 1, 4)];
  a = [a unifrnd(0.2, 0.3, 1, 2)];
endfunction

function b = sampleMid()
  b = unifrnd(0.3, 0.4, 1, 3);
  b = [b unifrnd(0.4, 0.6, 1, 9)];
  b = [b unifrnd(0.6, 0.7, 1, 3)];
endfunction

function c = sampleUp()
  c = unifrnd(0.9, 1, 1, 9);
  c = [c unifrnd(0.8, 0.9, 1, 4)];
  c = [c unifrnd(0.7, 0.8, 1, 2)];
endfunction

function d = sampleUnif()
  d = unifrnd(0,1,1,15);
endfunction

a = sampleDown();
b = sampleMid();
c = sampleUp();
d = sampleUnif();
hist(a);
plot([0:1/14:1], sort(a), "*", "markersize", 10)
*/
